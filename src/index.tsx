import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import firebase from "firebase/app";
import "firebase/analytics";

import { config as firebaseConfig } from "./creds.js";
import { Provider } from "react-redux";

// import store from "./redux-og";
import store from "./store";
import { MatomoProvider, createInstance } from "@datapunt/matomo-tracker-react";

const instance = createInstance({
  urlBase: "https://uiprysm.matomo.cloud/",
  siteId: 1,
  // userId: undefined, // optional, default value: `undefined`.
  // trackerUrl: 'https://uiprysm.matomo.cloud/tracking.php', // optional, default value: `${urlBase}matomo.php`
  // srcUrl: 'https://uiprysm.matomo.cloud/tracking.js', // optional, default value: `${urlBase}matomo.js`
  disabled: false, // optional, false by default. Makes all tracking calls no-ops if set to true.
  heartBeat: {
    // optional, enabled by default
    active: true, // optional, default value: true
    seconds: 10, // optional, default value: `15
  },
  linkTracking: true, // optional, default value: true
  configurations: {
    // optional, default value: {}
    // any valid matomo configuration, all below are optional
    disableCookies: true,
    setSecureCookie: true,
    setRequestMethod: "POST",
  },
});

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <MatomoProvider value={instance}>
      <Provider store={store}>
        <App />
      </Provider>
    </MatomoProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
