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
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="shortcut icon" href="${webConfig.siteURL}/assets/graphics/favicon.ico">
    <link rel="preload" href="${webConfig.siteURL}/assets/css/index.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
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
