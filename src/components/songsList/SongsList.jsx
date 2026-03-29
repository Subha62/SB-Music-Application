import React from "react";
import SongsCard from "../songsCard/SongsCard";
import SongsCardSkeleton from "../songsCard/SongsCardSkeleton";
import "./SongsList.css";
import { Link } from "react-router-dom";
import {
  useGetPlaylistItemsQuery,
  useGetSearchItemsQuery,
} from "../../reduxtool/services/songsApi";

const SongsList = ({
  title,
  isSearchPage = false,
  playlistId,
  searchQuery,
}) => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = isSearchPage
    ? useGetSearchItemsQuery(searchQuery, {
        refetchOnMountOrArgChange: false,
      })
    : useGetPlaylistItemsQuery(playlistId, {
        refetchOnMountOrArgChange: false,
      });

  const urlTitle = !isSearchPage
    ? title?.replaceAll(" ", "-").toLowerCase()
    : "";

  const songs = data?.items || [];

  return (
    <div className="songs-list-container">
      <div className="songs-list-top-wrapper">
        <h2 className="songs-list-title">{title}</h2>

        {!isSearchPage && (
          <Link
            to={`/${urlTitle}/${playlistId}`}
            className="view-all cur-pointer"
          >
            view all
          </Link>
        )}
      </div>

      <div
        className="songs-list-wrapper"
        style={{
          flexWrap: isSearchPage ? "wrap" : "nowrap",
          justifyContent: isSearchPage ? "center" : "flex-start",
        }}
      >
        {isLoading && songs.length === 0 ? (
          <SongsCardSkeleton amount={6} />
        ) : isError ? (
          <div className="search-not-found-wrapper">
            <h2>Failed to load songs</h2>
            <p>Please refresh the page.</p>
          </div>
        ) : songs.length > 0 ? (
          songs.map((songs) => (
            <SongsCard songs={songs} key={songs?.etag || songs?.id} />
          ))
        ) : (
          <div className="search-not-found-wrapper">
            <h2>No songs found</h2>
          </div>
        )}
      </div>

      {!isLoading &&
        !isFetching &&
        data?.pageInfo?.totalResults === 0 && (
          <div className="search-not-found-wrapper">
            <h1>404</h1>
            <p className="search-query-text">
              Search Query: {searchQuery}
            </p>
            <p>Oops... This search query could not be found!</p>
          </div>
        )}
    </div>
  );
};

export default React.memo(SongsList);
