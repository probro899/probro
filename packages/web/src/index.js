import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../../node_modules/@blueprintjs/core/lib/css/blueprint.css';
import '../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../../../node_modules/@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import './styles/index.css';

ReactDOM.render(<App />, document.getElementById('root')); //eslint-disable-line
