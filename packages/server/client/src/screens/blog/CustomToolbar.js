import React from 'react';
import { Button } from '../../common/utility-functions/Button/Button';
import { SwitchButton } from '../../common/Form/SwitchButton';
import { Tooltip } from '../../common/Form/Tooltip';

export default ({ blogId, publish, onPublish, saveBlog, saveLoading }) => {
    return (
        <div className="pc-create-blog-toolbar">
            <div className="left">
                {
                    blogId && (
                        <div className="pc-publish-btn">
                            <label>Publish</label>
                            <SwitchButton
                                checked={publish === 'publish'}
                                onChange={onPublish}
                            />
                        </div>
                    )
                }
            </div>
            <div id="toolbar">
                <div className="pc-blog-tools">
                    <Tooltip content="Text Size" position="left">
                        <select className="ql-size">
                            <option value="small"></option>
                            <option selected></option>
                            <option value="large"></option>
                            <option value="huge"></option>
                        </select>
                    </Tooltip>
                    <Tooltip content="Alignment" position="left">
                        <select className="ql-align" />
                    </Tooltip>
                    <Tooltip content="Color" position="left">
                        <select className="ql-color" />
                    </Tooltip>
                    <Tooltip content="Background Color" position="left">
                        <select className="ql-background" />
                    </Tooltip>
                    <Tooltip content="Bold" position="left">
                        <button className="ql-bold"></button>
                    </Tooltip>
                    <Tooltip content="Italic" position="left">
                        <button className="ql-italic"></button>
                    </Tooltip>
                    <Tooltip content="Underline" position="left">
                        <button className="ql-underline"></button>
                    </Tooltip>
                    <Tooltip content="Add Link" position="left">
                        <button className="ql-link"></button>
                    </Tooltip>
                    <Tooltip content="Add Image" position="left">
                        <button className="ql-image"></button>
                    </Tooltip>
                    <Tooltip content="Number List" position="left">
                        <button className="ql-list" value="ordered"></button>
                    </Tooltip>
                    <Tooltip content="Bullet List" position="left">
                        <button className="ql-list" value="bullet"></button>
                    </Tooltip>
                </div>
            </div>
            <div className="right">
                <Button
                    title="Save"
                    buttonStyle="btn--success--solid"
                    buttonSize="btn--small"
                    onClick={saveBlog}
                    loading={saveLoading}
                />
            </div>
        </div>
    )
};
