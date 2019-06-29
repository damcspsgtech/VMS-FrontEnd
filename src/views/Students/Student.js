import React, { Component } from 'react'
import {
  Card, CardTitle, CardSubtitle, CardHeader, CardBody,
  Col, Badge, Media
} from 'reactstrap'
import parseColor from '../Colors'
import logo from '../../assets/img/6.jpg'

export default class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: props.key,
      value: props.value,
    };
  }

  render() {
    return (<React.Fragment>
      <Col xs="12" sm="6" md="4" lg="3">
        <Card className={'text-dark bg-' + parseColor(this.state.value[3])}>
          <CardHeader >
            <CardTitle>{this.props.value[1]}<Media top right className="float-right" size="10px" src={logo} alt="Hlereo" /></CardTitle>
            <CardSubtitle>
              <Badge className="float-left">{this.state.value[0]}</Badge></CardSubtitle>
          </CardHeader>
          <CardBody>
            {this.props.value[2]}
          </CardBody>
        </Card>
      </Col>
    </React.Fragment >
    );
  }
}