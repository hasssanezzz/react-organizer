import { FormEvent, useContext, useMemo, useState } from "react"
import {
  HiOutlineChevronDown,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi"
import Dropdown from "../containers/Dropdown"
import { stateContext } from "../context"
import { List, Todo } from "../interfaces"
import TodoComponent from "./Todo"
import RenameModal from "./RenameModal"
import { getCategories, getCategory } from "../helpers"
import { ADD_TODO, DELETE_LIST, RENAME_LIST } from '../store/actions'

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
      <h3 className="font-bold">{category !== "General" && "#"}{category} ({todos.length})</h3>

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
  const { listsDispatch } = useContext(stateContext)
  const [text, setText] = useState<string>("")
  const [active, setActive] = useState<boolean>(false)

  const [modalTitle, setModalTitle] = useState(title)

  const categories = useMemo(() => getCategories(todos), [todos])

  // delete the entire list
  function deleteList() {
    listsDispatch({
      type: DELETE_LIST,
      payload: {
        id,
      },
    })
  }

  function handleRenameModalSubmit(text: string) {
    listsDispatch({
      type: RENAME_LIST,
      payload: {
        id,
        title: text,
      },
    })

    setModalTitle(text)
  }

  // add a new todo
  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      done: false,
    }

    listsDispatch({
      type: ADD_TODO,
      payload: {
        id: id,
        newTodo,
      },
    })

    setText("")
  }

  return (
    <div className="bg-white shadow px-5 pt-5 pb-3 rounded-xl space-y-5 min-w-[300px]">
      <header className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="font-bold text-xl">{title} ({todos.length})</h2>
          <p className="text-sm text-gray-400">{createdAt}</p>
        </div>
        <div>
          <Dropdown
            className="p-1 rounded-md hover:bg-gray-200"
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
                onClick: deleteList,
              },
            ]}
          >
            <HiOutlineChevronDown size={20} className="text-gray-500" />
          </Dropdown>
        </div>
      </header>

      {todos.filter((todo) => getCategory(todo.text) === "").length ? (
        <Todos
          todos={todos.filter((todo) => getCategory(todo.text) === "")}
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
          todos={todos.filter((todo) => getCategory(todo.text) === category)}
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
