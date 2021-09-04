import React, { useEffect, useState } from 'react';
import './style.css';
import btc_icon from './BC_Logo_.png';
import cardano_icon from './Cardano-ADA-icon.png';
import dogecoin_Logo from './Dogecoin_Logo.png';
import eth_icon from './ethereum-icon-3.jpg';
import bnb_icon from './logo.png';

const CryptoBar = () => {
  const [rounds, setRounds] = useState(1);
  const [btc_price, set_btc_price] = useState(0);
  const [cardan_price, set_cardan_price] = useState(0);
  const [dogecoin_price, set_dogecoin_price] = useState(0);
  const [eth_price, set_eth_price] = useState(0);
  const [bnb_price, set_bnb_price] = useState(0);

  useEffect(() => {
    window.addEventListener('load', (event) => {
      move();
      set_prices();
    });
  });

  function set_prices() {
    const btcwss = new WebSocket(
      `wss://stream.binance.com:9443/ws/btcusdt@kline_1m`,
    );
    btcwss.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      let close = msg.k.c;
      close = Number(close).toFixed(2);
      set_btc_price(close);
    };

    const adawss = new WebSocket(
      `wss://stream.binance.com:9443/ws/adausdt@kline_1m`,
    );
    adawss.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      let close = msg.k.c;
      close = Number(close).toFixed(2);
      set_cardan_price(close);
    };

    const dogewss = new WebSocket(
      `wss://stream.binance.com:9443/ws/dogeusdt@kline_1m`,
    );
    dogewss.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      let close = msg.k.c;
      close = Number(close).toFixed(2);
      set_dogecoin_price(close);
    };

    const ethwss = new WebSocket(
      `wss://stream.binance.com:9443/ws/ethusdt@kline_1m`,
    );
    ethwss.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      let close = msg.k.c;
      close = Number(close).toFixed(2);
      set_eth_price(close);
    };

    const bnbwss = new WebSocket(
      `wss://stream.binance.com:9443/ws/bnbusdt@kline_1m`,
    );
    bnbwss.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      let close = msg.k.c;
      close = Number(close).toFixed(2);
      set_bnb_price(close);
    };
  }

  function move() {
    const scroll_div = document.querySelector('.cryptobar_wrapper');
    const items_wrapper = scroll_div.firstChild;
    setRounds(rounds + 1);
    let scroll = 0;

    const options = {
      root: scroll_div,
      rootMargin: '0px',
      threshold: 0,
    };

    const callback = (entries) => {
      if (!entries[0].isIntersecting) {
        scroll = 0;
      }
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(items_wrapper);

    let id = null;
    clearInterval(id);
    id = setInterval(frame, 10);
    function frame() {
      scroll += 0.5;
      scroll_div.scrollLeft = scroll;
    }
  }

  return (
    <div className={'cryptobar_wrapper'}>
      {[...Array(rounds)].map((round) => (
        <div key={round} className={'items_wrapper'}>
          <div className={'cryptobar_item'}>
            <img src={btc_icon} alt={'btc_icon'} />
            <p>{btc_price} $</p>
          </div>

          <div className={'cryptobar_item'}>
            <img src={cardano_icon} alt={'cardano_icon'} />
            <p>{cardan_price} $</p>
          </div>

          <div className={'cryptobar_item'}>
            <img src={dogecoin_Logo} alt={'dogecoin_icon'} />
            <p>{dogecoin_price} $</p>
          </div>

          <div className={'cryptobar_item'}>
            <img src={eth_icon} alt={'eth_icon'} />
            <p>{eth_price} $</p>
          </div>

          <div className={'cryptobar_item'}>
            <img src={bnb_icon} alt={'bnb_icon'} />
            <p>{bnb_price} $</p>
          </div>

          <div className={'cryptobar_item'}>
            <img src={bnb_icon} alt={'bnb_icon'} />
            <p>{bnb_price} $</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CryptoBar;
