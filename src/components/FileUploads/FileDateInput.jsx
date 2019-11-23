import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

const FileDateInput = ({onAddFileDate, dateInput}) => {
  return (
    <div>
      <p>Please type a day:</p>
      <DayPickerInput
        dayPickerProps={{
          todayButton: 'Today',
        }}
        selectedDays={dateInput() | undefined}
        onDayChange={day => onAddFileDate(day)}
        clickUnselectsDay={true}
        />
    </div>
  )
}

export default FileDateInput
