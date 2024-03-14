"use client";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContract } from "../config";

export default function Home() {
  const [walletKey, setwalletKey] = useState("");
  const [currentData, setcurrentData] = useState("");

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setwalletKey(accounts[0]);
  };
  //<Minting>
  const [mintingAmount, setMintingAmount] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  
  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.mint(signer, mintingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  const mintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setMintingAmount(0);
    }
  };
  //</Minting>

  //<Staking>
  const [stakingAmount, setStakingAmount] = useState<number>();
  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.stake(stakingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  const stakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setStakingAmount(0);
    }
  };
  //</Staking>
 
  //<Withdraw>
  const withdrawCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  //</Withdraw>
  //<Import Token>
  const importToken = async() => {
    const {ethereum} = window as any;
    const tokenAddress = "0x4A88a531d53090884de0a4e73c07Ca9638C61665"; //contract add
    const tokenSymbol = "TTT";
    const tokenDecimal = 18;

    try{
      const wasAdded = await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimal,
          },
        },
      });
    }
    catch(error){
      console.log(error);
    }
  };
  //</Import Token>

  //HTML/TAILWIND 
  return (
    <main style={{ 
      backgroundImage: 'url(https://w0.peakpx.com/wallpaper/407/308/HD-wallpaper-pink-color-orange-sunset.jpg)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '20px',
    }}>
      <p style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '30px', marginTop: '10px' }}>
    <b>🍭🅃🅆🄸🄲🄴 🅃🄾🄺🄴🄽 🍭</b>
  </p>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
  <img src="https://i.pinimg.com/originals/f9/61/18/f961181ca1a75ca3772d967250c7e834.jpg" alt="twice" style={{ maxWidth: '100%', maxHeight: '350px' }} />
</div>


  <div style={{ minHeight: '25vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <button onClick={() => { connectWallet(); }} className="p-2 bg-white text-FC8EAC rounded" style={{ marginBottom: '10px' }}>
      {walletKey !== "" ? walletKey : " Connect wallet"}
    </button>

    <button onClick={importToken} className="p-2 bg-white text-FC8EAC rounded" style={{ marginTop: '10px', marginBottom: '10px' }}>
      Import Token
    </button>
  </div>

  <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <form>
      <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <label style={{ color: '#FFFFFF', fontSize: '18px' }}><b>Amount to Mint:</b></label>
      </div>
      <div>
        <input
          type="number"
          value={mintingAmount}
          onChange={(e) => mintAmountChange(e)}
          style={{ fontSize: '16px', padding: '5px' }}
        />
      </div>
    </form>
    <button
      onClick={() => { mintCoin(); }}
      className="p-2 bg-white text-FC8EAC rounded" style={{ marginTop: '10px' }}>
      {"Mint Token"}
    </button>
  </div>

  <br></br>

  <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '10vh' }}>
    <form>
      <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <label style={{ color: '#FFFFFF', fontSize: '18px' }}><b>Amount to Stake:</b></label>
      </div>
      <div>
        <input
          type="number"
          value={stakingAmount}
          onChange={(e) => stakeAmountChange(e)}
          style={{ fontSize: '16px', padding: '5px' }}
        />
      </div>
    </form>
    <button
      onClick={stakeCoin}
      className="p-2 bg-white text-FC8EAC rounded" style={{ marginTop: '10px' }}>
      {"Stake It"}
    </button>
  </div>

  
  <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '20vh' }}>
    <br></br>
  <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <img src="https://i.pinimg.com/736x/60/f8/c5/60f8c50dc4407cc928eae66e430f4924.jpg" alt="Loading GIF" style={{ maxWidth: '100%', maxHeight: '250px' }} />
  </div>

    
    <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <label style={{ color: '#FFFFFF', fontSize: '13px' }}>Wait a minute before withdrawing..</label>
    </div>

    <button
      onClick={withdrawCoin}
      className="p-2 bg-white text-FC8EAC rounded" style={{ marginTop: '10px' }}>
      {"Withdraw"}
    </button>
  </div>
</main>

  

  );
}  