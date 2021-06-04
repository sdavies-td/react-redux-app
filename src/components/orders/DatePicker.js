import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";

export default function MaterialUIPickers(props) {
  const { handleDate } = props;
  const date = moment(new Date()).format("L");
  const [selectedDate, setSelectedDate] = React.useState(date);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    handleDate(moment(date));
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        autoOk
        format="dd/MM/yyyy"
        id="orderDate"
        label="Order Date"
        value={selectedDate}
        onChange={handleDateChange}
        variant="inline"
        fullWidth
        required
      />
    </MuiPickersUtilsProvider>
  );
}
