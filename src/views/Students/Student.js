import React, { Component } from 'react'
import {
  Card, CardTitle, CardHeader, CardBody,
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
            <CardTitle className="float-right">{this.props.value[1]}<br></br>
              <Badge className="float-right">{this.state.value[0]}</Badge></CardTitle>
            <Media top right className="float-left" size="10px" src={logo} alt="Photo" />
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