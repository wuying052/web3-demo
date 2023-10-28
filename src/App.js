import "./App.css";
import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function App() {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(0);

  const { ethers } = require("ethers");
  let provider = null;

  const etherConnect = async () => {
    let signer = null;

    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();

      const address = await signer.getAddress();
      setAddress(address);
      queryBalance();
    }
  };

  // 查询余额
  const queryBalance = async () => {
    const text = document.getElementById("addr").value;
    console.log(text, ethers.isAddress(text));
    console.log(address);
    if (ethers.isAddress(text)) {
      setAddress(text);
    }
    if (!address) {
      return;
    }
    const balance = await provider.getBalance(address);
    const format = ethers.formatEther(balance);
    setBalance(format);
  };

  useEffect(() => {
    etherConnect();
  });

  return (
    <div className="App">
      <div className="page">
        <div className="balance">{balance}</div>
        <div className="address">{address}</div>
        <TextField
          id="addr"
          label="合约地址"
          variant="outlined"
          defaultValue={address}
        />
        <div className="button">
          <Button fullWidth size='large' variant="contained" onClick={etherConnect}>
            查询
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
