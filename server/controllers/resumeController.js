import fs from 'fs';
import pdfParse from 'pdf-parse';
import { analyzeResume } from '../services/aiService.js';

/**
 * Controller to handle resume upload and processing.
 */
export const uploadResume = async (req, res) => {
  try {
    // 1. Check if file is provided
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded or invalid file type. Please upload a PDF.' });
    }

    const filePath = req.file.path;
    console.log(`File uploaded successfully: ${filePath}`);

    // 2. Read and parse the PDF
    const fileBuffer = fs.readFileSync(filePath);
    let extractedText = '';
    
    try {
      const pdfData = await pdfParse(fileBuffer);
      extractedText = pdfData.text;
    } catch (parseError) {
      console.error('PDF parsing error:', parseError);
      
      // Cleanup file if parsing fails
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      
      return res.status(500).json({ success: false, message: 'Failed to extract text from PDF.' });
    }

    if (!extractedText || extractedText.trim().length === 0) {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      return res.status(400).json({ success: false, message: 'Extracted text from PDF is empty.' });
    }

    // 3. Send extracted text to AI service
    const aiAnalysisResult = await analyzeResume(extractedText);

    // 4. Return the parsed AI result
    res.status(200).json({
      success: true,
      data: aiAnalysisResult
    });

  } catch (error) {
    console.error('Error processing resume:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while processing the resume.'
    });
  } finally {
    // Always clean up the uploaded file to save space
    if (req.file && fs.existsSync(req.file.path)) {
      console.log(`Cleaning up uploaded file: ${req.file.path}`);
      fs.unlinkSync(req.file.path);
    }
  }
};
