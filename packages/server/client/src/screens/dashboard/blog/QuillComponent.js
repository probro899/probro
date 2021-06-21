import React from 'react';
import _ from 'lodash';

export default class QuillComponent extends React.Component {
  state = { }

  static modules = { toolbar: { container: "#toolbar" } };

  onChangeDescription = _.debounce((val) => {
    const { onChange } = this.props;
    onChange(val);
  }, 2000);

  render() {
    const { description } = this.props;
    let ReactQuill = null;
    if (typeof document === 'object') {
      ReactQuill = require('react-quill');
    }

    return (
      ReactQuill && (
        <ReactQuill
          modules={QuillComponent.modules}
          scrollingContainer="html, body"
          value={description}
          onChange={this.onChangeDescription}
        />
      ));
  }
}
