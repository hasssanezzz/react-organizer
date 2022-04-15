import { FormEvent, useState } from "react"
import { HiOutlineX } from "react-icons/hi"

const RenameModal = ({
  active,
  setActive,
  onSubmit,
  defaultValue,
}: {
  active: boolean
  setActive: Function
  onSubmit: Function
  defaultValue: string
}) => {
  const toggle = () => setActive(!active)
  const [text, setText] = useState<string>(defaultValue)

  function handleClick(event: any) {
    event.target.classList.contains("fixed") && setActive(false)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSubmit(text)
    setActive(false)
    setText(defaultValue)
  }

  return active ? (
    <div
      className="fixed top-0 left-0 w-full h-screen bg-black/30 flex items-start justify-center p-5 overflow-y-auto"
      style={{ zIndex: 100, marginTop: 0 }}
      onClick={handleClick}
    >
      <div
        className={`bg-white rounded-md p-5 flex-auto relative mt-10 mb-5 max-w-md`}
      >
        <button
          onClick={toggle}
          className="absolute -top-4 right-5 shadow-md bg-blue-500 w-8 h-8 rounded-md flex items-center justify-center text-white"
        >
          <HiOutlineX size={20} />
        </button>

        <h2 className="text-xl my-5 text-center font-bold">Rename</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-gray-200 rounded-xl px-3 py-2 w-full"
            placeholder="Rename..."
          />
          
          <button className="px-6 py-2 bg-blue-500 text-white rounded-md mt-5 w-full hover:bg-blue-600 shadow">Submit</button>
        </form>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default RenameModal
