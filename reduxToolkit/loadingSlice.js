import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
//   const [isLoadingComplete, setLoadingComplete] = useState(false);
  initialState: false,

  reducers: {
    isLoadingComplete: () => initialState,
    LoadingComplete: (state, { payload }) => {
        if(payload) { 
          state.useState(true);
        }
    },
  },

});

export const { isLoadingComplete, LoadingComplete } = loadingSlice.actions;

export default loadingSlice.reducer;