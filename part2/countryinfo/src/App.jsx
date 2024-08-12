import { useState, useEffect } from 'react'
import countryService from './services/countries'

const CountryList = ({ countries, filteredCountry, handleFilterChange }) => {
  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(filteredCountry.toLowerCase())
  )

  let content;
  if (countriesToShow.length > 10) {
    content = <p>Too many matches, please specify another filter</p>;
  } else if (countriesToShow.length === 1) {
    const country = countriesToShow[0];
    content = (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="100" />
      </div>
    );
  } else {
    content = countriesToShow.map(country => (
      <p key={country.cca3}>{country.name.common}</p>
    ));
  }

  return (
    <div>
      <div>
        find countries<input value={filteredCountry} onChange={handleFilterChange}></input>
      </div>
      <div>
        {content}
      </div>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountry, setFilteredCountry] = useState('')
  const [count, setCount] = useState(0)

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  useEffect(() => {
    const countriesToShow = countries.filter(country =>
      country.name.common.toLowerCase().includes(filteredCountry.toLowerCase())
    )
    setCount(countriesToShow.length)
  }, [countries, filteredCountry])

  const handleFilterChange = (event) => {
    setFilteredCountry(event.target.value)
  }

  return (
    <div>
      <CountryList
        countries={countries}
        filteredCountry={filteredCountry}
        handleFilterChange={handleFilterChange}
      />
      <p>Matching countries: {count}</p>
    </div>
  )
}

export default App
