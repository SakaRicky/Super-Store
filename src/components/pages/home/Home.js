import React, { useState, useEffect } from 'react'

import _ from 'lodash'

import Products from '../../products/Products'
import SearchBar from '../../searchbar/Searchbar'
import itemsServices from '../../../services/items'
import NavButtons from '../../nav_buttons/NavButton'

import './home.css'

const Home = () => {
    // Keeps all the items fetched from the backend
    const [items, setItems] = useState([])
    // This state keeps the array of items that matched the search
    const [searchedItems, setSearchedItems] = useState([])
    // This state keeps the text in the searc input field
    const [searchFilter, setSearchFilter] = useState('')
    // This state is used to determine if I should render the no items found in search
    const [noItems, setNoItems] = useState(false)
    // page number we are currently in
    const [currentPageNumber, setCurrentPageNumber] = useState(0)

    useEffect(() => {
        const fetch_data = async () => {
            const response_data = await itemsServices.getAllItems()
            setItems(response_data.items)
        }
        fetch_data()        
    }, [])

    // this function recieves the search text from the searchbar component and 
    // sets it to the filter state and filters out some items depending on the text
    const handleSearchedItems = (filter) => {

        setSearchFilter(filter)

        // this const is filtered items
        const itemsSearched = items.filter(item => {
            return item.name.toLowerCase().includes(filter.toLowerCase())
        })

        setSearchedItems(itemsSearched)

        // Each time a search it fined, this if determines wether to show products or
        // show no search found by toggling the noItems state
        if (searchFilter !== '' && itemsSearched.length === 0) {
            setNoItems(true)
        } else {
            setNoItems(false)
        }
    }

    // if a search is being done, use search items else use all items
    const items_to_display = searchFilter ? searchedItems : items

    // groups the items to display into groups of 6
    const number_of_items_to_display_per_page = 6
    const items_chuncks = _.chunk(items_to_display, number_of_items_to_display_per_page)

    // Since arrays idx starts at 0 and the pages nav starts at 1, this line is to sync them
    const pageDisplayed = currentPageNumber + 1

    const handleNextPage = () => {
        setCurrentPageNumber(currentPageNumber+1)
    }

    const handlePreviousPage = () => {
        setCurrentPageNumber(currentPageNumber - 1)
    }

    const handleFirstPage = () => {
        setCurrentPageNumber(0)
    }

    const handleLastPage = () => {
        setCurrentPageNumber(items_chuncks.length - 1)
    }

    return (
        <div>
            <SearchBar onSearch={handleSearchedItems} items={items}/>
            {noItems ? <h2 className="no-item">No items matched your search</h2> : <Products items={items_chuncks[currentPageNumber]}/>}
            <NavButtons 
                currentPage={pageDisplayed} 
                allPages={items_chuncks.length}
                nextPage={handleNextPage}
                prevPage={handlePreviousPage}
                firstPage={handleFirstPage}
                lastPage={handleLastPage}
            />
        </div>
        
    )
}

export default Home