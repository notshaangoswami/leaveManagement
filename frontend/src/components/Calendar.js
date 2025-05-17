// // components/Calendar.js
// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import '../css/Calendar.css';

// const holidayList = [
//   { date: '2025-01-26', name: 'Republic Day' },
//   { date: '2025-08-15', name: 'Independence Day' },
//   { date: '2025-10-02', name: 'Gandhi Jayanti' },
// ];

// const CalendarComponent = () => {
//   const [value, setValue] = useState(new Date());

//   const isHoliday = (date) => {
//     return holidayList.some(
//       (holiday) => holiday.date === date.toISOString().split('T')[0]
//     );
//   };

//   const getHolidayName = (date) => {
//     const holiday = holidayList.find(
//       (h) => h.date === date.toISOString().split('T')[0]
//     );
//     return holiday ? holiday.name : '';
//   };

//   return (
//     <div className="calendar-container ">
//       <h2 className="calendar-heading">Holiday Calendar</h2>
//       <Calendar
//         onChange={setValue}
//         value={value}
//         tileClassName={({ date }) =>
//           isHoliday(date) ? 'holiday-tile' : null
//         }
//         tileContent={({ date }) => {
//           const name = getHolidayName(date);
//           return name ? <p className="holiday-label">{name}</p> : null;
//         }}
//       />
//     </div>
//   );
// };

// export default CalendarComponent;
