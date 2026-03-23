// import { createSlice } from "@reduxjs/toolkit";

// const getLocalData = JSON.parse(localStorage.getItem("currentSongInfo"));

// const initialState = {
//   currentSongInfo: getLocalData || {},
// };

// export const currentSongSlice = createSlice({
//   name: "currentSong",
//   initialState,
//   reducers: {
//     addSongInfo: (state, action) => {
//       state.currentSongInfo = {
//         ...state.currentSongInfo,
//         ...action.payload,
//       };
//       localStorage.setItem(
//         "currentSongInfo",
//         JSON.stringify(state.currentSongInfo)
//       );
//     },

//     clearSongInfo: (state) => {
//       state.currentSongInfo = {};
//       localStorage.removeItem("currentSongInfo");
//     },
//   },
// });

// export const { addSongInfo, clearSongInfo } = currentSongSlice.actions;

// export default currentSongSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const getLocalData = JSON.parse(localStorage.getItem("currentSongInfo"));
const getHistory = JSON.parse(localStorage.getItem("songHistory"));
const getIndex = JSON.parse(localStorage.getItem("songIndex"));

const initialState = {
  currentSongInfo: getLocalData || {},
  history: getHistory || [],
  currentIndex: getIndex ?? -1,
};

export const currentSongSlice = createSlice({
  name: "currentSong",
  initialState,
  reducers: {
    // ✅ Add song + maintain history
    addSongInfo: (state, action) => {
      const newSong = action.payload;

      // remove forward history if new song selected
      if (state.currentIndex < state.history.length - 1) {
        state.history = state.history.slice(0, state.currentIndex + 1);
      }

      state.history.push(newSong);
      state.currentIndex++;

      state.currentSongInfo = newSong;

      // ✅ save to localStorage
      localStorage.setItem(
        "currentSongInfo",
        JSON.stringify(state.currentSongInfo)
      );
      localStorage.setItem("songHistory", JSON.stringify(state.history));
      localStorage.setItem("songIndex", JSON.stringify(state.currentIndex));
    },

    // ⏮️ Previous song
    playPreviousSong: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex--;
        state.currentSongInfo = state.history[state.currentIndex];

        localStorage.setItem(
          "currentSongInfo",
          JSON.stringify(state.currentSongInfo)
        );
        localStorage.setItem("songIndex", JSON.stringify(state.currentIndex));
      }
    },

    // ⏭️ Next song
    playNextSong: (state) => {
      if (state.currentIndex < state.history.length - 1) {
        state.currentIndex++;
        state.currentSongInfo = state.history[state.currentIndex];

        localStorage.setItem(
          "currentSongInfo",
          JSON.stringify(state.currentSongInfo)
        );
        localStorage.setItem("songIndex", JSON.stringify(state.currentIndex));
      }
    },

    // ❌ Clear all
    clearSongInfo: (state) => {
      state.currentSongInfo = {};
      state.history = [];
      state.currentIndex = -1;

      localStorage.removeItem("currentSongInfo");
      localStorage.removeItem("songHistory");
      localStorage.removeItem("songIndex");
    },
  },
});

export const {
  addSongInfo,
  clearSongInfo,
  playPreviousSong,
  playNextSong,
} = currentSongSlice.actions;

export default currentSongSlice.reducer;