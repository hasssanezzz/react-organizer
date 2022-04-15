import { useEffect, useMemo, useReducer } from "react"
import { fileReducer, listReducer } from "./store"
import { stateContext } from "./context"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import FileComponet from "./pages/File"
import { StateContext } from "./interfaces"

!localStorage.files && (localStorage.files = JSON.stringify([]))
!localStorage.lists && (localStorage.lists = JSON.stringify([]))

function App() {
  const [files, filesDispatch] = useReducer(fileReducer, JSON.parse(localStorage.files))
  const [lists, listsDispatch] = useReducer(listReducer, JSON.parse(localStorage.lists))

  useEffect(() => {
    localStorage.files = JSON.stringify(files)
    localStorage.lists = JSON.stringify(lists)
  }, [files, lists])

  const value = useMemo(
    (): StateContext => ({ files, filesDispatch, lists, listsDispatch }),
    [files, filesDispatch, lists, listsDispatch]
  )

  return (
    <stateContext.Provider value={value}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/file/:id" element={<FileComponet />} />
        </Routes>

        <footer className="w-full h-20 bg-blue-500 text-white flex items-center justify-center gap-2">
          <span>Made by</span>
          <a className="underline" rel="noreferrer" href="https://github.com/hasssanezzz" target="_blank">{"<"}Hassan Ezz{"/>"}</a>
        </footer>
      </BrowserRouter>
    </stateContext.Provider>
  )
}

export default App
