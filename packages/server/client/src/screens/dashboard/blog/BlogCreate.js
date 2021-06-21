import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ENDPOINT } from '../../../config';
import client from '../../../socket';
import * as actions from '../../../actions';
import { Navbar } from '../../home/component';
import CoverImage from './CoverImage';
import CustomToolbar from './CustomToolbar';
import { addBlog, updateBlog } from '../../blog/helper-functions';
import { FormTextArea } from '../../../common/Form/FormTextArea';
import { uploadFile } from '../../../common/utility-functions';
import animateProgress from '../../../common/utility-functions/animateProgress';
import QuillComponent from './QuillComponent';

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
  }

  async componentDidMount() {
    const { match, databaseBlog } = this.props;
    const apis = await client.scope('Mentor');
    this.setState({ apis });
    if (match.params.blogId && databaseBlog.allIds.length > 0) {
      const blog = databaseBlog.byId[parseInt(match.params.blogId, 10)];
      this.setState({
        blogId: blog.id,
        publish: blog.saveStatus,
        title: blog.title,
        coverImage: { actualFile: null, serverImageName: blog.coverImage, url: blog.coverImage ? `${ENDPOINT}/assets/user/${10000000 + parseInt(blog.userId, 10)}/blog/${blog.coverImage}` : null },
        description: blog.content,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { databaseBlog, match } = this.props;
    const { blogId } = this.state;
    if (blogId) return;
    if (match.params.blogId) {
      const blog = databaseBlog.byId[parseInt(match.params.blogId, 10)];
      if (blog) {
        this.setState({
          blogId: blog.id,
          coverImage: { actualFile: null, serverImageName: blog.coverImage, url: blog.coverImage ? `${ENDPOINT}/assets/user/${10000000 + parseInt(blog.userId, 10)}/blog/${blog.coverImage}` : null },
          publish: blog.saveStatus,
          title: blog.title,
          description: blog.content,
        });
      }
    }
  }

  coverChange = (f) => {
    this.setState({ coverImage: { url: URL.createObjectURL(f), actualFile: f } });
    this.autoSaveBlog();
  }

  onChangeTitle = (e) => {
    this.setState({ title: e.target.value });
    this.autoSaveBlog();
  }

  onChangeDescription = (value) => {
    this.setState({ description: value });
    this.saveBlog();
  }

  autoSaveBlog = _.debounce(() => {
    this.saveBlog();
  }, 2000);

  publish = async (e) => {
    const { blogId, apis, title, description } = this.state;
    const { updateDatabaseSchema } = this.props;
    this.setState({ saveLoading: true });
    const obj = { title, content: description, saveStatus: e.target.checked ? 'publish' : 'draft' };
    if (blogId) {
      this.setState({ publish: e.target.checked ? 'publish' : 'draft' });
      await updateBlog(apis.updateBlog, [obj, { id: blogId }]);
      updateDatabaseSchema('Blog', { ...obj, id: blogId });
    }
    this.setState({ saveLoading: false });
  }

  titleEmpty = () => {
    const { title, titleError } = this.state;
    if (title.replace(/\s/g, '').length === 0) {
      this.setState({ titleError: true });
      return true;
    }
    if (titleError) this.setState({ titleError: false });
    return false;
  }

  // saving the blog from here
  saveBlog = async () => {
    const { apis, title, description, blogId, publish, coverImage } = this.state;
    let uploadedUrl = null;
    if (this.titleEmpty()) return;
    const { account, addDatabaseSchema, updateNav, updateDatabaseSchema } = this.props;
    this.setState({ saveLoading: true }); // for loading while saving blog
    animateProgress('start', updateNav);
    if (coverImage.actualFile) {
      try {
        const res = await uploadFile('blog', coverImage.actualFile, account.sessionId, false);
        if (res.status === 200) {
          uploadedUrl = res.data;
          this.setState({ coverImage: { ...coverImage, actualFile: null, serverImageName: uploadedUrl } });
        }
      } catch (e) {
        console.log('Error', e);
      }
    }
    if (!blogId) {
      const obj = {
        title,
        userId: account.user.id,
        timeStamp: Date.now(),
        saveStatus: publish,
        coverImage: uploadedUrl,
        content: description,
      }
      const res = await addBlog(apis.addBlog, obj);
      addDatabaseSchema('Blog', { ...obj, id: res.id });
      const editUrl = `/edit-blog/${account.user.slug}/${res.id}`;
      window.history.replaceState({}, '', [editUrl]);
      this.setState({ saveLoading: false, blogId: res.id, publish: 'draft' });
      animateProgress('end', updateNav);
      return;
    }
    const obj = {
      title,
      content: description,
      saveStatus: publish,
      coverImage: (!coverImage.url && !uploadedUrl) ? null : (uploadedUrl || coverImage.serverImageName),
    };
    await updateBlog(apis.updateBlog, [obj, { id: blogId }]);
    updateDatabaseSchema('Blog', { ...obj, id: blogId });
    this.setState({ saveLoading: false });
    animateProgress('end', updateNav);
  }

  render() {
    const { blogId, coverImage, title, titleError, saveLoading, description, publish } = this.state;
    const { account } = this.props;
    if (!account.sessionId) return <Redirect to="/" />;
    return (
      <>
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
                resizable
                className="pc-text-area"
                error={titleError}
                value={title}
              />
            </div>
            <QuillComponent description={description} onChange={this.onChangeDescription} />
          </div>
        </div>
      </>
    )
  }
}


const mapStateToProps = ({ account, database }) => ({ account, databaseBlog: database.Blog });
export default connect(mapStateToProps, { ...actions })(BlogCreate);
