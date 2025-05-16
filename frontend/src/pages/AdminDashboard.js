import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  Spinner,
} from 'react-bootstrap';
import { getDashboardSummary } from '../services/api';

// Mock monthly leave stats - replace with real API data or report generator data
const mockMonthlyLeaveStats = [
  { month: 'Jan', leaves: 12 },
  { month: 'Feb', leaves: 8 },
  { month: 'Mar', leaves: 15 },
  { month: 'Apr', leaves: 9 },
  { month: 'May', leaves: 20 },
  { month: 'Jun', leaves: 5 },
  { month: 'Jul', leaves: 18 },
  { month: 'Aug', leaves: 7 },
  { month: 'Sep', leaves: 11 },
  { month: 'Oct', leaves: 14 },
  { month: 'Nov', leaves: 6 },
  { month: 'Dec', leaves: 10 },
];

function AdminDashboard({ onNavigate }) {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [monthlyStats, setMonthlyStats] = useState([]);

  useEffect(() => {
    getDashboardSummary()
      .then((data) => {
        if (data) {
          setSummary(data);
          setError(false);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));

    // Simulate fetching monthly stats from report data
    setMonthlyStats(mockMonthlyLeaveStats);
  }, []);

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  // Bar chart dimensions
  const chartHeight = 150;
  const chartWidth = 700;
  const barWidth = 40;
  const barGap = 15;

  // Max leaves value for scaling
  const maxLeaves = Math.max(...monthlyStats.map((d) => d.leaves), 10);

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#e3f2fd', padding: '2rem 0' }}>
        <h2 className="text-center text-primary fw-bold">🛠 Admin Dashboard</h2>
      </div>

      <Container className="py-5" style={{ maxWidth: '960px' }}>
        {error && (
          <Alert variant="danger" className="text-center mb-4">
            Failed to load admin dashboard data.
          </Alert>
        )}

        {/* Stats */}
        <Row className="g-4 justify-content-center mb-4">
          <Col md={5}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <Card.Title className="fw-semibold text-muted">Total Employees</Card.Title>
                <Card.Text className="display-5 fw-bold text-primary">
                  {summary?.totalEmployees ?? 0}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={5}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <Card.Title className="fw-semibold text-muted">Total Managers</Card.Title>
                <Card.Text className="display-5 fw-bold text-secondary">
                  {summary?.totalManagers ?? 0}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Action Buttons */}
        <Row className="g-4 justify-content-center mb-4">
          {[
            { label: 'Create Leave Type', emoji: '📄', action: 'create-leave' },
            { label: 'Credit Leaves', emoji: '➕', action: 'credit-leave' },
            { label: 'Update Leave Policy', emoji: '⚙️', action: 'update-policy' },
            { label: 'View Full Reports', emoji: '📊', action: 'reports' },
          ].map((btn, i) => (
            <Col md={3} key={i}>
              <Card
                className="text-center shadow-sm border-0 h-100"
                onClick={() => onNavigate(btn.action)}
                style={{ cursor: 'pointer', backgroundColor: '#e3f2fd' }}
              >
                <Card.Body>
                  <div style={{ fontSize: '2rem' }}>{btn.emoji}</div>
                  <Card.Text className="fw-semibold mt-2">{btn.label}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Monthly Leave Stats Bar Chart */}
        <h5 className="text-center mb-3 text-muted">Monthly Leave Statistics</h5>
        <svg
          width={chartWidth}
          height={chartHeight + 40}
          style={{ display: 'block', margin: '0 auto' }}
          role="img"
          aria-label="Monthly leave statistics bar chart"
        >
          {/* Y axis lines and labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
            const y = chartHeight - frac * chartHeight;
            const val = Math.round(frac * maxLeaves);
            return (
              <g key={frac}>
                <line
                  x1="0"
                  y1={y}
                  x2={chartWidth}
                  y2={y}
                  stroke="#ddd"
                  strokeDasharray="2 2"
                />
                <text x="-30" y={y + 5} fill="#666" fontSize="10" textAnchor="end">
                  {val}
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {monthlyStats.map((d, i) => {
            const barHeight = (d.leaves / maxLeaves) * chartHeight;
            const x = i * (barWidth + barGap) + 40;
            return (
              <g key={d.month}>
                <rect
                  x={x}
                  y={chartHeight - barHeight}
                  width={barWidth}
                  height={barHeight}
                  fill="#0d6efd"
                  rx="4"
                  ry="4"
                />
                <text
                  x={x + barWidth / 2}
                  y={chartHeight + 15}
                  fontSize="12"
                  fill="#333"
                  textAnchor="middle"
                >
                  {d.month}
                </text>
              </g>
            );
          })}
        </svg>
      </Container>

      {/* Footer */}
      <div
        style={{
          backgroundColor: '#e3f2fd',
          padding: '1rem 0',
          textAlign: 'center',
          color: '#6c757d',
          fontSize: '0.9rem',
        }}
      >
        © {new Date().getFullYear()} Leave Management Portal — Admin Panel
      </div>
    </div>
  );
}

export default AdminDashboard;
