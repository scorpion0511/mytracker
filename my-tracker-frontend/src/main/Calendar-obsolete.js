import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";

const Calendar = () =>
{
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
    
        const startOfWeek = moment(date).startOf('isoWeek');
        const endOfWeek = moment(date).endOf("isoWeek");
        const weekYear = startOfWeek.format("D") + "-" + endOfWeek.format("D") + "/" + startOfWeek.format("MM") + "/" + startOfWeek.format("YYYY");
        setSelectedDate(date);

      };
 
     return  (<DatePicker selected={selectedDate} onChange={date => handleDateChange(date)}/> );

}
export default Calendar;
