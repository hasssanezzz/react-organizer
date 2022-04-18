import { FormEvent, useState } from "react"
import Card from "../components/Card"
import Container from "../containers/Container"
import { File } from "../interfaces"
import useStore from '../store'

function Home() {
  const files = useStore(state => state.files)
  const addFile = useStore(state => state.addFile)

  const [title, setTitle] = useState<string>("")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    addFile(title)

    setTitle("")
  }
  
  return (
    <div className="pb-5 space-y-5">
      <Container>
        <h1 className="text-4xl font-bold text-center my-10">Files</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-white rounded-xl px-3 py-2 w-full"
            placeholder="Add a new file..."
          />
        </form>
      </Container>

      <Container className="flex flex-wrap items-start gap-5">
        {files.map((ele: File, index: number) => (
          <Card key={index} {...ele} />
        ))}
      </Container>
    </div>
  )
}

export default Home
