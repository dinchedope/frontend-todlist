import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isEditing: false,
}

const editingSlice = createSlice({
    name: "editing",
    initialState,
    reducers: {
        setIsEditing: (state, action) => {
            state.isEditing = action.payload;
        },
        deleteIsEditing: (state) => {
            state.isEditing = false;
        }
    }
});

export const editingReducer = editingSlice.reducer;

export const {setIsEditing} = editingSlice.actions;

export const {deleteIsEditing} = editingSlice.actions;