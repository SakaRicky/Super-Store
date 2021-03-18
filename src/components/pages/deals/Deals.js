import React, { useState, useEffect } from 'react'

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

    const deals_to_display = isLoading === false && deals.length === 0 ? <div className="noDeals"><h1>No Deals available at the moment</h1></div> : <ProductsOnDeals items={deals}/>

    return (
            <div>
                <SearchBar onSearch={handleSearchedItems} items={deals}/>
                <div className="row">
                    {deals_to_display}
                </div>
                <NavButtons />
            </div>
    )
}

export default Deals