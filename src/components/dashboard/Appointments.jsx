import { Box } from "@mui/material"
import { styled } from "@mui/styles"
import React, { useState } from "react"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Appointments = ()=>{

    const [selectedDate, setSelectedDate] = useState(null);
    const [bookedDates, setBookedDates] = useState([]);

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  
    const handleBookAppointment = () => {
      if (selectedDate) {
        // Check if the selected date is already booked
        if (bookedDates.includes(selectedDate.toDateString())) {
          alert('This date is already booked. Please choose another date.');
          return;
        }
  
        // Update the list of booked dates
        setBookedDates([...bookedDates, selectedDate.toDateString()]);
  
        // Perform booking logic here (e.g., send to backend)
        alert(`Appointment booked for ${selectedDate}`);
      } else {
        alert('Please select a date for the appointment.');
      }
    };

    return(
        <Container>
            <Wrapper>appointments</Wrapper>
            <div>
      <h2>Book an Appointment</h2>
      <div className="date-picker-container">
        <DatePicker
                   selected={selectedDate}
                   onChange={handleDateChange}
                   showTimeSelect
                   dateFormat="MMMM d, yyyy h:mm aa"
                   timeIntervals={15}
                   minDate={new Date()} // Set minimum date to today
                   excludeDates={bookedDates.map((date) => new Date(date))}
        />
      </div>
      <button onClick={handleBookAppointment}>Book Appointment</button>
    </div>
        </Container>
    )
}

export default Appointments

const Container = styled(Box)({
    width:"100%",
    display:"flex",
    justifyContent:"flex-end"
})
const Wrapper = styled(Box)({
    width:"80%"
})
// const Container = styled(Box)({})