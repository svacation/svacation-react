import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Button, ButtonToolbar,ToggleButton,ToggleButtonGroup} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Timepicker from './Timepicker.jsx';

const MedicineForm = ({
  onSubmit,
  onChange,
  errors,
  additional,
  time,
  changeDate
}
) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">请选择您需要的医疗服务</h2>
      {errors && <p className="error-message">{errors}</p>}
      <div>
        <ToggleButtonGroup type="radio" name = "service">
            <ToggleButton value="看医生" onChange={onChange}>看医生</ToggleButton>
            <ToggleButton value="住院" onChange={onChange}>住院</ToggleButton>
            <ToggleButton value="化验" onChange={onChange}>化验</ToggleButton>
            <ToggleButton value="出院" onChange={onChange}>出院</ToggleButton>
            <ToggleButton value="B超" onChange={onChange}>B超</ToggleButton>
            <ToggleButton value="其他" onChange={onChange}>其他</ToggleButton>
          </ToggleButtonGroup>
      </div>
      <CardText>选择服务时间（请至少提前一天预约 ）</CardText>
      <Card  style={{ width: 300, margin: "auto" }}>
        <Timepicker />
      </Card>

      <div className="field-line">
        <TextField
          floatingLabelText="其他服务或特殊要求"
          name="additional"
          onChange={onChange}
          value={additional}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="提交" primary />
      </div>
    </form>
      <h4>急事请打电话 XXX-XXXX-XXXX 微信有时无法及时回复 </h4>
  </Card>
);

MedicineForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MedicineForm;

