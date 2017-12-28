import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">注册</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="用户名"
          name="name"
          errorText={errors.name}
          onChange={onChange}
          value={user.name}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="电话"
          name="phone"
          errorText={errors.phone}
          onChange={onChange}
          value={user.phone}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Email"
          name="email"
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="密码"
          type="password"
          name="password"
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="微信"
          type="wechat"
          name="wechat"
          onChange={onChange}
          errorText={errors.wechat}
          value={user.wechat}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="产时（没有可不填）"
          type="birthday"
          name="birthday"
          onChange={onChange}
          errorText={errors.birthday}
          value={user.birthday}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="创建账户" primary />
      </div>

      <CardText>已经有账户了? <Link to={'/login'}>登入</Link></CardText>
    </form>
  </Card>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;

