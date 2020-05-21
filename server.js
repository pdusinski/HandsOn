const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Api runninig"));

app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/teams", require("./routes/api/teams"));
app.use("/api/company", require("./routes/api/company"));
app.use("/api/projects", require("./routes/api/projects"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/note", require("./routes/api/note"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT} s`));
