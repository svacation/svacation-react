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
        <ListGroupItem><Link to={'/medicine'}>医疗接送</Link></ListGroupItem>
        <ListGroupItem><Link to={'/food'}>餐饮订单（未完成）</Link></ListGroupItem>
        <ListGroupItem><Link to={'/house'}>住房维修</Link></ListGroupItem>
        <ListGroupItem><Link to={'/tour'}>出行接送</Link></ListGroupItem>
        <ListGroupItem><Link to={'/certificate'}>办理证件（未完成）</Link></ListGroupItem>
        <ListGroupItem><Link to={'/nurse'}>找月嫂（未完成）</Link></ListGroupItem>
      </ListGroup>
  </Card>
);


export default Dashboard;
