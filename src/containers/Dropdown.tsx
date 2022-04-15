import { Menu } from "@headlessui/react"

interface Element {
  text?: string
  icon?: any
  danger?: boolean
  hr?: boolean
  onClick?: () => void
}

function Dropdown({
  data,
  children,
  className,
}: {
  data: Element[]
  className?: string
  children: any
}) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className={className}>{children}</Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 rounded-md border shadow-lg overflow-hidden w-56 p-2 bg-white z-10">
        {data.map((ele, index) =>
          !ele.hr ? (
            <Menu.Item key={index} onClick={() => ele.onClick && ele.onClick()}>
              {({ active }) => (
                <div
                  className={`px-3 py-2 cursor-pointer ${ele.danger ? "text-red-500" : "text-gray-500"} bg-white flex items-center gap-2 rounded-md ${
                    active && (ele.danger ? "bg-red-200" : "bg-gray-200")
                  }`}
                >
                  <span>{ele.icon}</span>
                  <span>{ele.text}</span>
                </div>
              )}
            </Menu.Item>
          ) : (
            <hr key={index} className="block my-2 w-3/4 mx-auto" />
          )
        )}
      </Menu.Items>
    </Menu>
  )
}

export default Dropdown

/*

<Menu.Item>
          {({ active }) => (
            <div className={`px-3 py-2 cursor-pointer text-gray-500 bg-white flex items-center gap-2 rounded-md ${active && "bg-gray-200"}`}>
              <span><HiOutlineNewspaper size={20} /></span>
              <span>Papers</span>
            </div>
          )}
        </Menu.Item>
        <Menu.Item onClick={() => alert('pencil clicked')}>
          {({ active }) => (
            <div className={`px-3 py-2 cursor-pointer text-gray-600 bg-white flex items-center gap-2 rounded-md ${active && "bg-gray-200"}`}>
              <span><HiOutlinePencil size={20} /></span>
              <span>Pencil</span>
            </div>
          )}
        </Menu.Item>
        <hr className="block my-2 w-3/4 mx-auto" />
        <Menu.Item>
          {({ active }) => (
            <div className={`px-3 py-2 cursor-pointer text-gray-600 bg-white flex items-center gap-2 rounded-md ${active && "bg-gray-200"}`}>
              <span><HiOutlineLockOpen size={20} /></span>
              <span>Lock</span>
            </div>
          )}
        </Menu.Item>

*/
