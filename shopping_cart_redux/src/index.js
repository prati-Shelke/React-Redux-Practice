import React from 'react';
import './index.css';
import App from './App';
import ReactDOM from "react-dom/client";
import {Provider} from 'react-redux'
import {store,Persistor} from './store/store'
import { PersistGate } from 'redux-persist/integration/react';


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate persistor={Persistor}> */}
        <App />
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
);

