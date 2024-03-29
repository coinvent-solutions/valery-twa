import styles from "./Partners.module.scss";
import Marquee from "react-fast-marquee";
import { Book, Community, HomePage, Info, Instruction, PartnersImg, Rocket, Token, Wallet, Group, CommunityActive, Exit } from '../../assets';
import { Link, Route, BrowserRouter, Routes } from "react-router-dom";
import classNames from "classNames"
import { toNano } from '@ton/core'
import MasterStore from "../../store/master/master"
import { useTonConnectUI } from '@tonconnect/ui-react';
import { Address } from '@ton/core'
import { useEffect, useState } from 'react'
import Links from '../../store/links/links';


function Partners() {
	const [tonConnectUI, setOptions] = useTonConnectUI();
	const [CopyText, setCopyText] = useState(false);
	const [Part, setPart] = useState(localStorage['Partners'] == null ? 0n : localStorage['Partners']);
	// xhr.open('GET', 'http://127.0.0.1:3000/');
	// xhr.responseType = 'json';
	// xhr.send();
	// xhr.onload = function() {
	// 	let refer = xhr.response;
	// 	try {
	// 		MasterStore.AddRefer(tonConnectUI, Address.parse(refer))
	// 	} catch {}
	// };

	useEffect(() => {
		async function GetPartners() {
			// if (tonConnectUI.account?.address == null) return;
			// const L = await MasterStore.GetPartners(tonConnectUI);
			// if (L != null) {
			// 	localStorage['Partners'] = L;
			// 	setPart(L);
			// }
			setPart(localStorage['Partners']);
		}
		setInterval(async () => {
			await GetPartners()
		}, 10000);
		
	}, [])

	function CopyFunc() {
		let text = (document.getElementById("Link")  as HTMLInputElement).textContent;
		navigator.clipboard.writeText(text ? text : "");
		setCopyText(true);
		setTimeout(() => (document.getElementById("BlockCopy") as HTMLDivElement).setAttribute('style', `transition: transform 0.7s; transform: translateX(-102px);`), 300);
		setTimeout(() => (document.getElementById("BlockCopy") as HTMLDivElement).setAttribute('style', `transition: transform 0.7s; transform: translateX(102px);`), 1700);
		setTimeout(() => setCopyText(false), 2500);
	}

	return (
		<div className='hidden' id='Partners'>	
		<img src={Exit} alt="" className={styles.Exit} onClick={() => tonConnectUI.disconnect()} />
			<div className={styles.CenterInfo}>
				<div className={styles.CenterImg}>
					<img src={PartnersImg} alt="" className={styles.MainImg} />
				</div>
				<h1 className={styles.PartnersText}>Partners info</h1>
				<div className={styles.PartnersPlusImg}>
					<img src={Group} alt="" />
					<h1 className={styles.PartnersCount}>{Part.toString()} partners</h1>
				</div>
				<h1 className={styles.PartnersDetail}>+100 (token name)</h1>
			</div>
			<div className={styles.Footer}>
				<div onClick={Links.GoPartners} className={styles.FooterButton}><div className={styles.FooterButtonActive}><img src={CommunityActive} alt="" /></div></div>
				<div onClick={Links.GoMain} className={styles.FooterButton}><img src={HomePage} alt="" /></div>
				<div onClick={Links.GoAbout} className={styles.FooterButton}><img src={Book} alt="" /></div>
			</div>
			<div className={styles.RefferalLink}>
				<h1 className={styles.RefferalLink_Title}>Refferal link</h1>
				<h1 id="Link" className={styles.RefferalLink_Link}>https://t.me/tgminiapp_bot?start={tonConnectUI.account?.address.slice(2)}</h1>
				<div className={styles.RefferalLink_Buttons}>
					<div onClick={CopyFunc} className={classNames(styles.cursor_pointer, styles.RefferalLink_Button)}><p className={styles.RefferalLink_Button_Title}>Copy</p></div>
					<a href={`https://telegram.me/share/url?url=https://t.me/tgminiapp_bot?start=${tonConnectUI.account?.address.slice(2)}`} className={classNames(styles.cursor_pointer, styles.RefferalLink_Button)}><p className={styles.RefferalLink_Button_Title}>Share</p></a>
				</div>
			</div>
			{CopyText ? <h1 id="BlockCopy" className={styles.BlockCopy}><p className={styles.BlockCopyText}>Copied</p></h1> : ""}
		</div>
	);
  }

export default Partners;
