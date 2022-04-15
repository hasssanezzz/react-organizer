import produce from "immer"
import { File, List, Todo } from "../interfaces"

interface Action {
  type: string
  payload?: any
}

export function fileReducer(state: File[], action: Action): File[] {
  const getFileIndex = (id: string) => state.map((file) => file.id).indexOf(id)

  switch (action.type) {
    case "ADD_FILE":
      return [...state, action.payload]

    case "RENAME_FILE":
      return produce(state, (draftState) => {
        const { id, title }: { id: string; title: string } = action.payload
        const index = getFileIndex(id)
        draftState[index].title = title
      })

    case "DELETE_FILE":
      return produce(state, (draftState) => {
        const { id }: { id: string } = action.payload
        const fileIndex = getFileIndex(id)
        draftState.splice(fileIndex, 1)
      })

    default:
      return state
  }
}

export function listReducer(state: List[], action: Action): List[] {
  const getListIndex = (id: string) => state.map((list) => list.id).indexOf(id)

  switch (action.type) {
    case "ADD_LIST":
      return [...state, action.payload]

    case "ADD_TODO":
      return produce(state, (draftState) => {
        const { id, newTodo }: { id: string; newTodo: Todo } = action.payload
        const listIndex = getListIndex(id)
        draftState[listIndex].todos.push(newTodo)
      })

    case "DELETE_LIST":
      return produce(state, (draftState) => {
        const { id }: { id: string } = action.payload
        const listIndex = getListIndex(id)
        draftState.splice(listIndex, 1)
      })

    case "TOGGLE_TODO":
      return produce(state, (draftState) => {
        const { listId, todoId }: { listId: string; todoId: string } =
          action.payload
        const listIndex = getListIndex(listId)
        const todoIndex = draftState[listIndex].todos
          .map((todo) => todo.id)
          .indexOf(todoId)
        draftState[listIndex].todos[todoIndex].done =
          !draftState[listIndex].todos[todoIndex].done
      })

    case "DELETE_TODO":
      return produce(state, (draftState) => {
        const { listId, todoId }: { listId: string; todoId: string } =
          action.payload
        const listIndex = getListIndex(listId)
        const todoIndex = draftState[listIndex].todos
          .map((todo) => todo.id)
          .indexOf(todoId)
        draftState[listIndex].todos.splice(todoIndex, 1)
      })

    case "RENAME_LIST":
      return produce(state, (draftState) => {
        const { id, title }: { id: string; title: string } = action.payload
        const index = getListIndex(id)
        draftState[index].title = title
      })

    case "RENAME_TODO":
      return produce(state, (draftState) => {
        const {
          listId,
          todoId,
          text,
        }: { listId: string; todoId: string; text: string } = action.payload
        const listIndex = getListIndex(listId)
        const todoIndex = draftState[listIndex].todos
          .map((todo) => todo.id)
          .indexOf(todoId)
        draftState[listIndex].todos[todoIndex].text = text
      })

    default:
      return state
  }
}
