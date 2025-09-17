import {createSlice} from "@reduxjs/toolkit";
/** Level 4: bổ sung priorities + tag filter + status theo due */
const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        status: "all",
        search: "",
        priorities: [
            1, 2, 3
        ],
        tags: [],
        sortBy: "manual",
        sortDir: "asc",
        hideCompleted: false
    },
    reducers: {
        setAll(state, action) {
            return {
                ...state,
                ...action.payload
            };
        }
    }
});
export const {setAll} = filtersSlice.actions;
export default filtersSlice.reducer;
