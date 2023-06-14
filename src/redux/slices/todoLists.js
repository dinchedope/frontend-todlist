import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios.js';

export const fetchTodoLists = createAsyncThunk('todoLists/fetchTodoLists', async() =>{
    const { data } = await axios.get('/todolist');
    return data;
});

const initialState = {
    todoLists : {
        items: [],
        status: 'loading',
    },
};

const todoListsSlice = createSlice({
    name: 'todoLists',
    initialState,
    reducers: {
        deleteData :(state) => {
            state.todoLists.items = [];
        }
    },
    extraReducers: {
        [fetchTodoLists.pending]: (state, action) => {
            state.todoLists.items = [];
            state.todoLists.status = 'loading';
        },
        [fetchTodoLists.fulfilled]: (state, action) => {
            state.todoLists.items = action.payload;
            state.todoLists.status = 'loaded';
        },
        [fetchTodoLists.rejected]: (state) => {
            state.todoLists.items = [];
            state.todoLists.status = 'error';
        }
    }
});

export const todoListsReducer = todoListsSlice.reducer;

export const { deleteData } = todoListsSlice.actions;