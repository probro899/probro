import React, { Component } from 'react';
import { Button, TextArea, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Navbar } from '../../home/component';

class Blogs extends Component {
  state = {
    bold: false,
    italic: false,
    underline: false,
  };

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
              return null;
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
        return null;
    }
    this.setState({
      bold, italic, underline,
    });
  }

  contentChange = (e) => {
    const content = e.target.innerText;
    if (content === '\n' || content === '') {
      e.target.innerHTML = '';
    }
  }

  onkeyUp = (e) => {
    this.contentChange(e);
    this.onEditorFocus();
  }

  render() {
    const { bold, italic, underline } = this.state;
    return (
      <div>
        <Navbar />
        <div className="blogs">
          <div className="blog-top">
            <span>Proper Blogging Experience</span>
          </div>
          <div className="toolbar">
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
          <div className="title">
            <TextArea
              fill
              placeholder="Headline"
              maxLength="150"
              rows="1"
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
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Blogs;
