import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ search, setSearch ] = useState('')
  const [ filtered, setFiltered ] = useState([])
  const [ weatherInfo, setWeatherInfo ] = useState([])
  let countriesToShow = ''
  let capital = ''
  let population = ''
  let flagurl = ''
  let flag = ''
  let languages = []
  let languagetitle = ''
  // let weatherinfo = []
  let temperature = ''

  useEffect(() => {
    const apiUrl = 'https://restcountries.eu/rest/v2/all'
    axios
      .get(apiUrl)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (e) => {
    setFiltered(countries.filter(country => country.name.toLowerCase().includes(e.target.value.toLowerCase())))
    axios
      .get('http://api.weatherstack.com/current?access_key=89778374dfc58041576b0e75f37d664b&query=Helsinki')
      .then(response => {
        setWeatherInfo(response.data.current)
        console.log(weatherInfo)
      })
  }
  // console.log(filtered)

  // weather api haku tänne, koko ajan filtered[0]:sta ja vaan sen renderöinti ifin sisään
  

  // console.log(weatherInfo)

  if (filtered.length > 10) {
    countriesToShow = 'Too many matches, specify another filter'
  } else if (filtered.length <= 10 && filtered.length > 1) {
    countriesToShow = filtered.map(country => <p>{country.name} <button>show</button></p>)
  } else if (filtered.length === 1) {
    countriesToShow = <h2>{filtered[0].name}</h2>
    capital = <p>capital {filtered[0].capital}</p>
    population = <p>population {filtered[0].population}</p>
    languagetitle = 'languages'
    languages = filtered[0].languages.map(language => <li>{language.name}</li>)
    flagurl = filtered[0].flag
    flag = <img src={flagurl} alt="flag" height='100px'/>
    // axios
    //   .get('http://api.weatherstack.com/current?access_key=9b4b4d1f9ba993927e2d18ad36d0813b&query=Helsinki')
    //   .then(response => {
    //     setWeatherInfo(response.data.current)
    //     // console.log(weatherinfo)
    //   }, [])
    // console.log(weatherInfo)
    // temperature = <p><strong>temperature:</strong> {weatherInfo.temperature} Celsius</p>
    // console.log(temperature)
  }

  return (
    <div>
      find countries <input type='text' onChange={handleSearchChange}></input>
      <div>{countriesToShow}</div>
      {capital}
      {population}
      <h3>{languagetitle}</h3>
      <ul>{languages}</ul>
      {flag}
      {temperature}
    </div>
  )
}

export default App;


// https://restcountries.eu/rest/v2/all
// http://api.weatherstack.com/