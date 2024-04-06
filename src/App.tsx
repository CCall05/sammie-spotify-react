import React, { useEffect, useState } from 'react';
import './App.css';


const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [albumIndex, setAlbumIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const albumCovers = ['album_cover.png', 'sammie-spotify-react\public\prom^-^.mov'];
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const songTitles = ['Super Shy', ' Prom?'];
  const artistNames = ['NewJeans', 'P + S <3'];
  const [songIndex, setSongIndex] = useState(0);
  const [artistIndex, setArtistIndex] = useState(0);
  const [isPlaying2, setIsPlaying2] = useState(false);
  const [, setCurrentTime2] = useState(0);
  const [, setDuration2] = useState(0);


  const audioRef = React.useRef(new Audio());
  const audioRef2 = React.useRef(new Audio());

  useEffect(() => {
    audioRef.current.src = "sammie-spotify-react\public\NewJeans (뉴진스) 'Super Shy' Official Audio.mp4";
    audioRef.current.addEventListener("loadedmetadata", () => {
      setDuration(audioRef.current.duration);
    });
  }, []);

  useEffect(() => {
  if (isPlaying) {
    audioRef.current.play();
  }
}, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(audioRef.current.currentTime);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isPlaying]);


  const togglePlaying = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };
  const ProgressBar = () => {
    const progress = currentTime / duration;
  
    return (
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${progress * 100}%` }}></div>
      </div>
    );
  };

  

  useEffect(() => {
    // Load the second audio file
    audioRef2.current.src = "sammie-spotify-react\public\peach eyes.mp4";
    audioRef2.current.addEventListener("loadedmetadata", () => {
      setDuration2(audioRef2.current.duration);
    });
  }, []);

  useEffect(() => {
    // Play or pause the second audio file based on isPlaying2 state
    if (isPlaying2) {
      audioRef2.current.play();
    } else {
      audioRef2.current.pause();
    }
  }, [isPlaying2]);

  useEffect(() => {
    // Update currentTime2 state while the second audio is playing
    if (isPlaying2) {
      const interval = setInterval(() => {
        setCurrentTime2(audioRef2.current.currentTime);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isPlaying2]);

  
  const nextAlbum = () => {
    setIsAnimating(true);
    const nextIndex = (albumIndex + 1) % albumCovers.length;
    const nextSongIndex = (songIndex + 1) % songTitles.length;
    const nextArtistIndex = (artistIndex + 1) % artistNames.length;
    setAlbumIndex(nextIndex);
    setSongIndex(nextSongIndex);
    setArtistIndex(nextArtistIndex);
    audioRef.current.pause();
    setIsPlaying2(!isPlaying2);
    if (!isPlaying2) {
      audioRef2.current.play();
    } else {
      audioRef2.current.pause();
    }
    setTimeout(() => {
      setAlbumIndex(nextIndex);
      setSongIndex(nextSongIndex);
      setArtistIndex(nextArtistIndex);
      setIsAnimating(false);
    }, 500); // Adjust timing as needed
  };

  

  return (
    <div className="container">
      {/* <h1 className="song-title">Super Shy</h1>
      <h2 className="artist-name">NewJeans</h2> */}
      <div className="album-container">
      {/* <img 
      src={albumCovers[albumIndex]} 
      className={`album-cover ${albumIndex !== 0 ? 'slide-out' : 'slide-in'}`} 
      alt="Album Cover" /> */}
      <img
        src={albumCovers[albumIndex]}
        className={`album-cover ${isAnimating ? "slide-out" : ""}`}
        alt="Album Cover"
      />
      <h1 className={`song-title ${isAnimating ? "slide-in-bottom" : ""}`}>{songTitles[songIndex]}</h1>
      <h2 className={`artist-name ${isAnimating ? "slide-in-bottom" : ""}`}>{artistNames[artistIndex]}</h2>
      </div>
      <div className="controls">
        <button className="previous-button">
          <img src={'previous_button_icon.png'} alt = {'Previous'} />
        </button>
        <button className={`play-pause-button ${isPlaying ? 'onPlay' : ''}`} onClick={togglePlaying}>
        <img src={isPlaying ? 'pause_icon.png' : 'play_icon.png'} alt={isPlaying ? 'Pause' : 'Play'} />
        </button>
        <button className="next-button" onClick={nextAlbum}>
          <img src={'next_button_icon.png'} alt = {'Next'} />
        </button>
        <ProgressBar />
      </div>
    </div>
  );
};

export default App;