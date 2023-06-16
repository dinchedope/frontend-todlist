import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    dataInfo : {
        item: {},
        action: null,
    }
}

const dataInfoSlice = createSlice({
    name: "dataInfo",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.dataInfo = action.payload;
        },
        deleteData: (state) => {
            state.dataInfo = {
                item: {},
                action: null,
            }
        }
    }
});

export const dataInfoReducer = dataInfoSlice.reducer;

export const {setData} = dataInfoSlice.actions;

export const {deleteData} = dataInfoSlice.actions;