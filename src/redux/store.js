import { configureStore } from "@reduxjs/toolkit";
import { todoListsReducer } from "./slices/todoLists";
import { authReducer } from "./slices/auth";

const store = configureStore({
    reducer: {
        todoLists: todoListsReducer,
        auth: authReducer,
    }
});

export default store;