import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './Search.css'

const Search = ({setSearchQuery}) => {
  return (
    <div className='search-container'>
        <input onChange={(e)=>setSearchQuery(e.target.value)}  className="search" type="text" placeholder='Search song title...'  />
        <FontAwesomeIcon className='search-icon' icon={faMagnifyingGlass} />
    </div>
  )
}

export default Search