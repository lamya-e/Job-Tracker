export default function AddJob(){
    return(
        <>
            <main className='bg-slate-100 w-full h-screen'>
                <h1 className="font-bold text-4xl p-8 pb-2">Add New Job</h1>
                <h3 className="text-xl pl-9 mb-5">Track a new job application</h3>
                <form className="p-6 border bg-slate-50 mx-9 rounded-md">
                    <label>Company Name</label>
                    <input type="text" placeholder="google..." className="w-full p-2 border rounded my-3 " />
                    <label >Job Position</label>
                    <input type="text" placeholder="frontend devloper" className="w-full p-2 my-3" />
                    <label>Status</label>
                    <input list="status" className="w-full p-2 my-3"/>
                    <datalist id="status">
                        <option>pending</option>
                        <option>accepted</option>
                        <option>rejected</option>
                    </datalist>
                    <input type="submit" value='Add Application' className="bg-stone-400 p-3 mt-3 rounded-xl"/>

                </form>

            </main>
        </>
    )
}

