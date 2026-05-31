import { useState } from "react";
import axios from "axios";

export default function AddJob() {

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "pending"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/jobs", {
        ...formData,
        applied_date: new Date().toISOString().split("T")[0]
      });

      alert("Job added ✅");

      setFormData({
        company: "",
        position: "",
        status: "pending"
      });

    } catch (err) {
      console.error(err);
      alert("Error ❌");
    }
  };

  return (
    <main className='bg-slate-100 w-full h-screen'>
      <h1 className="font-bold text-4xl p-8 pb-2">Add New Job</h1>
      <h3 className="text-xl pl-9 mb-5">Track a new job application</h3>

      <form 
        onSubmit={handleSubmit}
        className="p-6 border bg-slate-50 mx-9 rounded-md"
      >

        <label>Company Name</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="google..."
          className="w-full p-2 border rounded my-3"
        />

        <label>Job Position</label>
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          placeholder="frontend developer"
          className="w-full p-2 border rounded my-3"
        />

        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded my-3"
        >
          <option value="pending">pending</option>
          <option value="accepted">accepted</option>
          <option value="rejected">rejected</option>
        </select>

        <button className="bg-stone-400 p-3 mt-3 rounded-xl">
          Add Application
        </button>

      </form>
    </main>
  );
}