import React, { useMemo, useRef, useState, useEffect } from "react";
import { BsPlayCircleFill } from "react-icons/bs";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { addSongInfo } from "../../../reduxtool/slice/currentSongSlice";
import "./RelatedSongs.css";
import RelatedSongsSkeleton from "./RelatedSongsSkeleton";
import { useGetRelatedSongsQuery } from "../../../reduxtool/services/myApi";

const RelatedSongs = () => {
  const dispatch = useDispatch();

  const currentSongId = useSelector(
    (state) => state.currentSongSlice.currentSongInfo?.id,
    shallowEqual
  );

  const [isUpClick, setIsUpClick] = useState(false);
  const upNextRef = useRef();

  // Stable query
  const randomQuery = useMemo(() => {
    const keywords = [
      "trending songs india",
      "bollywood hits",
      "lofi music",
      "party songs",
      "romantic songs",
      "sad songs",
      "hip hop music",
      "english pop songs",
    ];

    return keywords[Math.floor(Math.random() * keywords.length)];
  }, []);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetRelatedSongsQuery(randomQuery, {
    refetchOnMountOrArgChange: false,
  });

  const songs = data?.result || [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (upNextRef.current && !upNextRef.current.contains(e.target)) {
        setIsUpClick(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleRedirect = (videoId) => {
    if (!videoId) return;

    dispatch(
      addSongInfo({
        id: videoId,
        miniPlayerActive: false,
      })
    );
  };

  return (
    <div className="related-songs-section">
      <h3 className="relate-songs-heading">Up Next Songs</h3>

      <div
        className="relate-songs-heading mobile-next cur-pointer"
        ref={upNextRef}
        onClick={() => setIsUpClick(!isUpClick)}
      >
        Up Next Songs
      </div>

      <div
        className={`related-songs-container ${
          isUpClick ? "related-songs-mobile" : ""
        }`}
      >
        {isLoading && songs.length === 0 ? (
          <RelatedSongsSkeleton amount={6} />
        ) : songs.length > 0 ? (
          songs.map((song) => (
            <div
              className="related-songs-info-wrapper cur-pointer"
              key={song?.videoId}
              onClick={() => handleRedirect(song?.videoId)}
            >
              <div className="related-songs-image-wrapper">
                <img
                  src={song?.thumbnails || ""}
                  className="related-songs-image"
                  alt={song?.title || "Song"}
                />

                {currentSongId === song?.videoId && (
                  <div className="playing-status-wrapper">
                    <BsPlayCircleFill
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                )}

                <small className="song-time-length">
                  {song?.length || "?"}
                </small>
              </div>

              <div className="related-songs-title-channel-wrapper">
                <p className="related-songs-title-wrapper">
                  {song?.title || "Unknown Title"}
                </p>

                <p className="related-songs-channel-wrapper">
                  • {song?.artistInfo?.artist?.[0]?.text || "Unknown Artist"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="related-songs-error-wrapper">
            <p className="sorry-emoji">😢</p>
            <p>Sorry! Not able to fetch related songs</p>

            {isError && (
              <p className="error-message">
                {error?.data?.error?.message ||
                  error?.error ||
                  "API Error"}
              </p>
            )}

            <button
              type="button"
              className="cur-pointer refetch-button"
              onClick={refetch}
            >
              Refetch
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(RelatedSongs);
