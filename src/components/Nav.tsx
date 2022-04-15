import { Link } from "react-router-dom"
import Container from "../containers/Container"

function Nav() {
  return (
    <div className="w-full h-20 bg-white">
      <Container className="flex items-center justify-between h-full w-full">
        <Link to="/" className="font-bold font-mono text-2xl cursor-pointer">Nano</Link>

        <div className="space-x-3">
          {/* <Link to="/" className="px-4 py-2 hover:bg-gray-100 rounded font-semibold cursor-pointer">Home</Link> */}
          {/* <Link to="/" className="px-4 py-2 hover:bg-gray-100 rounded font-semibold cursor-pointer">Settings</Link> */}
          <Link to="/" onClick={() => localStorage.clear()} className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 font-semibold cursor-pointer">Logout</Link>
        </div>
      </Container>
    </div>
  )
}

export default Nav
