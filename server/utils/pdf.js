import pdfParse from "pdf-parse";
import fs from "fs";
import path from "path";

export const parseResumeBuffer = async (buffer) => {
  try {
    if (!buffer || buffer.length === 0) {
      throw new Error("Empty buffer received");
    }

    // Diagnostic: Save to tmp to verify integrity
    const tmpPath = path.join(process.cwd(), "last_upload.pdf");
    fs.writeFileSync(tmpPath, buffer);

    const data = await pdfParse(buffer);
    
    // Clean up if successful
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
    
    return data.text;
  } catch (error) {
    console.error("PDF Parse Error:", error);
    throw new Error(`PDF Parsing failed: ${error.message}`);
  }
};
