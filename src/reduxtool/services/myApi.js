import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseYTUrl = "https://www.googleapis.com/youtube/v3";
const apiKey = import.meta.env.VITE_YT_API;

export const myApi = createApi({
  reducerPath: "myApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseYTUrl }),

  endpoints: (builder) => ({
    //  Related Songs (skip invalid ID)
   getRelatedSongs: builder.query({
  query: () => {
    const randomKeywords = [
      "trending songs india",
      "bollywood hits",
      "lofi music",
      "party songs",
      "romantic songs",
      "sad songs",
      "hip hop music",
      "english pop songs",
      "top hits 2025",
      "viral songs"
    ];

    // ✅ pick random keyword
    const randomQuery =
      randomKeywords[Math.floor(Math.random() * randomKeywords.length)];

    return {
      url: "/search",
      params: {
        part: "snippet",
        q: randomQuery,
        type: "video",
        maxResults: 10,
        key: apiKey,
      },
    };
  },

  transformResponse: (response) => ({
    result: response.items.map((item) => ({
      videoId: item.id.videoId,
      thumbnails: item.snippet.thumbnails.medium.url,
      title: item.snippet.title,
      length: "?",
      artistInfo: {
        artist: [{ text: item.snippet.channelTitle }],
      },
    })),
  }),
}),
    //  Single Video Info
    getSongsById: builder.query({
      query: (videoId) => {
        if (!videoId) {
          console.warn(" No videoId given to getSongsById");
          return { url: "/videos", params: {} }; // won't fetch
        }
        return {
          url: "/videos",
          params: {
            part: "snippet,contentDetails",
            id: videoId,
            key: apiKey,
          },
        };
      },
      transformResponse: (response) => ({
        items: Array.isArray(response?.items) ? response.items : [],
      }),
    }),
  }),
});

export const {
  useGetRelatedSongsQuery,
  useGetSongsByIdQuery,
} = myApi;
