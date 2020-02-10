import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { TextArea } from '@blueprintjs/core';
import * as actions from '../../actions';
import { Navbar } from '../home/component';
import client from '../../socket';
import { addBlog, updateBlog } from './helper-functions';
import { ENDPOINT } from '../../config';
import BlogToolbar from './BlogToolbar';
import CoverImage from './CoverImage';

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
    coverImage: {
      actualFile: null,
      url: null,
    },
  };

  async componentDidMount() {
    const { match, database } = this.props;
    const apis = await client.scope('Mentor');
    this.setState({
      apis,
    });
    const config = { attributes: true, childList: true, subtree: true };
    const targetNode = document.getElementById('editor');
    const mutationObserver = new MutationObserver(this.observeMutation);
    mutationObserver.observe(targetNode, config);
    if (match.params.blogId && database.Blog.allIds.length > 0) {
      const blog = database.Blog.byId[parseInt(match.params.blogId, 10)];
      document.getElementById('editor').innerHTML = blog.content;
      this.setState({
        blogId: blog.id,
        publish: blog.saveStatus,
        title: blog.title,
        coverImage: { url: blog.coverImage ? `${ENDPOINT}/user/${10000000 + parseInt(blog.userId, 10)}/blog/${blog.coverImage}` : null },
        description: blog.content,
      });
    }
  }

  componentWillUpdate(nextProps) {
    const { database, match } = this.props;
    if (match.params.blogId && nextProps.database.Blog.byId !== database.Blog.byId) {
      const blog = nextProps.database.Blog.byId[parseInt(match.params.blogId, 10)];
      document.getElementById('editor').innerHTML = nextProps.database.Blog.byId[parseInt(match.params.blogId, 10)].content;
      this.setState({
        blogId: blog.id,
        coverImage: { url: blog.coverImage ? `${ENDPOINT}/user/${10000000 + parseInt(blog.userId, 10)}/blog/${blog.coverImage}` : null },
        publish: blog.saveStatus,
        title: blog.title,
        description: blog.content,
      });
    }
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
      coverImage,
    } = this.state;
    let uploadedUrl = null;
    const { account, addDatabaseSchema, updateDatabaseSchema } = this.props;
    if (coverImage.actualFile) {
      const formData = new FormData();
      formData.append('data', JSON.stringify({ token: account.sessionId, fileType: 'image', content: 'blog' }));
      formData.append('file', coverImage.actualFile);
      try {
        const res = await axios({
          config: {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
          method: 'post',
          url: `${ENDPOINT}/web/upload-file`,
          data: formData,
        });
        if (res.status === 200) {
          uploadedUrl = res.data;
        }
      } catch (e) {
        console.log('Error', e);
      }
    }
    if (blogId === '') {
      const res = await addBlog(apis.addBlog,
        {
          userId: account.user.id,
          timeStamp: Date.now(),
          saveStatus: publish,
          title,
          coverImage: uploadedUrl,
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
        saveStatus: publish,
        coverImage: uploadedUrl,
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
        coverImage: !coverImage.url && !uploadedUrl ? null : (uploadedUrl || coverImage.url),
      },
      {
        id: blogId,
      },
    ]);
    updateDatabaseSchema('Blog', {
      id: blogId,
      saveStatus: publish,
      title,
      content: description,
      coverImage: !coverImage.url && !uploadedUrl ? null : (uploadedUrl || coverImage.url),
    });
  }

  publish = async (e) => {
    const {
      blogId,
      apis,
      title,
      description,
    } = this.state;
    const { updateDatabaseSchema } = this.props;
    const saveStatus = e.target.checked ? 'publish' : 'draft';
    if (blogId !== '') {
      this.setState({
        publish: saveStatus,
      });
      await updateBlog(apis.updateBlog, [
        {
          title,
          content: description,
          saveStatus,
        },
        {
          id: blogId,
        },
      ]);
      updateDatabaseSchema('Blog', {
        id: blogId,
        saveStatus,
        title,
        content: description,
      });
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

  coverChange = (f) => {
    this.setState({
      coverImage: {
        url: URL.createObjectURL(f),
        actualFile: f,
      },
    });
  }

  render() {
    const {
      bold,
      italic,
      underline,
      imageSource,
      publish,
      title,
      coverImage,
    } = this.state;
    console.log(this.props.database.Blog);
    return (
      <div>
        <Navbar className="pcm-nav" />
        <div className="create-blog">
          <BlogToolbar
            onClick={this.onClick}
            onPublish={this.publish}
            uploadImg={this.uploadImg}
            saveBlog={this.saveBlog}
            bold={bold}
            italic={italic}
            underline={underline}
            imageSource={imageSource}
            publish={publish}
          />
          <CoverImage coverImage={coverImage.url} coverChange={this.coverChange} />
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
