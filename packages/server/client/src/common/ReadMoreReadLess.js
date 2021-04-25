import React from 'react';
import PropTypes from 'prop-types';

class ReadMoreReadLess extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showMore: false };
    }
    render() {
        const { props } = this;
        const { children, ellipsis, readMoreText, readLessText, readMoreClassName, readLessClassName, readMoreStyle, readLessStyle, charLimit } = props;
        const { showMore } = this.state;
        const shortText = children.substr(0, charLimit).replace(/[\s\n]+$/, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]+$/, "") + (charLimit >= children.length ? '' : ellipsis);
        const that = this;
        const ReadMore = () => (((charLimit >= children.length) || !readMoreText) ? null : <span
            className={readMoreClassName}
            role="presentation"
            style={readMoreStyle}
            onClick={() => { that.setState({ showMore: true }); }}
        >{readMoreText}</span>);
        const ReadLess = () => (((charLimit >= children.length) || !readLessText) ? null : <span
            className={readLessClassName}
            role="presentation"
            style={readLessStyle}
            onClick={() => { that.setState({ showMore: false }); }}
        >{readLessText}</span>);
        return (
            <>{showMore ? children : shortText} {showMore ? <ReadLess /> : <ReadMore />}</>
        );
    }
}

ReadMoreReadLess.propTypes = {
    charLimit: PropTypes.number,
    ellipsis: PropTypes.string,
    readMoreText: PropTypes.string,
    readLessText: PropTypes.string,
    readMoreClassName: PropTypes.string,
    readLessClassName: PropTypes.string,
    readMoreStyle: PropTypes.object,
    readLessStyle: PropTypes.object,
    children: PropTypes.string.isRequired
};

ReadMoreReadLess.defaultProps = {
    charLimit: 200,
    ellipsis: '…',
    readMoreText: 'Read More',
    readLessText: 'Read Less',
    readMoreClassName: 'react-read-more-read-less read-more',
    readLessClassName: 'react-read-more-read-less read-less',
    readMoreStyle: { whiteSpace: "nowrap", cursor: "pointer", color: '#137cbd'},
    readLessStyle: { whiteSpace: "nowrap", cursor: "pointer", color: '#137cbd'}
};
export default ReadMoreReadLess;