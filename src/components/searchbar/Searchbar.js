import React, { useState } from 'react'
import PropTypes from 'prop-types';

import { BsSearch } from 'react-icons/bs';

import './searchbar.css'


const Searchbar = ({onSearch, items}) => {
    // state to contain the string to search in the items name from the parent's state
    // mainly used for the submit when the form is submitted
    const [searchItem, setSearchItem] = useState("")

    // this function 
    const handleChange = ({target}) => {
        // setSearchItem(target.value)
        setSearchItem(target.value)
        onSearch(target.value)
    }

    const handleSearch = (event) => {
        // prevents the page from reloading
        event.preventDefault()

        onSearch(searchItem)
    }

    return <div className="row bg-secondary">
                <form className="form-inline mx-auto h-25" onSubmit={handleSearch}>
                    <div className="col-xs">
                        <input 
                            className="form-control" 
                            type="search" 
                            placeholder="Search" 
                            aria-label="Search" 
                            onChange={handleChange}
                        />
                        <button className="btn search" type="submit"><BsSearch /></button>
                    </div>
                </form>
            </div>
}

// props validators
Searchbar.prototype = {
    setSearch: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired
}

export default Searchbar