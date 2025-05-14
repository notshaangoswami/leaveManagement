// src/services/api.js

export async function getDashboardSummary() {
  const response = await fetch('/api/dashboard-summary');
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  return await response.json();
}
