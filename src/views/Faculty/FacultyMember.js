import React, { Component } from 'react'
import {
  Card, CardTitle, CardHeader, CardBody, Col, Button, Badge, Media, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, ButtonGroup, Modal, ModalHeader, ModalFooter, ModalBody
} from 'reactstrap'
import { Switch, FormGroup, FormControlLabel } from '@material-ui/core';
import placeholder_img from '../../assets/img/avatars/user-placeholder.png';
import axiosInstance from '../../axiosInstance';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
let reader = new FileReader();






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
      maxWidth: 64,
      
    }

    const iconSize = {
      maxHeight: 20,
      maxWidth: 20,
      padding: 5,
    }

    return (<React.Fragment>

      <Col xs="12" sm="6" md="4" lg="3" className="animated fadeIn">
     
          <Card   outline color="secondary">
         
           <CardHeader onClick={this.toggleInfo}>
           <CardTitle  right className={"float-right"}>
            {this.props.value.title + this.props.value.name.toUpperCase()}
            <h3><Badge color="dark" className={"float-right"}>{this.props.value.id.toUpperCase()}</Badge></h3>
              
           </CardTitle>

           </CardHeader>
          
            
            <CardBody >
            
            <FormControlLabel  className="float-right text-dark" 
                  control={<Switch checked={this.state.guide} onChange={this.toggleGuide} color="primary" />}
                  label={<font color={this.state.guide ? "green":"red"}>{this.state.guide ? "Guide" : "Not a Guide"}</font>}
                  labelPlacement="top" />
             <Link className="text-decoration-none text-muted:hover" onClick={this.toggleInfo}>
            
            <Media  style={maxSize} src={(this.props.value.image_name) ?  'https://amcspsgtech.s3.amazonaws.com/faculty/photos/'+this.props.value.image_name : placeholder_img} />
         </Link>
            </CardBody>
          </Card>
      
      
        

        <Modal className="modal-primary" isOpen={this.state.info} toggle={this.toggleInfo}>
          <ModalHeader className="block" toggle={this.toggleInfo}>{this.props.value.title + this.props.value.name.toUpperCase()}
            <h3><Badge color="dark">{this.props.value.id.toUpperCase()}</Badge></h3>
          </ModalHeader>
          <ModalBody>
            <ListGroup>
              {this.renderItem(this.props.value)}
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button variant="contained" onClick={this.toggleInfo}>Okay</Button>
          </ModalFooter>
        </Modal>
        {/* </ThemeProvider> */}
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
    axiosInstance.post('/api/faculty/update', {
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