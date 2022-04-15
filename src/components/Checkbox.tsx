import { HiOutlineCheck } from "react-icons/hi"

const CheckBox: React.FC<{ active?: boolean, onClick?: Function }> = ({ active, onClick }) => {
  return <div className={` ${active ? "bg-blue-500" : "bg-gray-300"} cursor-pointer rounded-md w-5 h-5 flex items-center justify-center text-white`} onClick={() => onClick && onClick()}>{active ? <HiOutlineCheck size={15} /> : ""}</div>
}

export default CheckBox