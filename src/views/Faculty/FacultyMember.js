import React, { Component } from 'react'
import {
  Card, CardTitle, CardHeader, CardText, CardBody,
  Col, Badge, Media, Button, ButtonGroup
} from 'reactstrap'
import parseColor from '../Colors'
import logo from '../../assets/img/6.jpg'
import { AppSwitch } from '@coreui/react'
export default class FacultyMember extends Component {
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
        <Card className={'text-dark bg-light'}>
          < CardHeader >
            <CardTitle className="float-right">{this.props.value[1] + this.props.value[2]}<br></br>
              <Badge className="float-right">{this.state.value[0]}</Badge></CardTitle>
            <Media top right className="float-left" size="10px" src={logo} alt="Photo" />
          </CardHeader>
          <CardBody>
            <Card className={'bg-light'}>
              <CardText className="float-right">
                <AppSwitch className={'mx-1'} color={'primary'} checked label="guide" />
              </CardText>
              <CardText className="float-right">Guide</CardText>
            </Card>
            <CardText>
              {this.props.value[5]}
            </CardText>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment >
    );
  }
}