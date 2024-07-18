const Filter = ({filteredName, setFilteredName}) => {

    const handleFilterChange = (event) => {
      setFilteredName(event.target.value)
    }
    
    return (
      <input value={filteredName} onChange={handleFilterChange}/>
    )
  }

export default Filter