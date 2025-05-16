import React from 'react';
import { Container } from 'react-bootstrap';
import ReportGenerator from '../components/ReportGenerator';

function ReportsPage() {
  return (
    <Container style={{ marginTop: '3rem', maxWidth: '900px' }}>
      <h1 className="mb-4 text-center">📋 Leave Reports</h1>
      <ReportGenerator />
    </Container>
  );
}

export default ReportsPage;
