import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import Authereum from 'authereum';
import WalletConnectProvider from '@walletconnect/web3-provider';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { MenuItem } from '@material-ui/core';
// import Drawer from '@material-ui/core/Drawer';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';

import { loginActionCreator } from './store';
import { UserDetails } from './store/type';

// import Box from "3box";
// import { provider } from "../node_modules/web3-core/types";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       flexGrow: 1,
//     },
//     menuButton: {
//       marginRight: theme.spacing(2),
//     },
//     title: {
//       flexGrow: 1,
//     },
//   }),
// );

export default function Navbar() {
  // useProtectedRoute();
  const history = useHistory();
  const classes = useStyles();
  // const [userAddress, setUserAddress] = useState<string | null>(null);
  const [isUserLogin, setUserLogin] = useState<boolean>(false);
  const [uid, setUid] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const userDetails = useSelector((state: UserDetails) => state.userDetails);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        console.error('Access to protected route denied, redirecting to login...');
        // history.push("/auth/login");
      } else {
        const db = firebase.firestore();
        const userRef = await db.collection('users').doc(user.uid).get();
        const userData = userRef.data();

        if (userData !== undefined) {
          dispatch(
            loginActionCreator({
              id: userData.handle,
              score: userData.prysmScore,
            }),
          );
          setUserLogin(true);
          setUid(`${user.uid.slice(0, 8)}...`);
        }
      }
    });
  }, [history]);

  async function connectWallet(type: string) {
    // track event
    const analytics = firebase.analytics();

    analytics.logEvent('firebase_login_clicked');
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: 'https://mainnet.infura.io/v3/4bf032f2d38a4ed6bb975b80d6340847', // required
        },
      },

      authereum: {
        package: Authereum, // required
      },

      injected: {
        display: {
          // logo: "data:image/gif;base64,INSERT_BASE64_STRING",
          name: 'Injected',
          description: 'Connect with the provider in your Browser',
        },
        package: null,
      },
    };

    const web3Modal = new Web3Modal({
      network: 'mainnet', // optional
      cacheProvider: true, // optional
      providerOptions, // required
    });

    try {
      const provider: any = await web3Modal.connect();
      const web3: Web3 = new Web3(provider);
      console.log(web3);
      console.log(web3.eth.accounts.wallet.defaultKeyName);
      console.log(web3.eth.accounts);
      const accounts: string[] = await web3.eth.getAccounts();
      const address: string = accounts[0].toLocaleLowerCase();

      analytics.logEvent('firebase_login_success', { address });

      if (type === 'firebase') {
        const token: Number = Math.floor(Math.random() * 100000);
        const signature = await web3.eth.personal.sign(
          `Prysm One-Time Key : ${token}`,
          address,
          '', // MetaMask will ignore the password argument here
        );

        // setIsLoading(true);

        console.log('addr, sign, token', address, signature, token);
        // Pass in all the data into the cloud function
        const requestObject = {
          account: address,
          token,
          signature,
        };

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestObject),
        };

        const res = await fetch('https://prysmapi-fof3wqx4uq-uc.a.run.app/auth', requestOptions);
        console.log('RES =', res);
        let dataTokenRaw: any = await res.text();
        dataTokenRaw = JSON.parse(dataTokenRaw);
        console.log('datatokenprase', dataTokenRaw);
        const fbToken: string = dataTokenRaw.token;
        console.log('fbtokenk', fbToken);

        // Sign in
        const tokenRes: any = await firebase.auth().signInWithCustomToken(dataTokenRaw.token);
        //
        console.log(tokenRes.user.uid);
        const db = firebase.firestore();

        const userRef = await db.collection('users').doc(tokenRes.user.uid).get();
        const userData = userRef.data();
        if (userData) {
          setUid(`${userData.handle.slice(0, 8)}...`);
          setUserLogin(true);
          dispatch(
            loginActionCreator({
              id: userData.handle,
              score: userData.prysmScore,
            }),
          );
          // setUserAddress(address);
          // setIsLoading(false);
        }
      }
      if (type === 'box') {
        // const ethProvider: provider = web3.eth.currentProvider;
        // const box = await Box.openBox(address, ethProvider);
        // const space = await box.openSpace("prysm-test0");
        // console.log("box == ", box);
        // console.log("box == ", space);

        setUid(`${address.slice(0, 8)}...`);
        setUserLogin(true);
      }
    } catch (e) {
      console.log('User Canceled Metamask Login/Sign', e);
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography onClick={() => history.push('/')} variant="h6" className={classes.title}>
            Prysm Dashboard
          </Typography>
          {isUserLogin ? (
            <>
              <MenuItem onClick={() => history.push('/achievements')}>Analytics</MenuItem>
              <MenuItem onClick={() => history.push('/tokenlist')}>Tokenlist</MenuItem>
              <MenuItem onClick={() => history.push('/achievements')}>Achievements</MenuItem>
              <Typography>{`${uid} Score : ${userDetails.score}`}</Typography>
            </>
          ) : (
            <>
              <Button onClick={() => connectWallet('firebase')} color="inherit">
                Login with Firebase
              </Button>
              {/* <Button onClick={() => connectWallet('box')} color="inherit">
                Login with 3Box
              </Button> */}
            </>
          )}
        </Toolbar>
      </AppBar>
      {/* <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {['Leaderboard', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </div>
      </Drawer> */}
    </div>
  );
}
