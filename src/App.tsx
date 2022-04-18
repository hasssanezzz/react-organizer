import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import FileComponet from "./pages/File"
import useStore from "./store"
import { useEffect } from "react"

!localStorage.files && (localStorage.files = JSON.stringify([]))
!localStorage.lists && (localStorage.lists = JSON.stringify([]))

function App() {
  const files = useStore(state => state.files)
  const lists = useStore(state => state.lists)


  useEffect(() => {
    localStorage.files = JSON.stringify(files)
    localStorage.lists = JSON.stringify(lists)
  }, [files, lists])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/file/:id" element={<FileComponet />} />
      </Routes>

      <footer className="w-full h-20 bg-blue-500 text-white flex items-center justify-center gap-2">
        <span>Made by</span>
        <a
          className="underline"
          rel="noreferrer"
          href="https://github.com/hasssanezzz"
          target="_blank"
        >
          {"<"}Hassan Ezz{"/>"}
        </a>
      </footer>
    </BrowserRouter>
  )
}

export default App
