import { useContext } from "react"
import { FormEvent, useState } from "react"
import Card from "../components/Card"
import Container from "../containers/Container"
import { stateContext } from "../context"
import { File } from "../interfaces"

function Home() {
  const { files, filesDispatch } = useContext(stateContext)

  const [title, setTitle] = useState<string>("")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    filesDispatch({
      type: "ADD_FILE",
      payload: {
        id: Date.now().toString(),
        title,
        createdAt: new Date().toLocaleDateString(),
      },
    })

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
