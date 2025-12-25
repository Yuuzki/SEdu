import express from "express";
import multer from "multer";
import axios from "axios";
import FormData from "form-data";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const PORT = process.env.PORT || 4000;
const WALRUS_URL = process.env.WALRUS_UPLOAD_URL || "";
const WALRUS_API_KEY = process.env.WALRUS_API_KEY || "";

app.use(cors());

app.post("/api/upload-walrus", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file provided" });

  try {
    const form = new FormData();
    form.append("file", req.file.buffer, { filename: req.file.originalname });
    if (req.body.title) form.append("title", req.body.title);
    if (req.body.description) form.append("description", req.body.description);
    if (req.body.module) form.append("module", req.body.module);

    const headers = { ...form.getHeaders() };
    if (WALRUS_API_KEY) headers["Authorization"] = `Bearer ${WALRUS_API_KEY}`;

    const walrusResp = await axios.post(WALRUS_URL, form, { headers });

    return res.status(200).json(walrusResp.data);
  } catch (err) {
    console.error("Walrus upload error:", err?.message || err);
    return res.status(500).json({ error: "Upload failed", details: err?.message || String(err) });
  }
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
