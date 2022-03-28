import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {Provider as AlertProvider} from 'react-alert';
// import AlertTemplate from 'react-alert-template-basic';


//optional configuration
// const options = {
//     position: 'bottom center',
//     timeout: 5000,
//     offset: '30px',
//     transition: 'scale'
// }

// const AlertRoot = () => {
//     <AlertProvider template={AlertTemplate} {...options}>
//         <Game/>
//     </AlertProvider>
// }


ReactDOM.render(
<React.StrictMode>  <App/>
</React.StrictMode>
, document.getElementById('root')
    );







