const CountryList = ({countries, setCountries, filteredCountry, setFilteredCountry}) => {
    const handleFilterChange = (event) => {
        setFilteredCountry(event.target.value)
      }

      const countriesToShow = countries.filter(country =>
        country.name.toLowerCase().includes(filteredCountry.toLowerCase())
      )

    return (
        <div>
            find countries<input value={filteredCountry} onChange={handleFilterChange}></input>
        <div>      {countriesToShow.map(country => (
        <p key={country.id}>{`${country.name}: ${country.number}`}<button onClick={() => handleDelete(person.id)}>delete</button></p>
      ))}</div>
        </div>

    )
}

export default CountryList