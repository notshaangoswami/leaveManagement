import React, { useState, useEffect } from 'react';

// Simulating the fetched data
const mockPendingLeaves = [
  { id: 1, leaveType: 'Sick', startDate: '2023-05-01', endDate: '2023-05-03', reason: 'Fever' },
  { id: 2, leaveType: 'Vacation', startDate: '2023-04-20', endDate: '2023-04-22', reason: 'Family trip' },
];

function LeaveApproval() {
  const [pendingLeaves, setPendingLeaves] = useState([]);

  useEffect(() => {
    // In a real app, you'd fetch this data from your API
    setPendingLeaves(mockPendingLeaves);
  }, []);

  const handleApproval = (id, status) => {
    // Send the approval/rejection to backend API
    console.log(`Leave ID ${id} has been ${status}`);
  };

  return (
    <div className="leave-approval">
      <h3>Pending Leave Approvals</h3>
      <table>
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingLeaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.leaveType}</td>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.reason}</td>
              <td>
                <button onClick={() => handleApproval(leave.id, 'approved')}>Approve</button>
                <button onClick={() => handleApproval(leave.id, 'rejected')}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveApproval;
