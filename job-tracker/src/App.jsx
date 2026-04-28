import { Routes,Route,Link } from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import AllJobs from "./pages/AllJobs";
export default function App(){
  return(
    <>
     <nav className="flex m-6 justify-between">
      <div className="text-xl pr-14 font-bold">💼Job Tracker</div>
      <div className="flex gap-6">
        <Link to='/' className="hover:bg-gray-300 p-1 rounded bg-gray-100"> Dashboard </Link>
        <Link to='/AddJob' className="bg-gray-100 p-1 rounded hover:bg-gray-300 "> + Add Job </Link>
        <Link to='/AllJobs' className="bg-gray-100 p-1 rounded hover:bg-gray-300 "> All Jobs </Link>
        
      </div>
    </nav>
    <Routes>
         <Route path="/" element={<Dashboard/>}/>
        <Route path='/AddJob' element={<AddJob/>}/>
        <Route path='/AllJobs' element={<AllJobs/>}/>
     </Routes>
    </>
   
  )
}