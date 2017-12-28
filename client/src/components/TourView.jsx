'use strict';

import React from 'react';
import { Link } from 'react-router';
import {ListGroup,ListGroupItem,Button} from 'react-bootstrap';


export default class TourView extends React.Component {
  render() {
    return (
      <ListGroup>
            <ListGroupItem>项目   : {this.props.service}</ListGroupItem>
            <ListGroupItem>备注   : {this.props.additional}</ListGroupItem>
            <ListGroupItem>时间  : {this.props.time}</ListGroupItem>
            <ListGroupItem>人数  : {this.props.people}</ListGroupItem>
          </ListGroup>
    );
  }
}