// src/services/api.js

export const getDashboardSummary = async () => {
  try {
    const response = await fetch('/api/dashboard-summary'); // Use your actual API endpoint
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to fetch dashboard summary');
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

// New applyLeave function
export const applyLeave = async (leaveData) => {
  try {
    const response = await fetch('/api/apply-leave', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leaveData),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to apply leave');
    }
  } catch (error) {
    console.error('Error applying leave:', error);
    throw error;
  }
};
