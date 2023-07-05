import React, { useState } from 'react'
// import FileBase from 'react-file-base64';
import './Form.css'

import { uploadSong } from '../../actions/songs';

const Form = () => {
    const [songData, setSongData] = useState({ title: '', artist: '', songCover: '', songMp3: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        uploadSong(songData).then((data) => { console.log(data) });

    }

    return (
        <div className='form-container'>
            <form className='form' onSubmit={handleSubmit}>
                <h3>Upload Song</h3>
                <div><input value={songData.title} onChange={(e) => setSongData({ ...songData, title: e.target.value })} type='text' placeholder='Title' /></div>
                <div><input value={songData.artist} onChange={(e) => setSongData({ ...songData, artist: e.target.value })} type='text' placeholder='Artist(s)' /></div>
                <div><input value={songData.songCover} onChange={(e) => setSongData({ ...songData, songCover: e.target.value })} type='text' placeholder='SongCover Url' /></div>
                <div><input value={songData.songMp3} onChange={(e) => setSongData({ ...songData, songMp3: e.target.value })} type='text' placeholder='SongMp3 Url' /></div>
                {/* <div className='fileInput'>
                    <span>Song Cover</span>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setSongData({ ...songData, songCover: base64 })} />
                </div>
                <div className='fileInput'>
                    <span>Song Mp3</span>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setSongData({ ...songData, songMp3: base64 })} />
                </div> */}
                <button type='submit'>Upload</button>
            </form>
        </div>
    )
}

export default Form