// src/components/Calendar.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // You can skip styling if you want

function LeaveCalendar() {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <h3>Leave Calendar</h3>
      <Calendar onChange={setDate} value={date} />
      <p>Selected Date: {date.toDateString()}</p>
    </div>
  );
}

export default LeaveCalendar;
