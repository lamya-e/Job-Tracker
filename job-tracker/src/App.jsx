import { Routes,Route,Link } from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import AllJobs from "./pages/AllJobs";
export default function App(){
  return(
    <>
     <nav className='flex'>
      <div className="pr-14">Job Tracker</div>
      <div>
        <Link to='/'>Dashboard </Link>/
        <Link to='/AddJob'>AddJob </Link>/  
        <Link to='/AllJobs'>AllJobs</Link>
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