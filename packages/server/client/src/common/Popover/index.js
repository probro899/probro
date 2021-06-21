import React from 'react';
import _ from 'lodash';
import Portal from './Portal';
import Content from './Content';

export default class Popover extends React.Component {
    /*
        hPosition(left, right) => horizontal placement of the popover content
        vPosition(top, bottom) => vertical placement of the popover content
        xAlign(left, right) => horizontal reference point of the popover anchor
        yAlign(top, bottom) => vertical reference point of the popover anchor
    */
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = { open: false, uniqId: Math.floor(Math.random() * 1000 ) + 1000 };
    }
    
    onClick = _.debounce(() => {
      const { open } = this.state;
      const { toggleOpen, isOpen } = this.props;
      if (toggleOpen) {
        toggleOpen('prev', !isOpen);
        return;
      }
      this.setState({ open: !open });
    }, 80);

    render() {
        const { content, children, hPosition, vPosition, xAlign, yAlign, isOpen } = this.props;
        const { open } = this.state;
        const coords = { rect: this.ref.current ? this.ref.current.getBoundingClientRect() : {} };
        return (
            <div className="pc-popover-container">
                {(isOpen || open) && (<Portal>
                    <Content xAlign={xAlign} yAlign={yAlign} hPosition={hPosition} vPosition={vPosition} onClick={this.onClick} content={content} rect={coords} />
                </Portal>)}
                <div ref={this.ref} onClick={this.onClick} className="pc-popover-trigger">
                    {children}
                </div>
            </div>
        )
    }
}
