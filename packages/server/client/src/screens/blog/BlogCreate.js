import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ENDPOINT } from '../../config';
import client from '../../socket';
import * as actions from '../../actions';
import { Navbar } from '../home/component';
import CoverImage from './CoverImage';
import CustomToolbar from './CustomToolbar';
import { addBlog, updateBlog } from './helper-functions';
import { FormTextArea } from '../../common/Form/FormTextArea';
import { uploadFile } from '../../common/utility-functions';

class BlogCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      publish: 'draft',
      saveLoading: false,
      apis: {},
      title: '',
      description: '',
      blogId: null,
      titleError: false,
      coverImage: { actualFile: null, url: null, serverImageName: null },
    };
    if (typeof document === 'object') {
      this.quil = require('react-quill');
    }
  }

  static modules = {
    toolbar: {
      container: "#toolbar",
    }
  };

  async componentDidMount() {
    const { match, database } = this.props;
    const apis = await client.scope('Mentor');
    this.setState({ apis });
    if (match.params.blogId && database.Blog.allIds.length > 0) {
      const blog = database.Blog.byId[parseInt(match.params.blogId, 10)];
      this.setState({
        blogId: blog.id,
        publish: blog.saveStatus,
        title: blog.title,
        coverImage: { actualFile: null, serverImageName: blog.coverImage, url: blog.coverImage ? `${ENDPOINT}/assets/user/${10000000 + parseInt(blog.userId, 10)}/blog/${blog.coverImage}` : null },
        description: blog.content,
      });
    }
  }

  getSnapshotBeforeUpdate(prevProps, nextState) {
    const { database, match } = this.props;
    if (match.params.blogId && prevProps.database.Blog.byId !== database.Blog.byId) {
      const blog = database.Blog.byId[parseInt(match.params.blogId, 10)];
      this.setState({
        blogId: blog.id,
        coverImage: { actualFile: null, serverImageName: blog.coverImage, url: blog.coverImage ? `${ENDPOINT}/assets/user/${10000000 + parseInt(blog.userId, 10)}/blog/${blog.coverImage}` : null },
        publish: blog.saveStatus,
        title: blog.title,
        description: blog.content,
      });
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

  onChangeTitle = (e) => {
    this.setState({ title: e.target.value, titleError: false });
    this.autoSaveBlog();
  }

  onChangeDesc = (value) => {
    this.setState({ description: value });
    this.autoSaveBlog();
  }

  autoSaveBlog = _.debounce(() => {
    this.saveBlog();
  }, 2000);

  publish = async (e) => {
    const { blogId, apis, title, description } = this.state;
    this.setState({ saveLoading: true });
    const { updateDatabaseSchema } = this.props;
    const saveStatus = e.target.checked ? 'publish' : 'draft';
    if (blogId) {
      this.setState({ publish: saveStatus });
      await updateBlog(apis.updateBlog, [
        {
          title,
          content: description,
          saveStatus,
        },
        { id: blogId },
      ]);
      updateDatabaseSchema('Blog', {
        id: blogId,
        saveStatus,
        title,
        content: description,
      });
    }
    this.setState({ saveLoading: false });
  }

  // saving the blog from here
  saveBlog = async () => {
    const { apis, title, description, blogId, publish, coverImage } = this.state;
    let uploadedUrl = null;

    if (title.replace(/\s/g, '').length === 0) { this.setState({ titleError: true }); return; }
    // for loading while saving blog
    this.setState({ saveLoading: true });

    const { account, addDatabaseSchema, updateDatabaseSchema } = this.props;
    if (coverImage.actualFile) {
      try {
        const res = await uploadFile('blog', coverImage.actualFile, account.sessionId);
        if (res.status === 200) {
          uploadedUrl = res.data;
          this.setState({ coverImage: { ...coverImage, actualFile: null, serverImageName: uploadedUrl } });
        }
      } catch (e) {
        console.log('Error', e);
      }
    }
    if (!blogId) {
      const res = await addBlog(apis.addBlog,
        {
          userId: account.user.id,
          timeStamp: Date.now(),
          saveStatus: publish,
          title,
          coverImage: uploadedUrl,
          content: description,
        });
      addDatabaseSchema('Blog', {
        id: res.id,
        slug: res.slug,
        userId: account.user.id,
        timeStamp: Date.now(),
        saveStatus: publish,
        coverImage: uploadedUrl,
        title,
        content: description,
      });
      const editUrl = `/edit-blog/${account.user.slug}/${res.id}`;
      window.history.replaceState({}, '', [editUrl]);
      this.setState({ saveLoading: false, blogId: res.id, publish: 'draft' });
      return;
    }
    await updateBlog(apis.updateBlog, [
      {
        title,
        content: description,
        saveStatus: publish,
        coverImage: (!coverImage.url && !uploadedUrl) ? null : (uploadedUrl || coverImage.serverImageName),
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
      coverImage: (!coverImage.url && !uploadedUrl) ? null : (uploadedUrl || coverImage.serverImageName),
    });
    this.setState({ saveLoading: false });
  }


  render() {
    const { blogId, coverImage, title, titleError, saveLoading, description, publish } = this.state;
    const { account } = this.props;
    const ReactQuill = this.quil;
    return (
      <div>
        {!account.sessionId && <Redirect to="/" />}
        <Navbar className="pcm-nav" />
        <div className="create-blog" id="mainDiv">
          <CustomToolbar
            publish={publish}
            blogId={blogId}
            onPublish={this.publish}
            saveBlog={this.saveBlog}
            saveLoading={saveLoading}
          />
          <div className="pc-create-blog-wrapper pc-container">
            <CoverImage coverImage={coverImage.url} coverChange={this.coverChange} />
            <div className="title">
              <FormTextArea
                name={title}
                placeholder="Headline"
                onChange={this.onChangeTitle}
                rows="1"
                error={titleError}
                value={title}
              />
            </div>
            {ReactQuill && <ReactQuill modules={BlogCreate.modules} value={description} onChange={this.onChangeDesc} />}
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({ account: state.account, database: state.database });
export default connect(mapStateToProps, { ...actions })(BlogCreate);
