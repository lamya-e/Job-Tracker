import { useState, useEffect } from "react";

export default function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch jobs from backend whenever filter changes
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
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        setError("Could not load jobs. Make sure the server is running.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [activeFilter]);

  // format date like "Apr 15, 2026"
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // status badge styling
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return {
          backgroundColor: "#dcfce7",
          color: "#16a34a",
          border: "1px solid #bbf7d0",
        };
      case "rejected":
        return {
          backgroundColor: "#fee2e2",
          color: "#dc2626",
          border: "1px solid #fecaca",
        };
      default:
        return {
          backgroundColor: "#fef9c3",
          color: "#ca8a04",
          border: "1px solid #fef08a",
        };
    }
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // count jobs per status for the filter buttons
  const counts = {
    all: jobs.length,
    pending: jobs.filter((j) => j.status.toLowerCase() === "pending").length,
    accepted: jobs.filter((j) => j.status.toLowerCase() === "accepted").length,
    rejected: jobs.filter((j) => j.status.toLowerCase() === "rejected").length,
  };

  // when filter is active we show all fetched jobs (already filtered by backend)
  const displayedJobs = jobs;

  return (
    <main style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "32px 40px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#0f172a", marginBottom: "6px" }}>
        All Applications
      </h1>
      <p style={{ color: "#64748b", marginBottom: "28px", fontSize: "14px" }}>
        Manage and filter your job applications
      </p>

      {/* filter bar */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "10px",
          padding: "16px 20px",
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span style={{ color: "#64748b", fontSize: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
          {/* filter icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Filter:
        </span>

        {["all", "pending", "accepted", "rejected"].map((filter) => {
          const isActive = activeFilter === filter;
          // count label: for "all" we need the total from all jobs
          // when filter is active, counts are based on current displayed data
          // so we re-calculate the label from the raw data before filtering
          const label =
            filter === "all"
              ? `All`
              : capitalize(filter);

          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                border: isActive ? "none" : "1px solid #e2e8f0",
                backgroundColor: isActive ? "#2563eb" : "#ffffff",
                color: isActive ? "#ffffff" : "#374151",
                fontWeight: isActive ? "600" : "400",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              {/* show count in button */}
              {filter === "all"
                ? `All (${activeFilter === "all" ? jobs.length : "-"})`
                : `${capitalize(filter)} (${counts[filter]})`}
            </button>
          );
        })}
      </div>

      {/* loading / error states */}
      {loading && (
        <p style={{ color: "#64748b", textAlign: "center", marginTop: "40px" }}>
          Loading jobs...
        </p>
      )}
      {error && (
        <p style={{ color: "#dc2626", textAlign: "center", marginTop: "40px" }}>
          {error}
        </p>
      )}

      {/* jobs grid */}
      {!loading && !error && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            {displayedJobs.map((job) => (
              <div
                key={job.id}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  padding: "18px 20px",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                {/* left side: icon + info */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  {/* company icon placeholder */}
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      backgroundColor: "#eff6ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8">
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                    </svg>
                  </div>

                  <div>
                    <p style={{ fontWeight: "600", color: "#0f172a", fontSize: "15px", margin: "0 0 2px 0" }}>
                      {job.company}
                    </p>
                    <p style={{ color: "#64748b", fontSize: "13px", margin: "0 0 6px 0" }}>
                      {job.position}
                    </p>
                    <p style={{ color: "#94a3b8", fontSize: "12px", margin: 0 }}>
                      Applied: {formatDate(job.applied_date)}
                    </p>
                  </div>
                </div>

                {/* status badge */}
                <span
                  style={{
                    ...getStatusStyle(job.status),
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "500",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {capitalize(job.status)}
                </span>
              </div>
            ))}
          </div>

          {/* footer count */}
          <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "13px", marginTop: "24px" }}>
            Showing {displayedJobs.length} of {displayedJobs.length} applications
          </p>
        </>
      )}
    </main>
  );
}