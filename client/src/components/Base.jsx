import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';
import {ListGroup,ListGroupItem,Button,Card} from 'react-bootstrap';


const Base = ({ children }) => (
  <div  style = {{"fontSize": 30}}>
    <div className="top-bar">
      <div className="top-bar-left">
        <IndexLink to="/">领事旅游</IndexLink>
      </div>

      {Auth.isUserAuthenticated() ? (
        <div className="top-bar-right">
          <Link to="/logout">登出</Link>
        </div>
      ) : (
        <div className="top-bar-right">
          <Link to="/login">登入</Link>
          <Link to="/signup">注册</Link>
        </div>
      )}
    </div>
    {children}
    <div>
      {Auth.isUserAuthenticated()&&
          <Button bsSize="lg" style = {{margin:"auto",
            display:"block"}}><Link to={'/'}>回到主页</Link></Button>}
    </div>
  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;
