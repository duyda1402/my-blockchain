import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { KEY_PROJECT, KEY_ACTIVE_PROJECT } from "../../../common";
import { ProjectType } from "../../../common/types";
import { toast } from "react-toastify";

// Define a type for the slice state
interface ProjectState {
  list: Array<ProjectType>;
  idAcitve: string;
  curProject: ProjectType | undefined;
}

// Get init project to localStorage
const getInitialList = () => {
  const data = localStorage.getItem(KEY_PROJECT);
  if (!data) return [];
  return JSON.parse(data) as Array<ProjectType>;
};

// Define the initial state using that type
const initialState: ProjectState = (() => {
  const list = getInitialList();
  const idActive = localStorage.getItem(KEY_ACTIVE_PROJECT) || "";
  return {
    list: list,
    idAcitve: idActive,
    curProject: list.find((i) => i.id === idActive),
  };
})();

export const projectSlice = createSlice({
  name: "project",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addProject: (state, action: PayloadAction<ProjectType>) => {
      const curList = state.list;
      state.list = curList.concat(action.payload);
      localStorage.setItem(
        KEY_PROJECT,
        JSON.stringify(curList.concat(action.payload))
      );
      toast.success("Created successfully");
    },
    activeProject: (state, action: PayloadAction<string>) => {
      state.idAcitve = action.payload;
      state.curProject = state.list.find((item) => item.id === action.payload);
      localStorage.setItem(KEY_ACTIVE_PROJECT, action.payload);
    },
  },
});

export const { addProject, activeProject } = projectSlice.actions;

export default projectSlice.reducer;
