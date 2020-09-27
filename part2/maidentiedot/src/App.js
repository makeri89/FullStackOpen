import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ filtered, setFiltered ] = useState([])
  let countriesToShow = ''
  let capital = ''
  let population = ''
  let flagurl = ''
  let flag = ''
  let languages = []
  let languagetitle = ''
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
  }

  if (filtered.length > 10) {
    countriesToShow = 'Too many matches, specify another filter'
  } else if (filtered.length <= 10 && filtered.length > 1) {
    countriesToShow = filtered.map(country => <p key={country.name}>{country.name} <button>show</button></p>)
  } else if (filtered.length === 1) {
    countriesToShow = <h2>{filtered[0].name}</h2>
    capital = <p>capital {filtered[0].capital}</p>
    population = <p>population {filtered[0].population}</p>
    languagetitle = 'languages'
    languages = filtered[0].languages.map(language => <li key={language.name}>{language.name}</li>)
    flagurl = filtered[0].flag
    flag = <img src={flagurl} alt="flag" height='100px'/>
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