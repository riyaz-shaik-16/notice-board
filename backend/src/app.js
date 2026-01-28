import express from "express";
import cors from "cors";

import noticeRoutes from "./routes/notice.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";

import errorHandler from "./middlewares/error.middleware.js";




const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "Village Notice Board API is running" });
});

app.use("/api/notices", noticeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);


app.use(errorHandler);

export default app;
