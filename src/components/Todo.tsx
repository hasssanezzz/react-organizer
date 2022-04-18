import { useState } from "react"
import { useSpring, animated } from "@react-spring/web"
import CheckBox from "./Checkbox"
import {
  HiOutlineDotsVertical,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi"
import Dropdown from "../containers/Dropdown"
import RenameModal from "./RenameModal"
import useStore from "../store"

function TodoComponent({
  id,
  index,
  text,
  done,
  listId,
}: {
  id: string
  index: number
  listId: string
  text: string
  done: boolean
}) {
  const [renameModalActive, setRenameModalActive] = useState<boolean>(false)
  const valuedIndex = typeof index === "number" ? index : 0
  const props = useSpring({ to: { opacity: 1, rotate: 0, scale: 1 }, from: { opacity: 0, rotate: 0, scale: 0.9 } })

  const deleteTodo = useStore(state => state.deleteTodo)
  const renameTodo = useStore(state => state.renameTodo)
  const toggleTodo = useStore(state => state.toggleTodo)

  function handleDeleteTodo() {
    deleteTodo(listId, id)
  }


  function handleRenameTodo(text: string) {
    renameTodo(listId, id, text)
  }

  function handleTodoToggle() {
    toggleTodo(listId, id)
  }

  return (
    <animated.div style={props} className="flex items-center justify-between">
      <div
        className={`flex items-center decoration-blue-600 gap-2 text-gray-500 ${
          done ? "line-through" : ""
        }`}
      >
        <span>
          ({(valuedIndex + 1).toString().length === 1 ? "0" : ""}
          {valuedIndex + 1})
        </span>
        <span>{text}</span>
      </div>

      <div className="flex items-center gap-1">
        <CheckBox active={done} onClick={handleTodoToggle} />

        <Dropdown
          className="hover:bg-gray-200 cursor-pointer rounded-md w-5 h-5 p-1 flex items-center justify-center"
          data={[
            {
              text: "Rename",
              icon: <HiOutlinePencil size={20} />,
              onClick: () => setRenameModalActive(true),
            },
            {
              text: "Delete",
              icon: <HiOutlineTrash size={20} />,
              danger: true,
              onClick: handleDeleteTodo,
            },
          ]}
        >
          <HiOutlineDotsVertical size={15} />
        </Dropdown>

        <RenameModal
          active={renameModalActive}
          setActive={setRenameModalActive}
          defaultValue={text}
          onSubmit={handleRenameTodo}
        />
      </div>
    </animated.div>
  )
}

export default TodoComponent
