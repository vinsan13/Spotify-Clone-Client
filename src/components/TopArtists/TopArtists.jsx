import React, { useRef } from 'react'

import './TopArtists.css'


const TopArtists = () => {



  const horizontalScrollRef = useRef(null);

  const handleScroll = (event) => {
    
    const scrollAmount = event.deltaY;
    horizontalScrollRef.current.scrollLeft += scrollAmount;
  };

  return (

    <div className='topartists'>
      <div className='artists_header'>
        <h4>Top Artists</h4>
        <a href='/'>See more</a>
      </div>


      <div className="artists_wrapper" ref={horizontalScrollRef} onWheel={handleScroll}>
        <div className='wrapper_item'>
          <img src="./artist_img.jpg" alt="artist_img" />
        </div>

        <div className='wrapper_item'>
          <img src="./palak.jpeg" alt="artist_img" />
        </div>

        <div className='wrapper_item'>
          <img src="./paradox.jpeg" alt="artist_img" />
        </div>

        <div className='wrapper_item'>
          <img src="./dino.jpeg" alt="artist_img" />
        </div>

        <div className='wrapper_item'>
          <img src="./eminem.jpeg" alt="artist_img" />
        </div>

        <div className='wrapper_item'>
          <img src="./king.jpeg" alt="artist_img" />
        </div>

        


      </div>

    </div>
  )
}


export default TopArtists