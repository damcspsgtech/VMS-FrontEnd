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
          <Card className={'text-dark bg-' + parseColor(this.props.student.batches.color)}>
            <CardHeader >
              <CardTitle className="float-right">{this.props.student.name}<br></br>
                <Badge className="float-right">{this.props.student.roll_no}</Badge></CardTitle>
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
        <Modal className={"modal-" + parseColor(this.props.student.color)} isOpen={this.state.info} toggle={this.toggleInfo}>
          <ModalHeader toggle={this.toggleInfo}>
            {this.props.student.name}
          </ModalHeader>
          <ModalBody>
            <ListGroup>
              {this.renderItems()}
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button color={parseColor(this.props.student.color)} onClick={this.toggleInfo}>Okay</Button>
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
          <Badge color={parseColor(this.props.student.color)}>
            <h5>
              {this.props.student.roll_no}
            </h5>
          </Badge>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>
            Project Category
          </ListGroupItemHeading>
          <Badge color={parseColor(this.props.student.color)}>
            <h5>
              {this.props.student.project_category}
            </h5>
          </Badge>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>
            Email ID
          </ListGroupItemHeading>
          <Badge color={parseColor(this.props.student.color)}>
            <h5>
              {this.props.student.email}
            </h5>
          </Badge>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>
            Organization
          </ListGroupItemHeading>
          <Badge color={parseColor(this.props.student.color)}>
            <h5>
              {this}
            </h5>
          </Badge>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>
            Project Category
          </ListGroupItemHeading>
          <Badge color={parseColor(this.props.student.color)}>
            <h5>

            </h5>
          </Badge>
        </ListGroupItem>
      </React.Fragment>
    );
  }
}