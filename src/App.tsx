import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Tokenlist from './Tokenlist';
import FullWidthTabs from './Home';
import Navbar from './Navbar';
import Achievements from './components/Achievements';
// import Box from "3box";
// import { provider } from "../node_modules/web3-core/types";

const GlobalCss = withStyles({
  '@global': {
    '.MuiAppBar-root': {
      // background: 'purple',
      boxShadow: 'none',
    },
    '.MuiContainer-root': {
      paddingTop: '80px',
      maxWidth: 'lg',
      // paddingLeft: '80px',
    },
  },
})(() => null);

export default function App() {
  return (
    <div>
      <GlobalCss />
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={FullWidthTabs} />
          <Route path="/achievements" exact component={Achievements} />
          <Route path="/tokenlist" exact component={Tokenlist} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
