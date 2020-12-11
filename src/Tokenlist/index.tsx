import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

export default function Tokenlist() {
  interface TokenList {
    name: string;
    address: number;
    logoURL: string;
    symbol: string;
  }

  const [tokenList, setTokenList] = useState<[TokenList] | []>([]);

  // Get tokenlist
  async function getTokenList(source: string) {
    let listURL: string = '';
    if (source === 'full') {
      listURL = 'https://storage.googleapis.com/tokenlist/tokenlist.prysm.json';
    }

    if (source === 'dharma') {
      listURL = 'http://localhost:8080/list/?source=dharma';
    }

    if (source === 'coingecko') {
      listURL = 'http://localhost:8080/list/?source=coingecko';
    }
    // http://localhost:8080/add/?url
    const tokenFetch = await fetch(listURL);
    const tokenData = await tokenFetch.json();
    setTokenList(tokenData);
    console.log(tokenData);
  }

  useEffect(() => {
    getTokenList('full');
  }, []);
  return (
    <Container maxWidth="sm">
      <Grid container spacing={0} alignItems="center" justify="center">
        <Autocomplete
          id="combo-box-demo"
          options={tokenList}
          getOptionLabel={(option) => `${option.name} - ${option.symbol}`}
          style={{ width: 300 }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
        />
      </Grid>
      <Grid container direction="row" justify="center" alignItems="stretch">
        <Grid
          item
          style={{
            padding: 10,
            position: 'relative',
          }}
        >
          <Button
            onClick={() => {
              getTokenList('full');
            }}
            variant="contained"
            color="primary"
          >
            Full List
          </Button>
        </Grid>

        <Grid
          item
          style={{
            padding: 10,
            position: 'relative',
          }}
        >
          <Button
            onClick={() => {
              getTokenList('coingecko');
            }}
            variant="contained"
            color="primary"
          >
            Coingecko List
          </Button>
        </Grid>

        <Grid
          item
          style={{
            padding: 10,
            position: 'relative',
          }}
        >
          <Button
            onClick={() => {
              getTokenList('dharma');
            }}
            variant="contained"
            color="primary"
          >
            Dharma List
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
