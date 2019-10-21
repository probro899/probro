import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, TextArea, Intent, Popover, FileInput, HTMLSelect, Switch } from '@blueprintjs/core';
import * as actions from '../../actions';
import { Navbar } from '../home/component';
import client from '../../socket';
import { addBlog, updateBlog } from './helper-functions';
import { ENDPOINT } from '../../config';

const PopoverContent = ({ imgName, callback }) => (
  <div style={{ padding: '5px' }}>
    <FileInput
      text={imgName}
      onInputChange={callback}
      large
    />
  </div>
);

PopoverContent.propTypes = {
  callback: PropTypes.func.isRequired,
  imgName: PropTypes.string.isRequired,
};

class Blogs extends Component {
  state = {
    bold: false,
    italic: false,
    underline: false,
    publish: 'draft',
    apis: {},
    title: '',
    description: '',
    blogId: '',
    imageSource: 'Choose a picture...',
  };

  async componentWillMount() {
    const apis = await client.scope('Mentor');
    this.setState({
      apis,
    });
  }

  componentDidMount() {
    const { match, database } = this.props;
    if (match.params.blogId) {
      document.getElementById('editor').innerHTML = database.Blog.byId[parseInt(match.params.blogId, 10)].content;
      this.setState({
        blogId: match.params.blogId,
        publish: database.Blog.byId[match.params.blogId].saveStatus,
        title: database.Blog.byId[match.params.blogId].title,
        description: database.Blog.byId[parseInt(match.params.blogId, 10)].content,
      });
    }
    const config = { attributes: true, childList: true, subtree: true };
    const targetNode = document.getElementById('editor');
    const mutationObserver = new MutationObserver(this.observeMutation);
    mutationObserver.observe(targetNode, config);
  }

  observeMutation = (mutationsList) => {
    const fileNames = [];
    for (let i = 0; i < mutationsList.length; i += 1) {
      const removeNodes = mutationsList[i].removedNodes;
      for (let j = 0; j < removeNodes.length; j += 1) {
        if (removeNodes[j].localName === 'img') {
          const sp = removeNodes[j].src.split('/');
          fileNames.push(sp[sp.length - 1]);
        }
      }
    }
    if (fileNames.length !== 0) {
      this.deleteFileHandler(fileNames);
    }
  }

  onChangeDesc = (e) => {
    this.setState({
      description: e.target.innerHTML,
    });
  }

  onChangeTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  }

  // also to focus the active tool in the toolbar
  onEditorFocus = () => {
    let sel;
    let bold = false;
    let italic = false;
    let underline = false;
    if (window.getSelection) {
      sel = window.getSelection();
      // just to avoid the first case that has null in focusNode
      if (!sel.focusNode) {
        return;
      }
      let focus = sel.focusNode.parentElement;
      if (sel.rangeCount) {
        while (focus.localName !== 'div') {
          switch (focus.localName) {
            case ('u'):
              underline = true;
              break;
            case ('b'):
              bold = true;
              break;
            case ('i'):
              italic = true;
              break;
            default:
              return;
          }
          focus = focus.parentElement;
        }
      }
    }
    this.setState({
      bold,
      italic,
      underline,
    });
  }

  onClick = (cmd, val) => {
    // eslint-disable-next-line no-undef
    document.execCommand(cmd, false, val);
    // eslint-disable-next-line no-undef
    document.getElementById('editor').focus();
    // this.toggleButtons();
  }

  // hightlighting the active tool in the toolbar
  toggleButtons = (type) => {
    let { bold, italic, underline, h2 } = this.state;
    switch (type) {
      case 'bold':
        bold = !bold;
        break;
      case 'italic':
        italic = !italic;
        break;
      case 'underline':
        underline = !underline;
        break;
      case 'h2':
        h2 = !h2;
        break;
      default:
        return;
    }
    this.setState({
      bold, italic, underline, h2,
    });
  }

  contentChange = (e) => {
    if ((e.ctrlKey === true || e.metaKey === true) && e.keyCode === 83) {
      e.preventDefault();
      this.saveBlog();
      return;
    }
    if (e.keyCode !== 46 || e.keyCode !== 8) {
      return;
    }
    const content = e.target.innerText;
    if (content === '\n' || content === '') {
      e.target.innerHTML = '';
    }
  }

  onkeyUp = (e) => {
    this.contentChange(e);
    this.onEditorFocus();
  }

  // this is to markup the innerhtml dangerous
  createMarkup = (val) => {
    return { __html: val };
  }

  // saving the blog from here
  saveBlog = async () => {
    const {
      apis,
      title,
      description,
      blogId,
      publish,
    } = this.state;
    const { account, addDatabaseSchema, updateDatabaseSchema } = this.props;
    if (blogId === '') {
      const res = await addBlog(apis.addBlog,
        {
          userId: account.user.id,
          timeStamp: Date.now(),
          saveStatus: 'draft',
          title,
          content: description,
        });
      this.setState({
        blogId: res,
        publish: 'draft',
      });
      addDatabaseSchema('Blog', {
        id: Date.now(),
        userId: account.user.id,
        timeStamp: Date.now(),
        saveStatus: 'draft',
        title,
        content: description,
      });
      return;
    }
    await updateBlog(apis.updateBlog, [
      {
        title,
        content: description,
        saveStatus: publish,
      },
      {
        id: blogId,
      },
    ]);
    updateDatabaseSchema('Blog', {
      id: blogId,
      saveStatus: 'draft',
      title,
      content: description,
    });
  }

  publish = async (e) => {
    const {
      blogId,
    } = this.state;
    if (blogId !== '') {
      this.setState({
        publish: e.target.checked ? 'publish' : 'draft',
      });
      this.saveBlog();
    }
  }

  uploadImg = async (e) => {
    const { account } = this.props;
    this.setState({ imageSource: e.target.files[0].name });
    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify({ token: account.sessionId, fileType: 'image', content: 'blog' }));
      formData.append('image', e.target.files[0]);
      const uploadRes = await axios({
        config: {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
        method: 'post',
        url: `${ENDPOINT}/web/upload-file`,
        data: formData,
      });
      if (uploadRes.status === 200) {
        // eslint-disable-next-line no-undef
        document.getElementById('editor').focus();
        document.execCommand('insertImage', false, `${ENDPOINT}/user/${10000000 + parseInt(account.user.id, 10)}/blog/${uploadRes.data}`);
        this.saveBlog();
      }
    } catch (err) {
      console.log('update profile error', err);
    }
  }

  deleteFileHandler = async (fileList) => {
    const { account } = this.props;
    try {
      await axios.post(`${ENDPOINT}/web/delete-file`, { token: account.sessionId, content: 'blog', fileName: fileList });
      this.saveBlog();
    } catch (e) {
      console.log('Internal Error', e);
    }
  }

  render() {
    const {
      bold,
      italic,
      underline,
      title,
      imageSource,
      publish,
    } = this.state;
    return (
      <div>
        <Navbar />
        <div className="create-blog">
          <div className="blog-top">
            <span>Proper Blogging Experience</span>
          </div>
          <div className="toolbar">
            <div className="left">
              <Switch
                innerLabel="Draft"
                innerLabelChecked="Live"
                alignIndicator="right"
                large
                label="Status"
                checked={publish === 'publish'}
                className="switch"
                onChange={this.publish}
              />
            </div>
            <div className="center">
              <HTMLSelect
                options={[
                  { label: 'Normal', value: 'p' },
                  { value: 'h1', label: 'Heading 1' },
                  { value: 'h2', label: 'Heading 2' },
                  { value: 'h3', label: 'Heading 3' },
                  { label: 'Code', value: 'pre' },
                ]}
                onChange={e => this.onClick('formatBlock', e.target.value)}
              />
              <Button
                type="button"
                icon="bold"
                intent={bold ? Intent.PRIMARY : null}
                onClick={() => this.onClick('bold', '')}
              />
              <Button
                type="button"
                icon="italic"
                intent={italic ? Intent.PRIMARY : null}
                onClick={() => this.onClick('italic', '')}
              />
              <Button
                type="button"
                icon="underline"
                intent={underline ? Intent.PRIMARY : null}
                onClick={() => this.onClick('underline', '')}
              />
              <Button
                type="button"
                icon="align-left"
                onClick={() => this.onClick('justifyLeft', '')}
              />
              <Button
                type="button"
                icon="align-center"
                onClick={() => this.onClick('justifyCenter', '')}
              />
              <Button
                type="button"
                icon="align-right"
                onClick={() => this.onClick('justifyRight', '')}
              />
              <Popover
                content={<PopoverContent imgName={imageSource} callback={this.uploadImg} />}
              >
                <Button
                  type="button"
                  icon="media"
                />
              </Popover>
            </div>
            <div className="right">
              <Button
                type="button"
                intent="success"
                text="save"
                onClick={this.saveBlog}
              />
            </div>
          </div>
          <div className="title">
            <TextArea
              fill
              placeholder="Header...*"
              maxLength="150"
              rows="1"
              onChange={this.onChangeTitle}
              value={title}
              intent={title.replace(/\s/g, '').length === 0 ? 'danger' : 'none'}
              style={{
                resize: 'none',
                overflowX: 'hidden',
                overflowWrap: 'break-word',
                maxHeight: '97px',
              }}
            />
          </div>
          <div className="editor-container">
            <div
              id="editor"
              role="textbox"
              tabIndex={0}
              contentEditable
              datatext="Start Writing ..."
              style={{ content: 'attr(placeholder)' }}
              onKeyUp={this.onkeyUp}
              onKeyDown={this.contentChange}
              onFocus={this.onEditorFocus}
              onClick={this.onEditorFocus}
              onInput={this.onChangeDesc}
            />
          </div>
        </div>
      </div>
    );
  }
}

Blogs.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ account: state.account, database: state.database });
export default connect(mapStateToProps, { ...actions })(Blogs);
