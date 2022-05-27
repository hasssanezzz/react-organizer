import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import FileComponet from "./pages/File"
import useStore from "./store"
import { useEffect } from "react"

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
    </BrowserRouter>
  )
}

export default App
