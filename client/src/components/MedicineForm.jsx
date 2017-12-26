import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Button, ButtonToolbar,ToggleButton,ToggleButtonGroup} from 'react-bootstrap';

const MedicineForm = ({
  onSubmit,
  onChange,
  errors,
  additional,
  time,
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">请选择您需要的医疗服务</h2>
      {errors.summary && <p className="error-message">{errors.summary}</p>}
  <div>
    <ToggleButtonGroup type="radio" name = "service">
        <ToggleButton value="看医生" onChange={onChange}>看医生</ToggleButton>
        <ToggleButton value="住院" onChange={onChange}>住院</ToggleButton>
        <ToggleButton value="化验" onChange={onChange}>化验</ToggleButton>
        <ToggleButton value="出院" onChange={onChange}>出院</ToggleButton>
        <ToggleButton value="B超" onChange={onChange}>B超</ToggleButton>
      </ToggleButtonGroup>
  </div>
      


      <div className="field-line">
        <TextField
          floatingLabelText="备注 (没有可不填)"
          name="additional"
          onChange={onChange}
          value={additional}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="几"
          name="time"
          onChange={onChange}
          errorText={errors.time}
          value={time}
          style = {{width: 30}}
        />
        天后需要服务（例如：明天填 1，后天填 2）
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="提交" primary />
      </div>

      <CardText>请至少提前一天预约 </CardText>
    </form>
    <Button bsSize="large"><Link to={'/medicalrequest'}>查看已预定的服务</Link></Button>
  </Card>
);

MedicineForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default MedicineForm;

