import "./config.js";
import express from "express";
import cors from "cors";
import records from "./routes/records.js";
import profile from "./routes/profile.js";
import tasks from "./routes/tasks.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/profile", records);
app.use("/tasks", tasks);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
