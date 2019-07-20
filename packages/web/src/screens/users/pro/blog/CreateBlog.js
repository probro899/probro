import React, { Component } from 'react';
import { Button, TextArea, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Navbar } from '../../../home/component';
import client from '../../../../socket';
import { addBlog, updateBlog } from './helper-functions';

class Blogs extends Component {
  state = {
    bold: false,
    italic: false,
    underline: false,
    apis: {},
    title: '',
    description: '',
    blogId: '',
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

  onClick = (type) => {
    let { bold, italic, underline } = this.state;
    // eslint-disable-next-line no-undef
    document.execCommand(type, false, '');
    // eslint-disable-next-line no-undef
    document.getElementById('editor').focus();
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
      default:
        return;
    }
    this.setState({
      bold, italic, underline,
    });
  }

  contentChange = (e) => {
    if ((e.ctrlKey === true || e.metaKey === true) && e.keyCode === 83) {
      e.preventDefault();
      this.saveBlog();
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

  render() {
    const { bold, italic, underline, title } = this.state;
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
                icon={IconNames.BOLD}
                intent={bold ? Intent.PRIMARY : null}
                onClick={() => this.onClick('bold')}
              />
              <Button
                type="button"
                icon={IconNames.ITALIC}
                intent={italic ? Intent.PRIMARY : null}
                onClick={() => this.onClick('italic')}
              />
              <Button
                type="button"
                icon={IconNames.UNDERLINE}
                intent={underline ? Intent.PRIMARY : null}
                onClick={() => this.onClick('underline')}
              />
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
                fontSize: '30px',
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

export default Blogs;
