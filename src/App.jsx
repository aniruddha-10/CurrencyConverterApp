import './App.css'
import {Box, Container, Grid, Typography } from '@mui/material'
import InputAmount from './components/inputAmount'
import SelectCountry from './components/SelectCountry'
import SwitchCurrency from './components/SwitchCurrency'
import { useContext, useEffect, useState } from 'react'
import {CurrencyContext} from './context/CurrencyContext'
import axios from 'axios'

function App() {
   const { fromCurrency , setFromCurrency, toCurrency , setToCurrency, firstAmount} = useContext(CurrencyContext);
   const codeFromCurrency = fromCurrency.split(" ")[1];
   const codeToCurrency = toCurrency.split(" ")[1];
   const [resultCurrency, setresultCurrency] = useState(0);
   useEffect(()=> {
      if(firstAmount){
         axios("https://api.freecurrencyapi.com/v1/latest", {
            params : {
               apikey: "fca_live_Ri4HnJMhmmWG0jYTrMuv7YaYpbuFRFzQjz2SQUHN",
               base_currency: codeFromCurrency,
               currencies: codeToCurrency
            }
      })
         .then(response => setresultCurrency(response.data.data[codeToCurrency]))
         .catch(error => console.log(error))
      }

   }, [firstAmount,fromCurrency, toCurrency])
   const boxStyles ={
      background:"#fdfdfd",
      marginTop: "10rem", 
      color:"#222",
      minHeight:"20rem",
      borderRadius: 4,
      padding:"4rem 2rem",
      boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
      position: "relative"
   }
  return (
      <Container maxWidth="md" sx={boxStyles}>
         <Typography variant='h4' sx={{ marginBottom: "2rem"}}>Stay Ahead with Accurate Conversions</Typography>
         <Grid container spacing={2}>
            <InputAmount />
            <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From"/>
            <SwitchCurrency />
            <SelectCountry value={toCurrency} setValue={setToCurrency} label="To" />
         </Grid>

         {firstAmount ? (
            <Box sx= {{ textAlign:"center",marginTop:"1rem"}}>
               <Typography> {firstAmount} {fromCurrency} = </Typography>
               <Typography variant='h5' sx={{ marginTop: "5px", fontWeight: "bold"}} > {resultCurrency * firstAmount} {toCurrency} </Typography>
            </Box> ) : ""}

      </Container>
  )
}
export default App