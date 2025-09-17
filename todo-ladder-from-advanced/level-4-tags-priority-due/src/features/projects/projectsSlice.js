import {createSlice, nanoid} from "@reduxjs/toolkit";

/** Level 3: Projects + chọn project */
const projectsSlice = createSlice({
    name: "projects",
    initialState: {
        entities: {},
        ids: [],
        selectedId: null
    },
    reducers: {
        bootstrap: {
            reducer(state, action) {
                if (state.ids.length) 
                    return;
                
                action.payload.forEach(p => {
                    state.entities[p.id] = p;
                    state.ids.push(p.id);
                    if (!state.selectedId) 
                        state.selectedId = p.id;
                    
                });
            },
            prepare() {
                return {
                    payload: [
                        {
                            id: "inbox",
                            name: "Inbox",
                            color: "#6366f1"
                        }, {
                            id: "today",
                            name: "Today",
                            color: "#10b981"
                        }
                    ]
                };
            }
        },
        addProject: {
            reducer(state, action) {
                const p = action.payload;
                state.entities[p.id] = p;
                state.ids.push(p.id);
            },
            prepare(
                {name, color}
            ) {
                return {
                    payload: {
                        id: nanoid(),
                        name,
                        color
                    }
                };
            }
        },
        selectProject(state, action) {
            state.selectedId = action.payload;
        }
    }
});
export const projectsActions = projectsSlice.actions;
export default projectsSlice.reducer;
