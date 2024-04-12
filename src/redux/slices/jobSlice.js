import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  mainJobs: [],
  isLoading: false,
  error: null,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },

    setError: (state, action) => {
      (state.isLoading = false), (state.error = action.payload);
    },
    setJobs: (state, action) => {
      (state.isLoading = false),
        (state.error = null),
        (state.jobs = action.payload);
      state.mainJobs = action.payload;
    },

    deleteJob: (state, action) => {
      // silinecek elemanın sırasını bul
      const index = state.jobs.findIndex((i) => i.id == action.payload);

      // elemanı diziden kaldır
      state.jobs.splice(index, 1);
    },

    createJob: (state, action) => {
      state.jobs.push(action.payload);
    },

    // aratılan şirket adına göre filtrele
    filterBySearch: (state, action) => {
      // aratılan kelime
      const query = action.payload.text.toLowerCase();

      //filtreleme yap
      state.jobs = state.mainJobs.filter(
        (i) =>
          i[action.payload.name].toLowerCase().includes(query) ||
          i.position.toLowerCase().includes(query)
      );
    },

    sortJobs: (state, action) => {
      switch (action.payload) {
        case "a-z":
          state.jobs.sort((a, b) => a.company.localeCompare(b.company));
          break;

        case "z-a":
          state.jobs.sort((a, b) => b.company.localeCompare(a.company));
          break;

        case "En Yeni":
          state.jobs.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;

        case "En Eski":
          state.jobs.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;

        default:
          break;
      }
    },

    clearFilters: (state, action) => {
      state.jobs = state.mainJobs;
    },
  },
});

// aksiyonları export et
export const {
  setError,
  setJobs,
  setLoading,
  deleteJob,
  createJob,
  filterBySearch,
  sortJobs,
  clearFilters,
} = jobSlice.actions;

// reducerı export et

export default jobSlice.reducer;
