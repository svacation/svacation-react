import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Button, ButtonToolbar,ToggleButton,ToggleButtonGroup} from 'react-bootstrap';

const HouseForm = ({
  onSubmit,
  onChange,
  errors,
  additional,
  time,
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">请选择您需要的维修服务</h2>
      {errors.summary && <p className="error-message">{errors.summary}</p>}
  <div>
    <ToggleButtonGroup type="radio" name = "service">
        <ToggleButton value="水" onChange={onChange}>水</ToggleButton>
        <ToggleButton value="电" onChange={onChange}>电</ToggleButton>
        <ToggleButton value="煤气" onChange={onChange}>煤气</ToggleButton>
        <ToggleButton value="其他" onChange={onChange}>其他</ToggleButton>
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

      <div className="button-line">
        <RaisedButton type="submit" label="提交" primary />
      </div>

      <CardText>申请提交后我们会尽快处理 </CardText>
    </form>
    <Button bsSize="large"><Link to={'/houserequest'}>查看已申请的服务</Link></Button>
    <h4>着急的事儿打电话 XXX-XXXX-XXXX 千万不要发微信，耽误大事儿 </h4>
  </Card>
);

HouseForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default HouseForm;

