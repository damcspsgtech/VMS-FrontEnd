import React, { Component } from 'react'
import {
  Card, CardTitle, CardHeader, CardBody, Button,
  Col, Badge, Media, Modal, ModalHeader, ModalFooter, ModalBody,
  ListGroup, ListGroupItem, ListGroupItemHeading, InputGroup, InputGroupAddon,
} from 'reactstrap'
import parseColor from '../Colors'
import logo from '../../assets/img/6.jpg'
import { Link } from 'react-router-dom'


export default class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: props.key,
      value: props.value,
      info: false,
    };
    this.toggleInfo = this.toggleInfo.bind(this);
    this.renderItems = this.renderItems.bind(this);
  }

  toggleInfo() {
    this.setState({
      info: !this.state.info
    });
  }
  render() {
    return (<React.Fragment>
      <Col xs="12" sm="6" md="4" lg="3">
        <Link className="text-decoration-none text-muted:hover" onClick={this.toggleInfo} >
          <Card className={'text-dark bg-' + parseColor(this.state.value[3])}>
            <CardHeader >
              <CardTitle className="float-right">{this.props.value[1]}<br></br>
                <Badge className="float-right">{this.state.value[0]}</Badge></CardTitle>
              <Media top right className="float-left" size="10px" src={logo} alt="Photo" />
            </CardHeader>
            <CardBody>
              <InputGroup>
                <InputGroupAddon>
                  Report Status
                </InputGroupAddon>
                <Button disabled>
                  Pending
                </Button>
              </InputGroup>
            </CardBody>
          </Card>
        </Link>
        <Modal className={"modal-" + parseColor(this.state.value[3])} isOpen={this.state.info} toggle={this.toggleInfo}>
          <ModalHeader toggle={this.toggleInfo}>
            {this.state.value[1]}
          </ModalHeader>
          <ModalBody>
            <ListGroup>
              {this.renderItems()}
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button color={parseColor(this.state.value[3])} onClick={this.toggleInfo}>Okay</Button>
          </ModalFooter>
        </Modal>
      </Col>
    </React.Fragment >
    );
  }

  renderItems() {
    return (
      <React.Fragment>
        <ListGroupItem>
          <ListGroupItemHeading>
            Roll Number
          </ListGroupItemHeading>
          <Badge color={parseColor(this.state.value[3])}>
            <h5>
              {this.state.value[0]}
            </h5>
          </Badge>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>
            Project Category
          </ListGroupItemHeading>
          <Badge color={parseColor(this.state.value[3])}>
            <h5>

            </h5>
          </Badge>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>
            Email ID
          </ListGroupItemHeading>
          <Badge color={parseColor(this.state.value[3])}>
            <h5>

            </h5>
          </Badge>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>
            Organization
          </ListGroupItemHeading>
          <Badge color={parseColor(this.state.value[3])}>
            <h5>

            </h5>
          </Badge>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>
            Project Category
          </ListGroupItemHeading>
          <Badge color={parseColor(this.state.value[3])}>
            <h5>

            </h5>
          </Badge>
        </ListGroupItem>
      </React.Fragment>
    );
  }
}