const express = require("express");
const cors = require("cors");
const jobsRouter = require("./routes/jobs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// routes
app.use("/api/jobs", jobsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});         