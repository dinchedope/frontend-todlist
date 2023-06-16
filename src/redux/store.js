import { configureStore } from "@reduxjs/toolkit";
import { todoListsReducer } from "./slices/todoLists";
import { authReducer } from "./slices/auth";
import { dataInfoReducer } from "./slices/dataInfo";
import { editingReducer } from "./slices/editing"

const store = configureStore({
    reducer: {
        todoLists: todoListsReducer,
        auth: authReducer,
        dataInfo: dataInfoReducer,
        editing: editingReducer,
    }
});

export default store;