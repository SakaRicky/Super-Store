import React from 'react'
import PropTypes from 'prop-types'

import './navButton.css'

const NavButtons = ({currentPage, allPages, nextPage, prevPage, firstPage, lastPage}) => {

    // const 

    return (
        <div className="nav-button">
            <div>
                <button className="mx-3"  onClick={() => firstPage()} disabled={currentPage===1}>First</button>
                <button onClick={() => prevPage()} disabled={currentPage===1}> &lt; </button>
                <span className="mx-3">{currentPage} - {allPages}</span>
                <button onClick={() => nextPage()} disabled={currentPage===allPages}> &gt; </button>
                <button className="mx-3"  onClick={() => lastPage()} disabled={currentPage===allPages}>Last</button>
            </div>
        </div>
    )
}

NavButtons.prototype = {
    currentPage: PropTypes.number.isRequired,
    allPages: PropTypes.number.isRequired,
    nextPage: PropTypes.func.isRequired,
    prevPage: PropTypes.func.isRequired
}

export default NavButtons