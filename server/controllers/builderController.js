import { generateResume } from '../services/aiService.js';

export const buildResume = async (req, res) => {
  try {
    const userData = req.body;
    
    if (!userData || Object.keys(userData).length === 0) {
      return res.status(400).json({ success: false, message: 'User data is required.' });
    }

    const generatedData = await generateResume(userData);

    return res.status(200).json({
      success: true,
      data: generatedData
    });
  } catch (error) {
    console.error('Builder controller error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate resume content.'
    });
  }
};
