import React from 'react'

import './TopCharts.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'

const TopCharts = ({ songs }) => {
  return (
    <div className='topcharts'>
      <div className='charts_header'>
        <h4>Top Charts</h4>
        <a href='/'>See more</a>
      </div>

      <div className='top5_charts'>
        {songs.map((song,ind) => (
          <div key={ind} className='chart'>
            <h6>{ind+1}.</h6>
            <img src={song.songCover} alt='card_img' />
            <div className='chart_detail'>
              <h4>{song.title}</h4>
              <p>{song.artist}r</p>
            </div>
            <FontAwesomeIcon className='play_pause' icon={faCirclePlay} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopCharts