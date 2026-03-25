import { estimateSalary } from '../services/aiService.js';

export const getSalaryEstimate = async (req, res) => {
  try {
    const { jobTitle, skills, experience, location } = req.body;
    
    if (!jobTitle) {
      return res.status(400).json({ success: false, message: 'Job title is required.' });
    }

    const result = await estimateSalary(jobTitle, skills || '', experience || '', location || '');

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Salary Estimator controller error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to estimate salary.'
    });
  }
};
