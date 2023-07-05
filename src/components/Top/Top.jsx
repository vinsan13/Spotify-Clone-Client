import React from 'react'

import './Top.css'
import TopCharts from '../TopCharts/TopCharts'
import TopArtists from '../TopArtists/TopArtists'

const Top = ({songs}) => {
    return (
        <div className='top'>
            <TopCharts songs={songs}/>
            <TopArtists />
        </div>
    )
}

export default Top