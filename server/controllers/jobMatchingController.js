import fs from 'fs';
import pdfParse from 'pdf-parse';
import { matchJob } from '../services/aiService.js';

export const matchJobWithResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Resume PDF is required.' });
    }

    const { jobDescription } = req.body;
    if (!jobDescription || jobDescription.trim().length === 0) {
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, message: 'Job description is required.' });
    }

    const fileBuffer = fs.readFileSync(req.file.path);
    let extractedText = '';

    try {
        const pdfData = await pdfParse(fileBuffer);
        extractedText = pdfData.text;
    } catch (parseError) {
        console.error('PDF parsing error:', parseError);
        if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        return res.status(500).json({ success: false, message: 'Failed to extract text from PDF.' });
    }

    if (!extractedText || extractedText.trim().length === 0) {
        if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        return res.status(400).json({ success: false, message: 'Extracted text from PDF is empty.' });
    }

    const aiResult = await matchJob(extractedText, jobDescription);

    res.status(200).json({
      success: true,
      data: aiResult
    });

  } catch (error) {
    console.error('Job Matching controller error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to match job.'
    });
  } finally {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
  }
};
