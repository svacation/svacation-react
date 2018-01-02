'use strict';

import React from 'react';
import { Link } from 'react-router';
import {ListGroup,ListGroupItem,Button} from 'react-bootstrap';


export default class shoppingView extends React.Component {
  render() {
    let items = "";
    let lists = this.props.shoppingList;
    for(var i = 0; i < lists.length; i++) {
        items = items + lists[i].item + " " + lists[i].numberOfItem + " ";
      }
      console.log(lists);
      console.log(items);
    return (
      <ListGroup>
            <ListGroupItem>项目   : {this.props.type}</ListGroupItem>
            <ListGroupItem>购买食材   : {items}</ListGroupItem>
            <ListGroupItem>其他服务或特殊要求   : {this.props.additional}</ListGroupItem>
            <ListGroupItem>订单提交时间  : {this.props.time}</ListGroupItem>
          </ListGroup>
    );
  }
}