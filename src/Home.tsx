import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { useSelector } from 'react-redux';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { UserDetails } from './store/type';
import covalent_getUserTotalBalance from './utility/utility';

export default function FullWidthTabs() {
  const [tableRows, setTableRows] = useState<any>([]);

  const userDetails = useSelector((state: UserDetails) => state.userDetails);

  function createData(
    logo_url: string,
    balance: number,
    price: number,
    value: number,
    tickerSymbol: string,
  ) {
    return {
      logo_url,
      balance,
      price,
      value,
      tickerSymbol,
    };
  }

  async function createTable(ethAddress: string) {
    const userBalances: any[] = await covalent_getUserTotalBalance(ethAddress);

    // 1. Filter small and errored values
    // 2. Put together an array for the remaining values

    const tmpTableRows = userBalances
      .filter((asset) => {
        const price: number = parseFloat(asset.quote_rate.toFixed(3));
        if (price > 0 && price !== null && price !== undefined) {
          return true;
        }
        return false;
      })
      .map((asset) => {
        const price: number = parseFloat(asset.quote_rate.toFixed(3));
        const logoUrl: string = asset.logo_url;
        const value: number = parseFloat(asset.quote.toFixed(3));
        const balance: number = parseFloat((value / price).toFixed(3));
        const tickerSymbol: string = asset.contract_ticker_symbol;
        const row = createData(logoUrl, balance, price, value, tickerSymbol);
        return row;
      });

    console.log('Table Rows', tmpTableRows);
    setTableRows(tmpTableRows);
  }

  useEffect(() => {
    console.log('USER DETAILS === ', userDetails);
    if (userDetails.id !== '') {
      createTable(userDetails.id);
    }
    // eslint-disable-next-line
  }, [userDetails]);

  return (
    <div>
      <Container>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell>Dessert (100g serving)</TableCell> */}
                <TableCell align="left">Asset</TableCell>
                <TableCell align="right">Balance&nbsp;</TableCell>
                <TableCell align="right">Value&nbsp;</TableCell>
                <TableCell align="right">Price&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            {tableRows !== [] && (
              <TableBody>
                {tableRows.map((row: any) => (
                  <TableRow key={row.tickerSymbol}>
                    <TableCell component="th" scope="row">
                      <Avatar alt="" src={row.logo_url} />
                    </TableCell>
                    <TableCell align="right">{row.balance}</TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}
