import produce from "immer"
import { File, List, Todo } from "../interfaces"
import create, { StateCreator } from "zustand"

const getFileIndex = (id: string, state: File[]) =>
  state.map((file) => file.id).indexOf(id)

const getListIndex = (id: string, state: List[]) =>
  state.map((list) => list.id).indexOf(id)

interface State {
  files: File[]
  lists: List[]

  // files
  addFile: (title: string) => void
  renameFile: (id: string, text: string) => void
  deleteFile: (id: string) => void

  // lists
  addList: (fileId: string, title: string) => void
  addTodo: (listId: string, text: string) => void
  renameList: (listId: string, title: string) => void
  deleteList: (listId: string) => void

  // to-do
  deleteTodo: (listId: string, todoId: string) => void
  renameTodo: (listId: string, todoId: string, text: string) => void
  toggleTodo: (listId: string, todoId: string) => void
}

const store: StateCreator<State> = (set) => ({
  files: JSON.parse(localStorage.files),
  lists: JSON.parse(localStorage.lists),

  // ================ files ========================

  addFile: (title: string) =>
    set((state) => ({
      files: [
        ...state.files,
        {
          id: Date.now().toString(),
          title,
          createdAt: new Date().toLocaleDateString(),
        },
      ],
    })),

  renameFile: (id: string, title: string) =>
    set((state) => ({
      files: produce(state.files, (draftState) => {
        const index = getFileIndex(id, state.files)
        draftState[index].title = title
      }),
    })),

  deleteFile: (id: string) =>
    set((state) => ({
      files: produce(state.files, (draftState) => {
        const fileIndex = getFileIndex(id, state.files)
        draftState.splice(fileIndex, 1)
      }),
    })),

  // ================ lists ========================

  addList: (fileId: string, title: string) =>
    set((state) => ({
      lists: [
        ...state.lists,
        {
          id: Date.now().toString(),
          fileId,
          title,
          todos: [],
          createdAt: new Date().toLocaleDateString(),
        },
      ],
    })),

  addTodo: (listId: string, text: string) =>
    set((state) => ({
      lists: produce(state.lists, (draftState) => {
        const newTodo: Todo = {
          id: Date.now().toString(),
          text,
          done: false,
        }
        const listIndex = getListIndex(listId, state.lists)
        draftState[listIndex].todos.push(newTodo)
      }),
    })),

  renameList: (listId: string, title: string) =>
    set((state) => ({
      lists: produce(state.lists, (draftState) => {
        const index = getListIndex(listId, state.lists)
        draftState[index].title = title
      }),
    })),

  deleteList: (listId: string) =>
    set((state) => ({
      lists: produce(state.lists, (draftState) => {
        const listIndex = getListIndex(listId, state.lists)
        draftState.splice(listIndex, 1)
      }),
    })),

  renameTodo: (listId: string, todoId: string, text: string) =>
    set((state) => ({
      lists: produce(state.lists, (draftState) => {
        const listIndex = getListIndex(listId, state.lists)
        const todoIndex = draftState[listIndex].todos
          .map((todo) => todo.id)
          .indexOf(todoId)
        draftState[listIndex].todos[todoIndex].text = text
      }),
    })),

  deleteTodo: (listId: string, todoId: string) =>
    set((state) => ({
      lists: produce(state.lists, (draftState) => {
        const listIndex = getListIndex(listId, state.lists)
        const todoIndex = draftState[listIndex].todos
          .map((todo) => todo.id)
          .indexOf(todoId)
        draftState[listIndex].todos.splice(todoIndex, 1)
      }),
    })),

  toggleTodo: (listId: string, todoId: string) =>
    set((state) => ({
      lists: produce(state.lists, (draftState) => {
        const listIndex = getListIndex(listId, state.lists)
        const todoIndex = draftState[listIndex].todos
          .map((todo) => todo.id)
          .indexOf(todoId)
        draftState[listIndex].todos[todoIndex].done =
          !draftState[listIndex].todos[todoIndex].done
      }),
    })),
})

const useStore = create(store)

export default useStore
