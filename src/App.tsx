import styles from "../styles/global.module.scss"
import { Main, Partners, About } from './components';
import { Routes, Route } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from 'react'
import { TonConnectButton, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react'
import MasterStore from './store/master/master';
import { toNano } from '@ton/core'
import '@twa-dev/sdk';
import './App.css'
import classNames from 'classNames'
import { Instruction, Rocket } from './assets'

function Connect() {
  return (
    <div className={styles.Main}>
		<img src={Rocket} alt="" className={styles.Rocket} />
		<div className={styles.ConnectTon}>
			<div className={styles.tonConnectBtn}>
				<TonConnectButton className={styles.tonConnectBtn__btn} />
			</div>
			
			<div  className={styles.Instruction}>
				<img src={Instruction} alt="" />
				<h1 className={styles.Instruction__Title}>Instruction</h1>
			</div>
		</div>
	</div>
  );
}

function App() {
  const [OneToken, setOneToken] = useState(localStorage['OneToken'] == null ? 0.1 : localStorage['OneToken']);
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const wallet = useTonWallet();
  useEffect(() => {
		async function GetToken() {
			// if (tonConnectUI.account?.address == null) return;
			// setOneToken(parseInt(await (await MasterStore.ConvertSell(toNano(1))).toString()) / parseInt(toNano(1).toString()));
			// localStorage["OneToken"] = await OneToken;
			// document.getElementsByClassName(styles.Ticker)[0].classList.remove('hidden');
			setOneToken(localStorage["OneToken"]);
			document.getElementsByClassName(styles.Ticker)[0].classList.remove('hidden');
		}  

		setInterval(async () => {
			await GetToken()
		}, 4000);
		
	}, []);
	if (wallet == null) {
		return Connect();
	}

  return (
    <>
      	<Marquee className={classNames(styles.Ticker, 'hidden')}>
			<p className={styles.Ticker_Text}>1 tko = {OneToken.toString()}$</p>
			<p className={styles.Ticker_Text}>1 tko = {OneToken.toString()}$</p>
			<p className={styles.Ticker_Text}>1 tko = {OneToken.toString()}$</p>
			<p className={styles.Ticker_Text}>1 tko = {OneToken.toString()}$</p>
			<p className={styles.Ticker_Text}>1 tko = {OneToken.toString()}$</p>
			<p className={styles.Ticker_Text}>1 tko = {OneToken.toString()}$</p>
		</Marquee>
		<Main />  
		<Partners />
		<About />
    </>
  )
}

export default App
