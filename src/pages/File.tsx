import { FormEvent } from "react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import ListComponent from "../components/List"
import Container from "../containers/Container"
import useStore from "../store"

function File() {
  const files = useStore(state => state.files)
  const lists = useStore(state => state.lists)
  const addList = useStore(state => state.addList)

  const { id: fileId } = useParams()

  const file = files.filter((file) => file.id === fileId)[0]
  const fileLists = lists.filter((list) => list.fileId === fileId)

  const [title, setTitle] = useState<string>("")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    addList(typeof fileId === "string" ? fileId : "", title)
    setTitle("")
  }

  return (
    <Container className="pb-5 space-y-5">
      <header>
        <h1 className="text-4xl font-bold text-center my-10 flex items-center gap-3 justify-center">
          <Link className="hover:underline" to="/">
            Files
          </Link>
          <span className="text-blue-500">/</span>
          <Link className="hover:underline" to={"/file/" + fileId}>
            {file.title}
          </Link>
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-white rounded-xl px-3 py-2 w-full"
            placeholder="Add a new list..."
          />
        </form>
      </header>

      <div className="flex items-start gap-5 overflow-auto">
        {fileLists.map((list, index) => (
          <ListComponent
            key={index}
            {...list}
          />
        ))}
      </div>

      <div className="grid gap-5 md:hidden">
        {fileLists.map((list, index) => (
          <ListComponent key={index} {...list} />
        ))}
      </div>
    </Container>
  )
}

export default File
