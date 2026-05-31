import { useState , useEffect } from "react";
import axios from "axios";

export default function Dashboard(){
  const [jobs, setJobs] =useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/jobs").then((response) => {
      setJobs(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);
  
  const totalApplications = jobs.length;

  const acceptedJobs = jobs.filter(
    (job) => job.status === "accepted"
  ).length;

  const rejectedJobs = jobs.filter(
    (job) => job.status === "rejected"
  ).length;

  const pendingJobs = jobs.filter(
    (job) => job.status === "pending"
  ).length;

  return (
    <main className="bg-slate-50 min-h-screen p-8 font-sans">
      <div className="mb-8">
        <h1 className="font-bold text-3xl text-gray-800">Dashboard</h1>
        <p className="text-gray-500"> Track and manage your job applications</p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Total Applications</p>
          <h2 className="text-2xl font-bold text-blue-600">{totalApplications}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Accepted</p>
          <h2 className="text-2xl font-bold text-green-600">{acceptedJobs}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Rejected</p>
          <h2 className="text-2xl font-bold text-red-600">{rejectedJobs}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Pending</p>
          <h2 className="text-2xl font-bold text-yellow-600">{pendingJobs}</h2>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-lg mb-4">Recent Applications</h3>
        <div className="space-y-3">
          {}
          {jobs.map((job) => (
            <div key={job.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center text-blue-500">🏢</div>
                <div>
                  <p className="font-semibold text-gray-800">{job.company}</p>
                  <p className="text-sm text-gray-500">{job.position}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                job.status === "accepted" ? "bg-green-100 text-green-700" : job.status === "rejected" ? "bg-red-100 text-red-700" :"bg-yellow-100 text-yellow-700"
              }`}>
                {job.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
