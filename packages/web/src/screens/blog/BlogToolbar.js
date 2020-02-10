import React from 'react';
import PropTypes from 'prop-types';
import { HTMLSelect, Switch, Button, FileInput, Popover } from '@blueprintjs/core';

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

const BlogToolbar = ({
  bold,
  italic, underline, imageSource,
  publish,
  onClick,
  onPublish,
  saveBlog,
  uploadImg,
}) => {
  return (
    <div className="toolbar">
      <div className="left">
        <Switch
          innerLabel="Draft"
          innerLabelChecked="Public"
          alignIndicator="right"
          large
          // label="Status"
          checked={publish === 'publish'}
          className="switch"
          onChange={onPublish}
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
          onChange={e => onClick('formatBlock', e.target.value)}
        />
        <Button
          type="button"
          icon="bold"
          intent={bold ? 'primary' : null}
          onClick={() => onClick('bold', '')}
        />
        <Button
          type="button"
          icon="italic"
          intent={italic ? 'primary' : null}
          onClick={() => onClick('italic', '')}
        />
        <Button
          type="button"
          icon="underline"
          intent={underline ? 'primary' : null}
          onClick={() => onClick('underline', '')}
        />
        <Button
          type="button"
          icon="align-left"
          onClick={() => onClick('justifyLeft', '')}
        />
        <Button
          type="button"
          icon="align-center"
          onClick={() => onClick('justifyCenter', '')}
        />
        <Button
          type="button"
          icon="align-right"
          onClick={() => onClick('justifyRight', '')}
        />
        <Popover
          content={<PopoverContent imgName={imageSource} callback={uploadImg} />}
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
          onClick={saveBlog}
        />
      </div>
    </div>
  );
};

BlogToolbar.propTypes = {
  onClick: PropTypes.func.isRequired,
  saveBlog: PropTypes.func.isRequired,
  uploadImg: PropTypes.func.isRequired,
  onPublish: PropTypes.func.isRequired,
  bold: PropTypes.bool.isRequired,
  italic: PropTypes.bool.isRequired,
  underline: PropTypes.bool.isRequired,
  imageSource: PropTypes.string.isRequired,
  publish: PropTypes.string.isRequired,
};

export default BlogToolbar;
