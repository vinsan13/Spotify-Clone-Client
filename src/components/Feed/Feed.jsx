import React,{useState, useEffect} from 'react'

import Navbar from '../Navbar/Navbar'
import Discover from '../Discover/Discover'
import Top from '../Top/Top';
import { getSongs } from '../../actions/songs';

import './Feed.css'

const Feed = () => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {

        getSongs().then((data) => setSongs(data));
    
      }, [])
    return (
        <div>
            <div className='container'>
                <Navbar />
                <Discover songs={songs}/>
                <Top songs={songs}/>
            </div>
            
        </div>
    )
}

export default Feed