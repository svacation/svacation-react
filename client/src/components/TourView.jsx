'use strict';

import React from 'react';
import { Link } from 'react-router';
import {ListGroup,ListGroupItem,Button} from 'react-bootstrap';


export default class TourView extends React.Component {
  render() {
    return (
      <ListGroup>
            <ListGroupItem>项目   : {this.props.type}</ListGroupItem>
            <ListGroupItem>出发地   : {this.props.source}</ListGroupItem>
            <ListGroupItem>出发时间  : {this.props.time}</ListGroupItem>
            <ListGroupItem>目的地   : {this.props.destination}</ListGroupItem>
            <ListGroupItem>人数  : {this.props.people}</ListGroupItem>
            <ListGroupItem>备注   : {this.props.additional}</ListGroupItem>
          </ListGroup>
    );
  }
}