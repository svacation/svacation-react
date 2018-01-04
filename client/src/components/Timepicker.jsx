import { DatePicker, List } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import React, { PropTypes } from 'react';
import 'antd-mobile/dist/antd-mobile.css';


const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);


export default class Datepicker extends React.Component {
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      date: now
    };
  }

  render() {
    return (
      <DatePicker
        mode="date"
        title="Select Date"
        extra="Optional"
        value={this.state.date}
        onChange={date => this.setState({ date })}
      >
        <List.Item arrow="horizontal">日期</List.Item>
      </DatePicker>
    );
  }
}