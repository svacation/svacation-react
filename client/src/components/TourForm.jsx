import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Button, ButtonToolbar,ToggleButton,ToggleButtonGroup,FormGroup,ControlLabel,FormControl} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';


const TourForm = ({
  onSubmit,
  onChange,
  errors,
  additional,
  time,
  people,
  source,
  destination,
  changeDate
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">请选择您需要的接送服务</h2>
      {errors && <p className="error-message">{errors}</p>}
  
  <FormGroup controlId="formControlsSelect" >
  <ControlLabel>出发地</ControlLabel>
      <FormControl componentClass="select" placeholder="select" name = "source" onChange={onChange}>
      <option></option>
        <option>家</option>
        <option>沃尔玛</option>
        <option>列治文中心</option>
        <option>COSCO</option>
        <option>奥特莱斯</option>
        <option>West Coast Kid</option>
        <option>机场</option>
      </FormControl>
    </FormGroup>

    <CardText>选择出发时间（请至少提前一天预约 ）</CardText>
    <CardText>只支持9点-17点的预约</CardText>
      <DatePicker 
      selected={time} 
      onChange={changeDate}
      showTimeSelect
      minTime={moment().hours(9).minutes(0)}
      maxTime={moment().hours(17).minutes(0)}
      timeIntervals={60}
      dateFormat="LLL"
      />


      <FormGroup controlId="formControlsSelect" >
      <ControlLabel>目的地</ControlLabel>
      <FormControl componentClass="select" placeholder="select" name = "destination" onChange={onChange}>
      <option></option>
        <option>家</option>
        <option>沃尔玛</option>
        <option>列治文中心</option>
        <option>COSCO</option>
        <option>奥特莱斯</option>
        <option>West Coast Kid</option>
        <option>机场</option>
      </FormControl>
    </FormGroup>

      <div className="field-line">
        <TextField
          floatingLabelText="几"
          name="people"
          onChange={onChange}
          value={people}
          style = {{width: 30}}
        />
        人同行
      </div>
      
      <div className="field-line">
        <TextField
          floatingLabelText="备注 (没有可不填)"
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

TourForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TourForm;

