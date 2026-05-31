import { useState, useEffect } from "react";

export default function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const url =
          activeFilter === "all"
            ? "http://localhost:5000/api/jobs"
            : `http://localhost:5000/api/jobs?status=${activeFilter}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("failed");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        setError("Server is not running or something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [activeFilter]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const getStatusColor = (status) => {
    if (status === "accepted") return { background: "#d4edda", color: "#155724" };
    if (status === "rejected") return { background: "#f8d7da", color: "#721c24" };
    return { background: "#fff3cd", color: "#856404" };
  };

  const filters = ["all", "pending", "accepted", "rejected"];

  return (
    <main className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-1">All Applications</h1>
      <p className="text-gray-500 mb-6">Manage and filter your job applications</p>

      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 flex gap-3 items-center flex-wrap">
        <span className="text-gray-500 text-sm">Filter:</span>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-1 rounded-full text-sm border ${
              activeFilter === f
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f === "all" && ` (${jobs.length})`}
            {f === "pending" && ` (${jobs.filter((j) => j.status === "pending").length})`}
            {f === "accepted" && ` (${jobs.filter((j) => j.status === "accepted").length})`}
            {f === "rejected" && ` (${jobs.filter((j) => j.status === "rejected").length})`}
          </button>
        ))}
      </div>

      {loading && <p className="text-center text-gray-400 mt-10">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-10">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-2 gap-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-start">
                <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{job.company}</p>
                    <p className="text-sm text-gray-500">{job.position}</p>
                    <p className="text-xs text-gray-400 mt-1">Applied: {formatDate(job.applied_date)}</p>
                  </div>
                </div>
                <span
                  className="text-xs px-3 py-1 rounded-full font-medium shrink-0"
                  style={getStatusColor(job.status)}
                >
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-6">
            Showing {jobs.length} of {jobs.length} applications
          </p>
        </>
      )}
    </main>
  );
}