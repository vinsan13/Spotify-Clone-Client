import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faBackwardStep, faForwardStep, faShuffle, faRepeat, faVolumeHigh } from '@fortawesome/free-solid-svg-icons'


import './MusicPlayer.css'
const MusicPlayer = ({ playlistLength, song, isPlaying, setIsPlaying, setSongId, songId }) => {
    const audioRef = useRef(null);
    const progressBarRef = useRef(null);

    const [volume, setVolume] = useState(0.5);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const [isRepeatOn, setIsRepeatOn] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
    };

    const togglePlay = () => {

        const audioElement = audioRef.current;

        if (isPlaying) {
            audioElement.pause();
        } else {
            audioElement.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleShuffle = () => {
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * playlistLength);
        } while (randomNumber === songId);
        setSongId(randomNumber);
    };

    const previousPlay = () => {
        if (isShuffle) handleShuffle();
        else setSongId(songId === 0 ? playlistLength - 1 : songId - 1);
    };


    const nextPlay = () => {
        if (isShuffle) handleShuffle();
        else setSongId(songId === playlistLength - 1 ? 0 : songId + 1);
    }

    const handleTimeUpdate = (event) => {
        setCurrentTime(event.target.currentTime);

    };

    const handleLoadedMetadata = (event) => {
        setDuration(event.target.duration);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    useEffect(() => {

        const audioElement = audioRef.current;

        if (isPlaying) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
    }, [isPlaying, song]);

    const handleProgressChange = (event) => {
        const newTime = parseFloat(event.target.value);
        setCurrentTime(newTime);
        audioRef.current.currentTime = newTime;
    };

    return (
        <div style={{display:song?'flex':'none'}} className="music-player">
            <div className="album-cover">
                <img className={`${isPlaying ? 'rotate' : ''}`} src={song?.songCover} alt='album_img' />
            </div>
            <div className="track-info">
                <h4>{song?.title}</h4>
                <p>{song?.artist}</p>
            </div>


            <div className='progress-controls'>
                <div className="controls">

                    <span onClick={()=>setIsShuffle(!isShuffle)}><FontAwesomeIcon color={isShuffle ? '#00ffb1' : 'white'} icon={faShuffle} /></span>
                    <span onClick={previousPlay}><FontAwesomeIcon icon={faBackwardStep} /></span>
                    <span className='play-pause' onClick={togglePlay}>{isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}</span>
                    <span onClick={nextPlay}><FontAwesomeIcon icon={faForwardStep} /></span>
                    <span onClick={() => setIsRepeatOn(!isRepeatOn)}><FontAwesomeIcon color={isRepeatOn ? '#00ffb1' : 'white'} icon={faRepeat} /></span>

                </div>
                <div className='progress'>
                    <span>{formatTime(currentTime)}</span>

                    <input
                        className='progress-bar'
                        ref={progressBarRef}
                        type="range"
                        min={0}
                        max={duration}
                        value={currentTime}
                        step={0.1}
                        onChange={handleProgressChange}
                    />

                    <span>{formatTime(duration)}</span>
                </div>

            </div>

            <div className='volume-control'>

                <FontAwesomeIcon icon={faVolumeHigh} />

                <input
                    type="range"
                    className="volume-slider"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                />
                <audio
                    loop={isRepeatOn}
                    ref={audioRef}
                    src={song?.songMp3}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                />
            </div>
        </div>
    )
}

export default MusicPlayer