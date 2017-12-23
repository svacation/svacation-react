import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { Link } from 'react-router';

const Dashboard = ({ 
  secretData
}) => (
  <Card className="container">
    <CardTitle
      title="主页"
      subtitle="服务内容只有登录用户才能看到"
    />

    {secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{secretData}
      <CardText>需要医疗服务? <Link to={'/medicine'}>医</Link>.</CardText>
      <CardText>管理餐饮订单? <Link to={'/food'}>食</Link>.</CardText>
      <CardText>住房紧急维修? <Link to={'/house'}>住</Link>.</CardText>
      <CardText>想去哪里玩? <Link to={'/tour'}>行</Link>.</CardText>
      <CardText>需要办理证件? <Link to={'/certificate'}>证</Link>.</CardText>
    </CardText>}
    
  </Card>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Dashboard;
