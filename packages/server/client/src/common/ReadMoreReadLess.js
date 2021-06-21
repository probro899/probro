import React, { useState } from 'react';

const GetText = ({ text }) => {
  let arr = text.split('\n');
  arr = arr.map((item, index) => <React.Fragment key={`it-${index}`}>{item}<br/></React.Fragment>);
  return arr;
}

const ReadMoreReadLess = ({ text, limit=200 }) => {
  if (!text) return null;
  const [more, setMore] = useState(false);
  const toggleMore = () => setMore(!more);
  if (text.length < limit) return <GetText text={text} />;
  return (
    <>
      <GetText text={more ? text : text.substr(0, limit)} />
      {' '}
      <span onClick={toggleMore} style={{ whiteSpace: 'nowrap', cursor: 'pointer', color: 'rgb(19, 124, 189)' }}>
        {more ? 'Read Less' : 'Read More'}
      </span>
    </>
  );
}

export default ReadMoreReadLess;
