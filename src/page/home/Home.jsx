// import React, { useEffect } from "react";
// import "./Home.css";
// import SongsList from "../../components/songsList/SongsList";

// import { homepagePlaylistInfo } from "../../utils/homepagePlaylists";

// const Home = () => {
//   useEffect(() => {
//     document.title = "Enjoy Your Top Trending Songs • SB Music";
//   }, []);

//   return (
//     <div className="home-section">
//       {homepagePlaylistInfo.map((playlist) => (
//         <SongsList
//           key={playlist.id}
//           playlistId={playlist.id}
//           title={playlist.title}
//         />
//       ))}
//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useMemo } from "react";
import "./Home.css";
import SongsList from "../../components/songsList/SongsList";
import { homepagePlaylistInfo } from "../../utils/homepagePlaylists";
import { useSelector, shallowEqual } from "react-redux";

const Home = () => {
  const currentSongId = useSelector(
    (state) => state.currentSongSlice.currentSongInfo?.id,
    shallowEqual
  );

  useEffect(() => {
    document.title = "Enjoy Your Top Trending Songs • SB Music";
  }, []);

  const hasActiveSong = !!currentSongId;

  const playlists = useMemo(() => homepagePlaylistInfo, []);

  return (
    <div className={`home-section ${hasActiveSong ? "with-song-bg" : ""}`}>
      {playlists.map((playlist) => (
        <SongsList
          key={playlist.id}
          playlistId={playlist.id}
          title={playlist.title}
        />
      ))}
    </div>
  );
};

export default Home;
