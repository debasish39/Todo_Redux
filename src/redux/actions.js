import { ADD_TODO,MARK_COMPLETED,REMOVE_TODO,TOGGLE_TODO,MARK_INCOMPLETE, FILTER_TODOS, MARK_ALL_COMPLETED,UPDATE_SEARCH_TERM,EDIT_TODO } from "./actionsTypes";
export const addTodo=(text)=>({
    type:ADD_TODO,
    payload:{text}
});
export const toggleTodo=(id)=>({
    type:TOGGLE_TODO,
    payload:{id}
});
export const removeTodo=(id)=>({
    type:REMOVE_TODO,
    payload:{id}
});
export const markCompleted=(id)=>({
    type:MARK_COMPLETED,
    payload:{id}
});
export const markInComplete=(id)=>({
    type:MARK_INCOMPLETE,
    payload:{id}
})
export const filterTodos=(filter)=>({
    type:FILTER_TODOS,
    payload:{filter}
})

export const markAllCompleted=()=>({
    type:MARK_ALL_COMPLETED,
})
export const updateSearchTerm=(searchTerm)=>({
    type:UPDATE_SEARCH_TERM,
    payload:{searchTerm}
})
export const editTodo = (id, newText) => ({
  type: EDIT_TODO,
  payload: { id, newText }
});
