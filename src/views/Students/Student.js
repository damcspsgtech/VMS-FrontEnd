import React, { Component } from 'react'
import {
  Card, CardTitle, CardHeader, CardBody, Button,
  Col, Badge, Media, Modal, ModalHeader, ModalFooter, ModalBody, ListGroupItemText,
  ListGroup, ListGroupItem, ListGroupItemHeading,
} from 'reactstrap';
import parseColor from '../Colors';
import placeholder_img from '../../assets/img/avatars/user-placeholder.png';
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
    const imageSize = {
      maxHeight: 64,
      maxWidth: 64,
    }
    console.log((this.props.student));
    return (
      <Col xs="12" sm="6" md="4" lg="3" className="animated fadeIn">
        <Link className="text-decoration-none text-muted:hover" onClick={this.toggleInfo}>
          <Card >
            <CardHeader>
              <CardTitle color={parseColor(this.props.student.Batch.color)} className={"float-right text-dark"}>
                {this.props.student.name}<br></br>
                <h3><Badge color={parseColor(this.props.student.Batch.color)} className="float-right">{this.props.student.roll_no}</Badge></h3>
              </CardTitle>
              <Media className="float-left" style={imageSize} src={placeholder_img} alt="Photo" />
            </CardHeader>
            <CardBody className={'bg-secondary'}>
              <h3>
                <Badge color="dark">{this.props.student.Guide.id === 'admin' ? 'Guide' : this.props.student.Guide.name}</Badge>&nbsp;
                  <Badge color={parseColor(this.props.student.Batch.color)}>{this.props.student.address_city === null ? 'City' : this.props.student.address_city}</Badge>&nbsp;
                  <Badge color="light">{this.props.student.project_category}</Badge>&nbsp;
                </h3>
            </CardBody>
          </Card>
        </Link>
        <Modal className={"modal-" + parseColor(this.props.student.Batch.color)} isOpen={this.state.info} toggle={this.toggleInfo}>
          <ModalHeader toggle={this.toggleInfo}>
            {this.props.student.name}&nbsp;
              <h3><Badge color="dark">
              {this.props.student.roll_no}
            </Badge>
              <Badge>
                {this.props.student.project_category}
              </Badge></h3>
          </ModalHeader>
          <ModalBody>
            <ListGroup>
              {this.renderItems()}
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button color={parseColor(this.props.student.Batch.color)} onClick={this.toggleInfo}>Okay</Button>
          </ModalFooter>
        </Modal>
      </Col>
    );
  }

  renderItems() {
    return (
      <div class="animated fadeIn">
        <ListGroupItem>
          <ListGroupItemHeading>
            Project Title
          </ListGroupItemHeading>
          <ListGroupItemText>
            {this.props.student.project_title}
          </ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>
            Project Domain
          </ListGroupItemHeading>
          <ListGroupItemText>
            {this.props.student.project_domain_keywords}
          </ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>
            Student Email
          </ListGroupItemHeading>
          <ListGroupItemText>
            {this.props.student.email}
          </ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>
            Phone Number
          </ListGroupItemHeading>
          <ListGroupItemText>
            {this.props.student.phone_number}
          </ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>
            Organization
          </ListGroupItemHeading>
          <ListGroupItemText>
            {this.props.student.organization_name}
          </ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>
            Mentor Name
          </ListGroupItemHeading>
          <ListGroupItemText>
            {this.props.student.mentor_name}
          </ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>
            Mentor Email
          </ListGroupItemHeading>
          <ListGroupItemText>
            {this.props.student.mentor_email}
          </ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>
            Mentor Designation
          </ListGroupItemHeading>
          <ListGroupItemText>
            {this.props.student.mentor_designation}
          </ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>
            Organization's Address
          </ListGroupItemHeading>
          <ListGroupItemText>
            <a href={this.props.student.address_url}>
              {this.props.student.postal_address}
            </a>
          </ListGroupItemText>
        </ListGroupItem>

      </div >
    );
  }
}