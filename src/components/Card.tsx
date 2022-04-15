import { Fragment, useCallback, useContext, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import Dropdown from "../containers/Dropdown"
import { stateContext } from "../context"
import { File, Todo } from "../interfaces"

import {
  HiOutlineArchive,
  HiOutlineChevronDown,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi"
import RenameModal from "./RenameModal"
import { DELETE_FILE, RENAME_FILE } from "../store/actions"

function Card({ id, title, createdAt }: File) {
  const { lists: allLists, filesDispatch } = useContext(stateContext)
  const lists = allLists.filter((list) => list.fileId === id)
  const [active, setActive] = useState<boolean>(false)

  const getAllTodosLength = useCallback(() => {
    let allTodos: Todo[] = []
    const fileLists = allLists.filter((list) => list.fileId === id)
    fileLists.forEach((list) => (allTodos = allTodos.concat(list.todos)))
    return allTodos.length
  }, [allLists, id])

  const barWidth = useMemo<number>(() => {
    let allTodos: Todo[] = []
    const fileLists = allLists.filter((list) => list.fileId === id)
    fileLists.forEach((list) => (allTodos = allTodos.concat(list.todos)))
    const completedTodoLength = allTodos.filter((todo) => todo.done).length
    return (completedTodoLength / allTodos.length) * 100

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allLists])

  function handleRenameModalSubmit(text: string) {
    filesDispatch({
      type: RENAME_FILE,
      payload: {
        id,
        title: text,
      },
    })
  }

  function deleteFile() {
    filesDispatch({
      type: DELETE_FILE,
      payload: {
        id,
      },
    })
  }

  return (
    <div className="border bg-white border-gray-300 p-5 rounded-md space-y-5 flex-auto max-w-md">
      <header className="flex justify-between items-center">
        <div className="flex flex-col">
          <Link to={"/file/" + id} className="font-bold text-xl cursor-pointer">
            {title} ({getAllTodosLength()})
          </Link>
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
              { text: "Archive", icon: <HiOutlineArchive size={20} /> },
              { hr: true },
              {
                text: "Delete",
                icon: <HiOutlineTrash size={20} />,
                danger: true,
                onClick: deleteFile
              },
            ]}
          >
            <HiOutlineChevronDown size={20} className="text-gray-500" />
          </Dropdown>
        </div>
      </header>

      {lists.length ? (
        <Fragment>
          <hr />

          <section>
            <h3 className="font-bold mb-3">Lists:</h3>
            <div className="flex gap-2 flex-wrap">
              {lists.map((ele, index) => (
                <div
                  key={index}
                  className="py-1 px-2 border text-sm cursor-pointer rounded-md"
                >
                  {ele.title} (
                  {ele.todos.length
                    ? ele.todos.filter((todo) => todo.done).length + "/"
                    : ""}
                  {ele.todos.length})
                </div>
              ))}
            </div>
          </section>
        </Fragment>
      ) : (
        ""
      )}

      <hr />

      <section>
        <h3 className="font-bold mb-3">Todos progress:</h3>

        <div className="w-full relative border-2 border-black h-3 rounded-full overflow-hidden">
          <span
            className="bg-blue-500 absolute h-full"
            style={{ width: barWidth + "%" }}
          ></span>
        </div>
      </section>

      <RenameModal
        active={active}
        setActive={setActive}
        defaultValue={title}
        onSubmit={handleRenameModalSubmit}
      />
    </div>
  )
}

export default Card
