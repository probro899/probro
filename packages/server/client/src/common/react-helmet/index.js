/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import titleDescriptionProvider from './titileDescriptionProvider';

const ReactHelmet = (props) => {
  const { match, headerData } = props;
  const header = titleDescriptionProvider(match, headerData);
  const { description, title } = header;
  return (
    <Helmet>
      <title>
        {title}
      </title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default ReactHelmet;
ReactHelmet.propTypes = {
  match: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};
