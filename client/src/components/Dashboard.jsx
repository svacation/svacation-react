import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { Link } from 'react-router';
import {ListGroup,ListGroupItem,Button} from 'react-bootstrap';

const Dashboard = ({ 
  name,
  phone,
  email,
  wechat,
  birthday,
  address
}) => (
  <Card className="container">
    <CardTitle
      title="用户主页"
      subtitle="这里有您的个人信息和我们提供的服务"
    />
          <ListGroup>
            <ListGroupItem>姓名   : {name}</ListGroupItem>
            <ListGroupItem>电话   : {phone}</ListGroupItem>
            <ListGroupItem>email  : {email}</ListGroupItem>
            <ListGroupItem>微信  : {wechat}</ListGroupItem>
            {birthday && <ListGroupItem>产时  : {birthday}</ListGroupItem>}
            <ListGroupItem>地址  : {address}</ListGroupItem>
          </ListGroup>
      <ListGroup style={{color: 'blue' }}>
        <ListGroupItem><Link to={'/medicine'}>需要医疗服务?</Link></ListGroupItem>
        <ListGroupItem><Link to={'/food'}>管理餐饮订单?（未完成）</Link></ListGroupItem>
        <ListGroupItem><Link to={'/house'}>住房紧急维修?（未完成）</Link></ListGroupItem>
        <ListGroupItem><Link to={'/tour'}>想去哪里玩?（未完成）</Link></ListGroupItem>
        <ListGroupItem><Link to={'/certificate'}>需要办理证件?（未完成）</Link></ListGroupItem>
      </ListGroup>
  </Card>
);


export default Dashboard;
