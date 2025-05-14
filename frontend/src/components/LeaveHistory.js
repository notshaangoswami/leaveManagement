import React, { useState, useEffect } from 'react';

// Simulating the fetched data
const mockLeaveData = [
  { id: 1, leaveType: 'Sick', startDate: '2023-05-01', endDate: '2023-05-03', status: 'Approved' },
  { id: 2, leaveType: 'Casual', startDate: '2023-04-15', endDate: '2023-04-17', status: 'Pending' },
];

function LeaveHistory() {
  const [leaveData, setLeaveData] = useState([]);

  useEffect(() => {
    // In a real app, you'd fetch this from your API
    setLeaveData(mockLeaveData);
  }, []);

  return (
    <div className="leave-history">
      <h3>Your Leave History</h3>
      <table>
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveData.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.leaveType}</td>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveHistory;
