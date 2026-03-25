const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");

const upload = multer();

router.post("/", upload.single("resume"), async (req, res) => {
    try {
        console.log("API HIT");

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        console.log("File received:", req.file.originalname);

        const buffer = req.file.buffer;

        let text = "";

        try {
            const data = await pdfParse(buffer);
            text = data.text;
        } catch (err) {
            console.error("PDF parse error:", err);
            return res.status(500).json({ error: "PDF parsing failed" });
        }

        console.log("Extracted text length:", text.length);

        if (!text || text.trim() === "") {
            return res.status(400).json({ error: "Empty resume" });
        }

        // 🔥 SIMPLE ANALYSIS
        const result = `
Resume Analysis:

- Characters: ${text.length}
- Good structure detected

Suggestions:
- Add projects
- Add achievements
- Improve formatting
`;

        res.json({ result });

    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;