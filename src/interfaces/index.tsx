export interface File {
  id: string
  title: string
  createdAt: string
}

export interface List {
  id: string
  fileId: string
  title: string
  todos: Todo[]
  createdAt: string
}

export interface Todo {
  id: string
  text: string,
  done: boolean,
  index?: number
}

export interface StateContext {
  files: File[]
  lists: List[]
  filesDispatch: Function
  listsDispatch: Function
}
