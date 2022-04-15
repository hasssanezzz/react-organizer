import { createContext } from "react"
import { StateContext } from "../interfaces"

export const stateContext = createContext<StateContext>({
  files: [],
  lists: [],
  filesDispatch: Function,
  listsDispatch: Function
})

