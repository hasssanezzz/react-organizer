import { FormEvent, useMemo, useState } from "react"
import {
  HiDotsVertical,
  HiOutlineCheckCircle,
  HiOutlineChevronDown,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineXCircle,
} from "react-icons/hi"
import Dropdown from "../containers/Dropdown"
import { List, Todo } from "../interfaces"
import TodoComponent from "./Todo"
import RenameModal from "./RenameModal"
import { getCategories, getCategory } from "../helpers"
import useStore from "../store"

function Todos({
  id,
  todos,
  category,
}: {
  id: string
  todos: Todo[]
  category?: string
}) {
  return (
    <main className="flex flex-col gap-3 bg-gray-50 py-2 px-3 rounded-md shadow border transition-all duration-150">
      <h3 className="font-bold">
        {category !== "General" && "#"}
        {category} ({todos.length})
      </h3>

      {todos
        .filter((todo) => !todo.done)
        .map((ele, index) => (
          <TodoComponent key={index} listId={id} index={index} {...ele} />
        ))}

      {todos.filter((todo) => todo.done).length !== todos.length &&
      todos.filter((todo) => !todo.done).length !== todos.length ? (
        <hr className="block my-2 w-3/4 mx-auto" />
      ) : (
        ""
      )}

      {todos
        .filter((todo) => todo.done)
        .map((ele, index) => (
          <TodoComponent key={index} listId={id} index={index} {...ele} />
        ))}
    </main>
  )
}

function ListComponent({ id, title, todos, createdAt }: List) {
  const addTodo = useStore((state) => state.addTodo)
  const renameList = useStore((state) => state.renameList)
  const deleteList = useStore((state) => state.deleteList)

  const [text, setText] = useState<string>("")
  const [active, setActive] = useState<boolean>(false)
  const [view, setView] = useState<number>(0)
  const [modalTitle, setModalTitle] = useState(title)

  const getTodoByView = useMemo(() => {
    if (view === 0) return todos
    else if (view === 1) return todos.filter((todo) => todo.done)
    else return todos.filter((todo) => !todo.done)
  }, [todos, view])

  const categories = useMemo(() => {
    return getCategories(getTodoByView)
  }, [getTodoByView])

  function handleDeleteList() {
    deleteList(id)
  }

  function handleRenameModalSubmit(text: string) {
    renameList(id, text)
    setModalTitle(text)
  }

  // add a new todo
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    addTodo(id, text)
    setView(0)
    setText("")
  }

  return (
    <div className="bg-white shadow px-5 pt-5 pb-3 rounded-xl space-y-5 min-w-[300px]">
      <header className="flex justify-between items-center gap-3">
        <div className="flex flex-col">
          <h2 className="font-bold text-xl">
            {title} ({todos.length})
          </h2>
          <p className="text-sm text-gray-400">{createdAt}</p>
        </div>
        <div className="flex gap-2 items-center">
          <Dropdown
            className={`px-3 py-1 rounded-md hover:bg-gray-50 text-gray-500 flex items-center gap-1 border`}
            data={[
              {
                text: "All",
                icon: <HiOutlineEye size={20} />,
                onClick: () => setView(0),
              },
              {
                text: "Compeleted only",
                icon: <HiOutlineCheckCircle size={20} />,
                onClick: () => setView(1),
              },
              {
                text: "Uncompleted only",
                icon: <HiOutlineXCircle size={20} />,
                onClick: () => setView(2),
              },
            ]}
          >
            <span>
              {view === 0 && "All"}
              {view === 1 && "Compeleted"}
              {view === 2 && "Uncompleted"}
            </span>
            <HiOutlineChevronDown size={15} />
          </Dropdown>
          <Dropdown
            className={`p-2 rounded-md hover:bg-gray-50 text-gray-500 flex items-center gap-1 border`}
            data={[
              {
                text: "Rename",
                icon: <HiOutlinePencil size={20} />,
                onClick: () => setActive(true),
              },
              {
                text: "Delete",
                icon: <HiOutlineTrash size={20} />,
                danger: true,
                onClick: handleDeleteList,
              },
            ]}
          >
            <HiDotsVertical size={15} className="text-gray-500" />
          </Dropdown>
        </div>
      </header>

      {getTodoByView.filter((todo) => getCategory(todo.text) === "").length ? (
        <Todos
          todos={getTodoByView.filter((todo) => getCategory(todo.text) === "")}
          id={id}
          category="General"
        />
      ) : (
        ""
      )}

      {categories.map((category, index) => (
        <Todos
          key={index}
          id={id}
          todos={getTodoByView.filter(
            (todo) => getCategory(todo.text) === category
          )}
          category={category}
        />
      ))}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-gray-200 rounded-xl px-3 py-2 w-full"
          placeholder="New todo..."
        />
      </form>

      <RenameModal
        active={active}
        setActive={setActive}
        defaultValue={modalTitle}
        onSubmit={handleRenameModalSubmit}
      />
    </div>
  )
}

export default ListComponent
