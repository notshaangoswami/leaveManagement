import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Spinner, Alert } from 'react-bootstrap';

// Exported so AdminDashboard can import and use it
export function generateMockReportData() {
  const leaveTypes = ['Sick', 'Casual', 'Paid', 'Maternity', 'Paternity'];
  const statuses = ['Approved', 'Pending', 'Rejected'];
  const employees = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank', 'Grace', 'Hank', 'Ivy', 'Jack'];

  const data = [];
  for (let i = 1; i <= 50; i++) {
    const employee = employees[Math.floor(Math.random() * employees.length)];
    const leaveType = leaveTypes[Math.floor(Math.random() * leaveTypes.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    const month = Math.floor(Math.random() * 12);
    const dayStart = Math.floor(Math.random() * 20) + 1;
    const startDate = new Date(2023, month, dayStart);
    const duration = Math.floor(Math.random() * 5) + 1;
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + duration);

    data.push({
      id: i,
      employee,
      leaveType,
      startDate: startDate.toISOString().slice(0, 10),
      endDate: endDate.toISOString().slice(0, 10),
      status,
    });
  }
  return data;
}

function ReportGenerator() {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      try {
        const mockData = generateMockReportData();
        setReportData(mockData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load report data.');
        setLoading(false);
      }
    }, 1000);
  }, []);

  const totalLeaves = reportData.length;
  const approvedLeaves = reportData.filter((r) => r.status === 'Approved').length;
  const rejectedLeaves = reportData.filter((r) => r.status === 'Rejected').length;
  const pendingLeaves = reportData.filter((r) => r.status === 'Pending').length;

  const exportCSV = () => {
    if (!reportData.length) return;
    const csvRows = [];
    const headers = ['Employee', 'Leave Type', 'Start Date', 'End Date', 'Status'];
    csvRows.push(headers.join(','));
    reportData.forEach(({ employee, leaveType, startDate, endDate, status }) => {
      csvRows.push([employee, leaveType, startDate, endDate, status].join(','));
    });
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'leave_report.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-5" style={{ maxWidth: '900px' }}>
      <h2 className="mb-4 text-center">📊 Leave Report</h2>

      <div className="d-flex justify-content-between mb-3">
        <div>
          <strong>Total Leaves:</strong> {totalLeaves} &nbsp;&nbsp;
          <strong>Approved:</strong> {approvedLeaves} &nbsp;&nbsp;
          <strong>Rejected:</strong> {rejectedLeaves} &nbsp;&nbsp;
          <strong>Pending:</strong> {pendingLeaves}
        </div>
        <Button variant="primary" onClick={exportCSV}>
          Export CSV
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map(({ id, employee, leaveType, startDate, endDate, status }) => (
            <tr key={id}>
              <td>{employee}</td>
              <td>{leaveType}</td>
              <td>{startDate}</td>
              <td>{endDate}</td>
              <td>{status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ReportGenerator;
