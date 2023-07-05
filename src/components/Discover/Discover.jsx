import React, { useState, useEffect, useRef } from 'react'

import Search from '../Search/Search'
import MusicPlayer from '../MusicPlayer/MusicPlayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePause } from '@fortawesome/free-solid-svg-icons';
import './Discover.css'


const genreArr = [
  { title: 'Tere Vaaste', genre: 'Soul' },
  { title: 'Duniyaa', genre: 'Soul' },
  { title: 'Mockingbird', genre: 'Pop' },
  { title: 'Gangsta\'s Paradise', genre: 'Pop' },
  { title: 'Jaadugar', genre: 'Pop' },
  { title: 'Maan Meri Jaan', genre: 'Soul' },
  { title: 'Dandelions', genre: 'Soul' },
  { title: 'Mirage', genre: 'Pop' },
  { title: 'Kaun Tujhe', genre: 'Soul' }
]

const Discover = ({ songs }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [genre, setGenre] = useState('All')
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(false);
  const [songId, setSongId] = useState(0);
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const playlistLength = filteredSongs.length;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1180); // Adjust the breakpoint as per your requirement
    };

    handleResize(); // Set initial value

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const horizontalScrollRef = useRef(null);

  const handleScroll = (event) => {
    
    const scrollAmount = event.deltaY;
    horizontalScrollRef.current.scrollLeft += scrollAmount;
  };

  useEffect(() => {
    setCurrentSong(filteredSongs[songId]);
  }, [songId])

  useEffect(() => {
    filterSongs();
  }, [genre,searchQuery, songs ])


  const filterSongs = () => {
    let filtered = songs.filter((song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    let genreFiltered = [];
    if (genre === 'All') genreFiltered = filtered;
    else {
      for (let i = 0; i < filtered.length; i++) {
        
        let qualify = false;
        for (let j = 0; j < genreArr.length; j++) {
          if (filtered[i].title === genreArr[j].title) {
            
            if (genre === genreArr[j].genre) qualify = true;
            break;
          }
        }
        if (qualify) genreFiltered.push(filtered[i]);
      }
    }
    setFilteredSongs(genreFiltered);
  };


  const handleClick = (song, id) => {

    if (currentSong?.title === song.title) setIsPlaying(!isPlaying)
    else {
      setCurrentSong(song);
      setSongId(id)
      setIsPlaying(true)
    }
  }

  return (
    <div className='discover'>
      <Search setSearchQuery={setSearchQuery} />
      <MusicPlayer playlistLength={playlistLength} song={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} songId={songId} setSongId={setSongId} />
      <div className='discover_header'>
        {searchQuery==='' ? <h1 className='discover_title'>Discover</h1> : <h3 className='discover_title'>Search results for <span style={{color:'#00ffb1'}}>{searchQuery}</span></h3>}
        <select className='discover_genre' value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="All" >All</option>
          <option value="Soul" >Soul</option>
          <option value="Pop" >Pop</option>
        </select>
      </div>
      <div className='discover_feed' ref={horizontalScrollRef} onWheel={isMobile ? handleScroll : null}>

        {filteredSongs.map((song, id) => (

          <div style={{ opacity: (isPlaying && currentSong.title === song.title) ? 0.8 : 1 }} key={id} onClick={() => handleClick(song, id)} className='discover_feed_card'>
            <img className="card_img" src={song.songCover} alt='card_img' />
            <h4 className="card_title">{song.title}</h4>
            <p className="card_desc">{song.artist}</p>
            {(isPlaying && currentSong.title === song.title) && <FontAwesomeIcon className='pause-img' icon={faCirclePause} />}
          </div>

        ))}
      </div>
    </div>
  )
}

export default Discover