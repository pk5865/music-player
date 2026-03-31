import React, { useState } from "react";

function SongList({ songs, playSong, refreshSongs }) {

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
const deleteSong = async (id) => {

  try {

    await fetch(`http://127.0.0.1:8000/api/songs/${id}/`, {
      method: "DELETE"
    });

    refreshSongs();

  } catch (error) {

    console.log("Delete error:", error);

  }

};
  const addSong = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("file", file);

    try {

      const response = await fetch("http://127.0.0.1:8000/api/songs/", {
        method: "POST",
        body: formData
      });

      await response.json();

      setShowModal(false);

      setTitle("");
      setFile(null);

      refreshSongs();

    } catch (error) {

      console.log("Upload error:", error);

    }

  };

  return (

    <div>

      <button onClick={() => setShowModal(true)}>
        ➕ Add Song
      </button>

      {showModal && (

        <div className="modal">

          <div className="modal-box">

            <h3>Add Song</h3>

            <form onSubmit={addSong}>

              <input
                type="text"
                placeholder="Song title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <br/><br/>

              <input
                type="file"
                accept="audio/*"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />

              <br/><br/>

              <button type="submit">Save</button>

              <button
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

            </form>

          </div>

        </div>

      )}

      <h3>Song List</h3>

      <ul>

        {songs.map((song, index) => (

          <li key={song.id}>

  <span onClick={() => playSong(index)}>
    ▶ {song.title}
  </span>

  <button onClick={() => deleteSong(song.id)}>
    🗑
  </button>

</li>
        ))}

      </ul>

    </div>

  );

}

export default SongList;