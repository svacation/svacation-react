import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Button, ButtonToolbar,ToggleButton,ToggleButtonGroup} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const NurseForm = ({
  onSubmit,
  onChange,
  errors,
  additional,
  time,
  changeDate,
  service
}
) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">请选择您需要的月嫂条件</h2>
      {errors && <p className="error-message">{errors}</p>}
      <div>
      <CardText>大概价位/天（实际会有些许差别）</CardText>
        <ToggleButtonGroup type="radio" name = "service">
            <ToggleButton value="50加币" onChange={onChange}>50加币</ToggleButton>
            <ToggleButton value="100加币" onChange={onChange}>100加币</ToggleButton>
            <ToggleButton value="150加币" onChange={onChange}>150加币</ToggleButton>
            <ToggleButton value="200加币" onChange={onChange}>100加币</ToggleButton>
            <ToggleButton value="250加币" onChange={onChange}>250加币</ToggleButton>
            <ToggleButton value="其他" onChange={onChange}>其他</ToggleButton>
          </ToggleButtonGroup>
      </div>
      <CardText>选择服务时间（请至少提前30天预约 ）</CardText>
      <DatePicker 
      selected={time} 
      onChange={changeDate} 
      />

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

NurseForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default NurseForm;

