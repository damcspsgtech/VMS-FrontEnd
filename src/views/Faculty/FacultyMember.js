import React, { Component } from 'react'
import {
  Card, CardTitle, CardHeader, CardBody, Col, Badge, Media, Button, ListGroup, ListGroupItem,
  InputGroup, InputGroupAddon, InputGroupText, ListGroupItemHeading, ListGroupItemText, ButtonGroup,
  Modal, ModalHeader, ModalFooter, ModalBody
} from 'reactstrap'
import placeholder_img from '../../assets/img/avatars/user-placeholder.png';
import axios from 'axios';
import { toast } from 'react-toastify';

export default class FacultyMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: false,
      id: this.props.value.id,
      guide: this.props.value.is_guide,
    };
    this.toggleGuide = this.toggleGuide.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

  }

  componentDidUpdate(prevProps) {
    if (this.props.value.id !== prevProps.value.id) {
      this.setState({
        id: this.props.value.id,
        guide: this.props.value.is_guide,
      })
    }
  }

  render() {
    const maxSize = {
      maxHeight: 64,
      maxWidth: 64
    }
    return (<React.Fragment>
      <Col xs="12" sm="6" md="4" lg="3" className="animated fadeIn">
        <Card>
          <CardHeader>
            <CardTitle className="float-right">
              {this.props.value.title + this.props.value.name}<br></br>
              <h3>
                <Badge color="dark" className="float-right">
                  {this.props.value.id}
                </Badge>
              </h3>
            </CardTitle>
            <Media top right className="float-left" style={maxSize} src={placeholder_img} alt="Photo" />
          </CardHeader>
          <CardBody color="secondary">
            <InputGroup>
              <InputGroupAddon className="float-left">
                <h4>
                  <Badge>
                    {this.props.value.designation}
                  </Badge>
                </h4>
              </InputGroupAddon>
              <InputGroupAddon className="float-right">

              </InputGroupAddon>
            </InputGroup>
            <ButtonGroup className="float-right">
              <Button outline active={this.state.guide} className="float-right" color="danger" onClick={this.toggleGuide}>
                {this.state.guide ? 'Guide' : 'Not a Guide'}
              </Button>
              <Button className="float-right" color="info" onClick={this.toggleInfo}>
                Information
                </Button>
            </ButtonGroup>
          </CardBody>
        </Card>
        <Modal className="modal-primary" isOpen={this.state.info} toggle={this.toggleInfo}>
          <ModalHeader className="block" toggle={this.toggleInfo}>{this.props.value.title + this.props.value.name}
            <h3><Badge color="dark">{this.props.value.id}</Badge></h3>
          </ModalHeader>
          <ModalBody>
            <ListGroup>
              {this.renderItem(this.props.value)}
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
      <div class="animated fadeIn">
        <ListGroupItem >
          <ListGroupItemHeading>
            Designation
          </ListGroupItemHeading>
          <h4><Badge color="info">{item.designation}</Badge></h4>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>
            Core Competency
          </ListGroupItemHeading>
          <h4><Badge color="info">{item.core_competency}</Badge></h4>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>
            Email ID
          </ListGroupItemHeading>
          <h4><Badge color="info">{item.email}</Badge></h4>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>
            Areas of Interest
          </ListGroupItemHeading>
          <ListGroupItemText>{item.areas_of_interest}</ListGroupItemText>
        </ListGroupItem>
      </div>
    );
  }

  async toggleGuide() {
    await this.setState({
      guide: !this.state.guide,
    })
    this.handleUpdate();
  }
  toggleInfo(e) {
    this.setState({
      info: !this.state.info,
    });
  }

  handleUpdate() {
    axios.post('/api/faculty/update', {
      id: this.state.id,
      is_guide: this.state.guide,
    })
      .then((res) => {
        if (res.data.result === 'success') {
          toast.success('Updated faculty information!')
          this.props.updateFaculty();
        }
      })
  }
}