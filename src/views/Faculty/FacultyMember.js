import React, { Component } from 'react'
import {
  Card, CardTitle, CardHeader, CardBody,
  Col, Badge, Media, Button, ListGroup, ListGroupItem,
  InputGroup, InputGroupAddon, InputGroupText, ListGroupItemHeading, ListGroupItemText,
  Modal, ModalHeader, ModalFooter, ModalBody
} from 'reactstrap'
import logo from '../../assets/img/6.jpg'
export default class FacultyMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: props.key,
      value: props.value,
      info: false,
      guide: props.value[9] === 1 ? "Guide" : "Not a Guide"
    };
    this.toggle = this.toggle.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.forceUpdate();
  }
  toggle() {
    var temp = this.state.value;
    if (temp[9] === 1) {
      temp[9] = 0
      this.setState({
        value: temp,
        guide: "Not a Guide"
      });
    }
    else if (temp[9] === 0) {
      temp[9] = 1;
      this.setState({
        value: temp,
        guide: "Guide"
      });
    }
  }
  toggleInfo(e) {
    this.setState({
      info: !this.state.info,
    });
  }

  render() {
    return (<React.Fragment>
      <Col xs="12" sm="6" md="4" lg="3">
        <Card className={'text-dark bg-light'}>
          <CardHeader>
            <CardTitle className="float-right">{this.state.value[1] + this.state.value[2]}<br></br>
              <Badge className="float-left">{this.state.value[0]}</Badge></CardTitle>
            <Media top right className="float-left" size="10px" src={logo} alt="Photo" />
          </CardHeader>
          <CardBody>
            <InputGroup>
              <Button className="float-left" color="danger" onClick={this.toggle}>
                {this.state.guide}
              </Button>
              <InputGroupAddon>
                <InputGroupText>
                  Allocated: {this.state.value[10]}
                </InputGroupText>
              </InputGroupAddon>
              <Button className="float-left" color="info" onClick={this.toggleInfo}>
                Info
                </Button>
            </InputGroup>

            <br></br>
            <br></br>

          </CardBody>
        </Card>
        <Modal className="modal-info" isOpen={this.state.info} toggle={this.toggleInfo}>
          <ModalHeader className="block" toggle={this.toggleInfo}>{this.state.value[1] + this.state.value[2]}
          </ModalHeader>
          <ModalBody>
            <ListGroup>
              {this.renderItem(this.state.value)}
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleInfo}>Okay</Button>
          </ModalFooter>
        </Modal>

      </Col>
    </React.Fragment >
    );
  }
  renderItem(item) {
    return (
      <React.Fragment>
        <ListGroupItem>
          <ListGroupItemHeading>Faculty ID</ListGroupItemHeading>
          <Badge color="info"><h5>{item[0]}</h5></Badge>
        </ListGroupItem>
        <ListGroupItem >
          <ListGroupItemHeading>
            Designation
          </ListGroupItemHeading>
          <Badge color="info"><h5>{item[3]}</h5></Badge>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>
            Core Competency
          </ListGroupItemHeading>
          <Badge color="info"><h5>{item[5]}</h5></Badge>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>
            Email ID
          </ListGroupItemHeading>
          <Badge color="info"><h5>{item[6]}</h5></Badge>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>
            Areas of Interest
          </ListGroupItemHeading>
          <ListGroupItemText>{item[7]}</ListGroupItemText>
        </ListGroupItem>
      </React.Fragment >
    );

  }
}