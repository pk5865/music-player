import React, { useState, useEffect, useRef } from "react";
import "./MusicPlayer.css";
import SongList from "./SongList";

function MusicPlayer() {

  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

  // fetch songs from backend
  const fetchSongs = async () => {

    try {

      const response = await fetch("http://127.0.0.1:8000/api/songs/");
      const data = await response.json();
      setSongs(data);

    } catch (error) {

      console.log("Backend connection error", error);

    }

  };

  // load songs when page loads
  useEffect(() => {
    fetchSongs();
  }, []);

  // play automatically when song changes
  useEffect(() => {

    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {});
    }

  }, [currentIndex, isPlaying]);

  // play selected song
  const playSong = (index) => {

    setCurrentIndex(index);
    setIsPlaying(true);

  };

  // play button
  const playAudio = () => {

    const audio = audioRef.current;

    if (!audio) return;

    audio.play().catch(()=>{});
    setIsPlaying(true);

  };

  // pause button
  const pauseAudio = () => {

    const audio = audioRef.current;

    if (!audio) return;

    audio.pause();
    setIsPlaying(false);

  };

  // next song
  const nextSong = () => {

    if (songs.length === 0) return;

    setCurrentIndex((currentIndex + 1) % songs.length);
    setIsPlaying(true);

  };

  // previous song
  const prevSong = () => {

    if (songs.length === 0) return;

    setCurrentIndex(
      (currentIndex - 1 + songs.length) % songs.length
    );

    setIsPlaying(true);

  };

  return (

    <div className="main">

      <h1 className="title">Music Player</h1>

      <div className="container">

        {/* LEFT SIDE PLAYER */}

        <div className="left">

          <h2>Now Playing</h2>

          {songs.length > 0 && (

  <>

    {console.log(
      "Audio URL:",
      "http://127.0.0.1:8000" + songs[currentIndex].file
    )}

    <h3 className="songTitle">
      {songs[currentIndex].title}
    </h3>

    <audio
  ref={audioRef}
  src={songs[currentIndex].file}
  onEnded={nextSong}
  controls
/>

              <div className="buttons">

                <button onClick={prevSong}>⏮</button>

                {!isPlaying ? (

                  <button onClick={playAudio}>▶</button>

                ) : (

                  <button onClick={pauseAudio}>⏸</button>

                )}

                <button onClick={nextSong}>⏭</button>

              </div>

            </>

          )}

        </div>

        {/* RIGHT SIDE PLAYLIST */}

        <div className="right">

          <SongList
            songs={songs}
            playSong={playSong}
            refreshSongs={fetchSongs}
          />

        </div>

      </div>

    </div>

  );
}

export default MusicPlayer;