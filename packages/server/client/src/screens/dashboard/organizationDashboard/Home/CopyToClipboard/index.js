import React, { useState, useRef } from 'react';
import { BiCopy } from 'react-icons/bi';
import { Button } from '../../../../../common/utility-functions/Button/Button';
import { Tooltip } from '../../../../../common/Form/Tooltip';

const CopyToClipboard = ({ value }) => {
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  const CopytoClipboard = (e) => {
    inputRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopied(true);
  };

  const changeCopyStatus = () => {
    setCopied(false);
  };

  return (
    <div className="pc-ctc" >
      <div className="formLabel">
        <input type="text" ref={inputRef} readOnly className="pc-input-group" value={value} />
      </div>
      <Tooltip content={copied ? 'Copied to Clipboard' : 'Copy'}>
        <Button
          onClick={CopytoClipboard}
          type="button"
          buttonStyle="btn--primary--solid"
          buttonSize="btn--small"
          onMouseLeave={changeCopyStatus}
          icon={<BiCopy size={20} />
          }
        />
      </Tooltip>
    </div>
  );
};

export default CopyToClipboard;
