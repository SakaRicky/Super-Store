import React, { useState, useEffect } from 'react'

import _ from "lodash";

import itemsServices from '../../../services/items'
import ProductsOnDeals from '../../products/Products'
import SearchBar from '../../searchbar/Searchbar'
import NavButtons from '../../nav_buttons/NavButton'


import './deals.css'

const Deals = () => {
    const [deals, setDeals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    // This state keeps the array of items that matched the search
    const [searchedItems, setSearchedItems] = useState([])
    // This state keeps the text in the searc input field
    const [searchFilter, setSearchFilter] = useState('')
    // This state is used to determine if I should render the no items found in search
    const [noItems, setNoItems] = useState(false)
    // page number we are currently in
    const [currentPageNumber, setCurrentPageNumber] = useState(0)
    // // state to keep if deals loaded from backend
    // const [deals_loaded, setDealsLoaded] = useState(initialState)

    useEffect(() => {
        const fetch_deals = async () => {
            const query = 'isOnSale=true'
            const response_data = await itemsServices.getDeals(query)
            setDeals(response_data.items)
            setIsLoading(false)
        }
        fetch_deals()
    }, [])

    // this function recieves the search text from the searchbar component and 
    // sets it to the filter state and filters out some items depending on the text
    const handleSearchedItems = (filter) => {

        setSearchFilter(filter)

        // this const is filtered items
        const itemsSearched = deals.filter(deal => {
            return deal.name.toLowerCase().includes(filter.toLowerCase())
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
        setCurrentPageNumber(deals_chuncks.length - 1)
    }

    // groups the items to display into groups of 6
    const number_of_items_to_display_per_page = 6
    const deals_chuncks = _.chunk(deals, number_of_items_to_display_per_page)

    // Since arrays idx starts at 0 and the pages nav starts at 1, this line is to sync them
    const pageDisplayed = currentPageNumber + 1

    // this var keeps the loaded deals if they have been loaded (using isLoading state)
    // or shows a message to the user that no deals have been loaded from the backend
    let loaded_deals = null

    if (isLoading === false) {
        // when the deals have been loaded, check if there are some deals and display
        // if not show the appropriate message
        if (deals.length === 0) {
            loaded_deals = <div className="noDeals"><h1>No Deals available at the moment</h1></div>
        } else {
            loaded_deals = <ProductsOnDeals items={deals_chuncks[currentPageNumber]}/>
        }
    }

    // if the searchbar have been used to search, searchFilter will have some text and in that case 
    // only send the searched products to the ProductsOnDeals component
    const deals_to_display = searchFilter !== '' ? <ProductsOnDeals items={searchedItems}/> : loaded_deals

    return (
            <div>
                <SearchBar onSearch={handleSearchedItems} items={deals}/>
                <div className="row">
                    {noItems ? <h2 className="no-item">No items matched your search</h2> : deals_to_display}
                </div>
                {noItems ? null : <NavButtons 
                    currentPage={pageDisplayed} 
                    allPages={deals_chuncks.length}
                    nextPage={handleNextPage}
                    prevPage={handlePreviousPage}
                    firstPage={handleFirstPage}
                    lastPage={handleLastPage}
                />}
            </div>
    )
}

export default Deals