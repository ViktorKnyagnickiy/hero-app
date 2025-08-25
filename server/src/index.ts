import app from "./app";
import path from "path";
import fs from "fs";
import express from "express";

const PORT = process.env.PORT || 4000;


const uploadsDir = path.resolve(__dirname, "..", "uploads");
fs.mkdirSync(uploadsDir, { recursive: true });

app.use("/uploads", express.static(uploadsDir));

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
