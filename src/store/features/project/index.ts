import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { ProjectType } from "../../../common/types";
// Define a type for the slice state
interface ProjectState {
  list: ProjectType[];
}

// Get init project to localStorage
const getInitialList = () => {
  const data = localStorage.getItem("projects");
  if (!data) return [];
  return JSON.parse(data);
};

// Define the initial state using that type
const initialState: ProjectState = {
  list: getInitialList(),
};

export const projectSlice = createSlice({
  name: "project",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addProject: (state, action: PayloadAction<ProjectType>) => {
      const curList = state.list;
      state.list = curList.concat(action.payload);
    },
  },
});

export const { addProject } = projectSlice.actions;

export default projectSlice.reducer;
