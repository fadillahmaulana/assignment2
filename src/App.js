import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';


function App() {

  const currencydata = [
    {cur: "CAD", buy: 0, exchangeRate: 0, sell: 0 },
    {cur: "EUR", buy: 0, exchangeRate: 0, sell: 0 },
    {cur: "IDR", buy: 0, exchangeRate: 0, sell: 0 },
    {cur: "JPY", buy: 0, exchangeRate: 0, sell: 0 },
    {cur: "CHF", buy: 0, exchangeRate: 0, sell: 0 },
    {cur: "GBP", buy: 0, exchangeRate: 0, sell: 0 },
  ]
  
  const [ratesCur, setRatesCur] = useState([])
  
  const GetCurrencyFetch = () => {
    useEffect(()=>{
      axios.get('https://api.currencyfreaks.com/latest?apikey=232a762418354b43879eff481ff562fb&symbols=CAD,EUR,IDR,JPY,CHF,GBP')
      .then(({data})=>{
        setRatesCur(data.rates)
      })
    }, [])
    return ratesCur
  }
  
  const GetCurrencyData = (currencydata, ratesCur) => {
    const res = [];
    for(let i=0; i<currencydata.length; i++){
      let curKey = currencydata[i].cur
      let exRate = Number(ratesCur[curKey]).toFixed(4)
      let rateSell = Number((exRate * 5)/100).toFixed(4)
      currencydata[i].exchangeRate = exRate
      currencydata[i].buy = Number(+exRate+ +rateSell).toFixed(4)
      currencydata[i].sell = Number(exRate - rateSell).toFixed(4)
      res.push(currencydata[i])
    }
    return res
  }
  
  const rateHitung = GetCurrencyData(currencydata, GetCurrencyFetch())

  return (

   <div>
    <table className='customers'>
      <thead>
        Foreign Exchange Rate
      </thead>
      <tbody>
        <tr>
          <th>Currency</th>
          <th>We Buy</th>
          <th>Exchange Rate</th>
          <th>We Sell</th>
        </tr>

        {
          rateHitung.map((datares, i)=>{
            return(
              <tr key={i}>
              <td className=''>{datares.cur}</td>
              <td>{datares.buy}</td>
              <td>{datares.exchangeRate}</td>
              <td>{datares.sell}</td>
            </tr>
            )
          })
        }

      </tbody>
    </table>
    <h3><center>Rate are based from 1 USD</center></h3>
    <h3><center>This Application use API https://currencyfreaks.com/</center></h3>
   </div>
  );
}

export default App;
