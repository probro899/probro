import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, TextArea, Intent, Popover, FileInput } from '@blueprintjs/core';
import { Navbar } from '../../../home/component';
import client from '../../../../socket';
import { addBlog, updateBlog } from './helper-functions';
import { ENDPOINT } from '../../../../config';


const PopoverContent = ({ imageSource, callback }) => {
  return (
    <div style={{ padding: '5px' }}>
      <FileInput
        webkitdirectory
        text={imageSource ? imageSource.name : 'Choose image...'}
        onInputChange={callback}
        large
      />
    </div>
  );
};

PopoverContent.propTypes = {
  callback: PropTypes.func.isRequired,
  imageSource: PropTypes.objectOf(PropTypes.any).isRequired,
};

class Blogs extends Component {
  state = {
    bold: false,
    italic: false,
    underline: false,
    h2: false,
    apis: {},
    title: '',
    description: '',
    blogId: '',
    imageSource: null,
    imageUrl: null,
  };

  async componentWillMount() {
    const apis = await client.scope('Mentor');
    this.setState({
      apis,
    });
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

  onEditorFocus = () => {
    let sel;
    let bold = false;
    let italic = false;
    let underline = false;
    let h2 = false;
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
            case ('h2'):
              h2 = true;
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
      h2,
    });
  }

  onClick = (type) => {
    // eslint-disable-next-line no-undef
    if (type === 'h2') {
      document.execCommand('formatblock', false, 'h2');
    } else {
      document.execCommand(type, false, '');
    }
    // eslint-disable-next-line no-undef
    document.getElementById('editor').focus();
    this.toggleButtons(type);
  }

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
    const { apis, title, description, blogId } = this.state;
    if (blogId === '') {
      await addBlog(apis.addBlog,
        {
          userId: '',
          timeStamp: Date.now(),
          saveStatus: 'draft',
          blogHeader: title,
          blogContent: description,
        });
      return;
    }
    await updateBlog(apis.updateBlog, {
      blogId: '',
      blogHeader: title,
      blogContent: description,
    });
  }

  uploadImg = async (e) => {
    console.log('upload image props', this.props);
    const { account } = this.props;
    console.log(e.target.files);
    this.setState({ imageSource: e.target.files[0] });

    try {
      const formData = new FormData(); //eslint-disable-line
      formData.append('data', JSON.stringify({ token: account.sessionId, fileType: 'file', content: 'blog' }));
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
      console.log('upload Response', uploadRes.data);
      if (uploadRes.status === 200) {
        this.setState({ imageUrl: uploadRes.data });
      }
    } catch (err) {
      console.log('update profile error', err);
    }

    // document.execCommand('insertImage', false, e.target.files[0].mozFullPath);
  }

  deleteFileHandler = async () => {
    const { account } = this.props;
    const res = await axios.post(`${ENDPOINT}/web/delete-file`, { token: account.sessionId, content: 'blog', fileName: 'image-1564206339130.png' });
    console.log('deleteRes', res);
  }

  render() {
    const {
      bold,
      italic,
      underline,
      title,
      h2,
      imageSource,
      imageUrl,
    } = this.state;
    console.log('image source', imageSource, imageUrl);
    return (
      <div>
        <Navbar />
        <div className="create-blog">
          <div className="blog-top">
            <span>Proper Blogging Experience</span>
          </div>
          <div className="toolbar">
            <div className="left" />
            <div className="center">
              <Button
                type="button"
                icon="bold"
                intent={bold ? Intent.PRIMARY : null}
                onClick={() => this.onClick('bold')}
              />
              <Button
                type="button"
                icon="italic"
                intent={italic ? Intent.PRIMARY : null}
                onClick={() => this.onClick('italic')}
              />
              <Button
                type="button"
                icon="underline"
                intent={underline ? Intent.PRIMARY : null}
                onClick={() => this.onClick('underline')}
              />
              <Button
                type="button"
                icon="header"
                intent={h2 ? 'primary' : null}
                onClick={() => this.onClick('h2')}
              />
              <Popover
                content={<PopoverContent imgName={imageSource} callback={this.uploadImg} />}
              >
                <Button
                  type="button"
                  icon="upload"
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
              <Button text="deleteFileTest" intent="danger" onClick={this.deleteFileHandler} />
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
const mapStateToProps = state => ({ account: state.account });
export default connect(mapStateToProps)(Blogs);

