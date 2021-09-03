import {useEffect, useState, useRef} from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';


const Chart = () => {

	const [data, setData] = useState([])
	const [interval, setInterval] = useState('1m')
	const chart_refrence = useRef(null);

	useEffect(() => {
		const chart = createChart(document.getElementsByClassName('chart')[0],
			{ height: 500, width: 500, crosshair: { mode: CrosshairMode.Normal},
			timeScale: { borderColor: 'rgba(197, 203, 206, 0.8)', timeVisible: true, secondsVisible: false,},
			});

		chart_refrence.current = chart.addCandlestickSeries();

	}, [])

	useEffect(() => {
		(async () => {
			fetch(`https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${interval}&limit=1000`)
				.then(r => r.json())
				.then(r => {
					(r.forEach(candle => {

						const data = {
							time: candle[0] / 1000,
							open: candle[1],
							high: candle[2],
							low: candle[3],
							close: candle[4]
						}

						setData(oldArray => [...oldArray,data])
					}))
				})
		})()
	}, [])

	useEffect(() => {
		chart_refrence.current.setData(data)
	}, [data])


	useEffect(() => {
		const wss = new WebSocket(`wss://stream.binance.com:9443/ws/btcusdt@kline_${interval}`)

		          wss.onmessage = (e) => {
					  const msg = JSON.parse(e.data)
					  const candle = msg.k;

					  const data ={
						  time: candle.t / 1000,
						  open: candle.o,
						  high: candle.h,
						  low: candle.l,
						  close: candle.c
					  }

					  chart_refrence.current.update(data)
				  }
	})

	const intervalChange = (e) => {
		setInterval(e.target.value);
		setData([])
	}

	return (
		<div className={'chart-wrapper'}>
			<div className={'chart'}>

			</div>

			<div>
				<label htmlFor="cars">Choose interval:</label>

				<select id="cars" onChange={intervalChange} value={interval}>
					<option value="1m">1 Minute</option>
					<option value="5m">5 Minutes</option>
					<option value="15m">15 Minutes</option>
					<option value="1h" selected>1 Hour</option>
				</select>
			</div>
		</div>
	)
}

export default Chart;
