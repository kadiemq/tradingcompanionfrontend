import './App.css';
import {useEffect} from 'react';
// const fs = require('fs');
import { createChart, CrosshairMode } from 'lightweight-charts';

function App() {

  useEffect(() => {

    const div = document.getElementsByClassName('chart')[0]
    const validated = false;

      fetch('https://klinesdata.s3.amazonaws.com/BTCUSDT_1m.json')
          .then((r) => r.json())
          .then((r) => {
              console.log(r)

              const chart = createChart(div, { width: 600, height: 300, crosshair: { mode: CrosshairMode.Normal},
                  timeScale: {
                      borderColor: 'rgba(197, 203, 206, 0.8)',
                      timeVisible: true,
                      secondsVisible: false,
                  },});
              const candleSeries = chart.addCandlestickSeries();
              candleSeries.setData(r)

              const last_timestamp = r[r.length - 1].time



              const wss = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1m')

              wss.onmessage = (e) => {
                const msg = JSON.parse(e.data)
                const candle = msg.k;

                // if (candle.t / 1000 - last_timestamp > 60) {
                //   console.log('a timestamp was skipped!!!')
                // }

                candleSeries.update({
                  time: candle.t / 1000,
                  open: candle.o,
                  high: candle.h,
                  low: candle.l,
                  close: candle.c
                })
              }
          })
  })

  return (
    <div >
      <div className={'chart'}>

      </div>
    </div>
  );
}

export default App;
