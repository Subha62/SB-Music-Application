import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseYTUrl = "https://www.googleapis.com/youtube/v3";
const apiKey = import.meta.env.VITE_YT_API;

export const myApi = createApi({
  reducerPath: "myApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseYTUrl }),

  endpoints: (builder) => ({
    // ✅ Related Songs
    getRelatedSongs: builder.query({
      query: (searchQuery) => ({
        url: "/search",
        params: {
          part: "snippet",
          q: searchQuery || "trending songs india",
          type: "video",
          maxResults: 10,
          key: apiKey,
        },
      }),

      transformResponse: (response) => ({
        result: Array.isArray(response?.items)
          ? response.items.map((item) => ({
              videoId: item?.id?.videoId || "",
              thumbnails:
                item?.snippet?.thumbnails?.medium?.url ||
                item?.snippet?.thumbnails?.default?.url ||
                "",
              title: item?.snippet?.title || "No Title",
              length: "?",
              artistInfo: {
                artist: [
                  {
                    text: item?.snippet?.channelTitle || "Unknown Artist",
                  },
                ],
              },
            }))
          : [],
      }),

      transformErrorResponse: (response) => {
        console.error("YouTube API Error:", response);
        return response;
      },

      keepUnusedDataFor: 60,
    }),

    // ✅ Single Video Info
    getSongsById: builder.query({
      query: (videoId) => {
        if (!videoId) {
          return {
            url: "/videos",
            params: {},
          };
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

      transformErrorResponse: (response) => {
        console.error("Video Details API Error:", response);
        return response;
      },
    }),
  }),
});

export const {
  useGetRelatedSongsQuery,
  useGetSongsByIdQuery,
} = myApi;
