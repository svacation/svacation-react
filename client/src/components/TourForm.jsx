import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Button, ButtonToolbar,ToggleButton,ToggleButtonGroup,FormGroup,ControlLabel,FormControl} from 'react-bootstrap';

const TourForm = ({
  onSubmit,
  onChange,
  errors,
  additional,
  time,
  hour,
  people,
  source,
  destination
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">请选择您需要的接送服务</h2>
      {errors.summary && <p className="error-message">{errors.summary}</p>}
  
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

      <div className="field-line">
        <TextField
          floatingLabelText="几"
          name="time"
          onChange={onChange}
          value={time}
          style = {{width: 30}}
        />
        天后需要服务（例如：明天填 1，后天填 2）
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="几"
          name="hour"
          onChange={onChange}
          value={hour}
          style = {{width: 30}}
        />
        点大概（只提供9-17点接送预约）
      </div>

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
        人
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

      <CardText>请至少提前一天预约 </CardText>
    </form>
    <h4>着急的事儿打电话 XXX-XXXX-XXXX 千万不要发微信，耽误大事儿 </h4>
  </Card>
);

TourForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default TourForm;

