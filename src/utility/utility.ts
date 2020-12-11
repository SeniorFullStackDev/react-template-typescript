import axios from "axios";

export default async function covalent_getUserTotalBalance(address: string | null) {
  const covalentKey = "ckey_f8deb1540c5842b887c1088f4e2";
  //https://api.covalenthq.com/v1/1/address/0xA163C2394afc9D20bCaAb6a2ff6bcFbeb00Ded80/balances_v2/
  const url =
    "https://api.covalenthq.com/v1/1/address/" +
    address +
    "/balances_v2/?key=" +
    covalentKey;
  console.log("aaa url =", url);

  let response = await axios.get(url);
  console.log("aaa resp ", response);

  let totalBalance : Number = 0;
  for (let i = 0; i < response.data.data.items.length; i++) {
      totalBalance += response.data.data.items[i].quote
  }
  console.log("total balalance = ", totalBalance)


    if (response.data.error === false) {
      // slice data here
      return response.data.data.items;
    }
    else {
      return null;
    }
}
