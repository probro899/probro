/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import webConfig from '../../../webConfig.json';

const HTML = ({ content, state, helmet, seo }) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();
  return (
    <html lang="en" {...htmlAttrs}>
      <head dangerouslySetInnerHTML={{
        __html: `
       ${seo}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    ${helmet.meta.toString()}
    <link rel="shortcut icon" href="${webConfig.siteURL}/assets/graphics/favicon.ico">
    <link href="${webConfig.siteURL}/assets/css/index.css" rel="stylesheet" type="text/css" />
    <link href="${webConfig.siteURL}/assets/css/blueprint.min.css" rel="stylesheet" type="text/css" />
    <link href="${webConfig.siteURL}/assets/css/blueprint-datetime.min.css" rel="stylesheet" type="text/css" />
    <link href="${webConfig.siteURL}/assets/css/carousel.min.css" rel="stylesheet" type="text/css" />
    `}}
      />
      <body {...bodyAttrs}>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
        }}
        />
        <script src={`${webConfig.siteURL}/client_bundle.js`} />
      </body>
    </html>
  );
};
export default HTML;
