import React, { Component } from 'react'
import { Col, Row, Button, Form, Spinner, FormGroup, Label, Input, FormFeedback, FormText, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import EditIcon from '@material-ui/icons/Edit';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import axiosInstance from '../../../axiosInstance';
import { Fab, Badge, Grid, Typography} from '@material-ui/core';

import DatePicker from 'react-datetime-picker';


const whiteBG = {
    backgroundColor: '#fff',// borderColor: '#333'
}

const cities = ['BENGALURU', 'CHENNAI', 'COIMBATORE', 'HYDERABAD', 'MUMBAI', 'PUNE'];


export default class StudentProjectForm extends Component {
    constructor(props) {
        super(props);

        this.state = {


            project_category: 'INDUSTRY',
            organization_name: '',
            addressLine1: '',
            addressLine2: '',
            city: 'BENGALURU',
            state: '',
            other_city: '',
            country: '',
            zip: '',
            address_url: '',
            mentor_name: '',
            mentor_designation: '',
            mentor_email: '',
            project_domain: '',
            project_title: '',
            joined_date: '',

            onSubmit: false,
            submitAlert: false,

            edit_state: false,
        }
        this.handleSubmitAlert = this.handleSubmitAlert.bind(this)
        this.confirmSubmitAlert = this.confirmSubmitAlert.bind(this)
        this.handleEdit = this.handleEdit.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkValid = this.checkValid.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);

    }



    componentDidMount() {
        axiosInstance.get('/api/students/getProjectDetails/', { params: { id: (JSON.parse(Cookies.get("session")).id) } })
            .then((res) => {

                if (res.data.result === 'success') {
                    let res_city = cities.includes(res.data.studentInfo.city) ?
                        {
                            city: res.data.studentInfo.city,
                            other_city: ''
                        } :
                        {
                            city: 'OTHERS',
                            other_city: res.data.studentInfo.city
                        }
                    this.setState({

                        project_category: res.data.studentInfo.project_category,
                        organization_name: res.data.studentInfo.organization_name,
                        addressLine1: res.data.studentInfo.addressLine1,
                        addressLine2: res.data.studentInfo.addressLine2,
                        city: res_city.city,
                        state: res.data.studentInfo.state,
                        other_city: res_city.other_city,
                        country: res.data.studentInfo.country,
                        zip: res.data.studentInfo.zip,
                        address_url: res.data.studentInfo.address_url,
                        mentor_name: res.data.studentInfo.mentor_name,
                        mentor_designation: res.data.studentInfo.mentor_designation,
                        mentor_email: res.data.studentInfo.mentor_email,
                        project_domain: res.data.studentInfo.project_domain,
                        project_title: res.data.studentInfo.project_title,
                        joined_date: res.data.studentInfo.joined_date,
                        onSubmit: false,
                        submitAlert: false

                    });

                }
                else if (res.data.result === 'failed') {
                    this.setState({ edit_state: true })

                }
                else {
                    toast.error('Failed to Fetch Details, Try again later')

                }
            })
            .catch((error) => {
                toast.error('Failed to Fetch Details, Try again later')
            })

    }

    render() {
        let item = []
        return (
            <React.Fragment>
                <Row>

                    <Col xs={12}>
                        {/* <Fab color="primary" size="small" style={{ float: "right" }} disabled={this.state.edit_state} onClick={this.handleEdit}><EditIcon /></Fab> */}

                        <Form>
                            <Grid container spacing={5}
                                direction="row"
                                justify="center"
                                alignItems="center">
                                <Grid item xs="12" md={6}>
                                    <Row form>
                                        <Col>
                                            <FormGroup>
                                                <Label>Project Title</Label>
                                                <Input disabled={!this.state.edit_state} value={this.state.project_title}
                                                    invalid={this.state.onSubmit && !this.state.project_title}
                                                    style={whiteBG} type="text" name="project_title" id="project_title"
                                                    placeholder="Title" onChange={this.handleChange} />
                                                <FormFeedback invalid>
                                                    This field can't be empty!
                                            </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col sm={12} md={4}>
                                            <FormGroup>
                                                <Label>Category</Label>
                                                <Input disabled={!this.state.edit_state} style={whiteBG} type="select" name="project_category" id="project_category" onChange={this.handleChange} >
                                                    <option value='INDUSTRY' name="project_category" selected={this.state.project_category === 'INDUSTRY'}>INDUSTRY</option>
                                                    <option value='INSTITUTE' name="project_category" selected={this.state.project_category === 'INSTITUTE'}>INSTITUTE</option>

                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row form>
                                        <Col sm={12}>
                                            <FormGroup>
                                                <Label>Name of the Organization</Label>
                                                <Input disabled={!this.state.edit_state}
                                                    value={this.state.organization_name}
                                                    invalid={this.state.onSubmit && !this.state.organization_name}
                                                    type="text" name="organization_name" id="organization_name"
                                                    style={whiteBG} placeholder="Organization name" onChange={this.handleChange.bind(this)} />
                                                <FormFeedback invalid>
                                                    This field can't be empty!
                                            </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row form>
                                        <Col sm={12}>
                                            <FormGroup>
                                                <Label>Door/Building/Floor no</Label>
                                                <Input disabled={!this.state.edit_state} value={this.state.addressLine1}
                                                    invalid={this.state.onSubmit && !this.state.addressLine1}
                                                    type="text" name="addressLine1" id="addressLine1"
                                                    style={whiteBG} onChange={this.handleChange.bind(this)} />
                                                <FormFeedback invalid>
                                                    This field can't be empty!
                                            </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col>
                                            <FormGroup>
                                                <Label>Street Name</Label>
                                                <Input disabled={!this.state.edit_state} value={this.state.addressLine2}
                                                    invalid={this.state.onSubmit && !this.state.addressLine2}
                                                    type="text" name="addressLine2" id="addressLine2"
                                                    style={whiteBG} onChange={this.handleChange.bind(this)} />
                                                <FormFeedback invalid>
                                                    This field can't be empty!
                                            </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row form>

                                        <Col>
                                            <FormGroup>
                                                <Label>City</Label>
                                                <Input disabled={!this.state.edit_state} style={whiteBG} type="select" name="city" id="city" onChange={this.handleChange} >

                                                    {cities.forEach((city) => item.push(<option value={city} name="city" selected={this.state.city === city}>{city.toUpperCase()}</option>))}
                                                    {item}
                                                    <option value='OTHERS' name="city" selected={'OTHERS' === this.state.city}>OTHERS</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        {this.state.city === 'OTHERS' ? (
                                            <Col md={6} sm={12}>
                                                <FormGroup>
                                                    <Label>If Others Please Specify</Label>
                                                    <Input disabled={!this.state.edit_state} value={this.state.other_city}
                                                        invalid={this.state.onSubmit && !this.state.other_city} style={whiteBG}
                                                        type="text" name="other_city" id="other_city" placeholder="city"
                                                        onChange={this.handleChange.bind(this)} />
                                                    <FormFeedback invalid>
                                                        This field can't be empty!
                                            </FormFeedback>
                                                </FormGroup>
                                            </Col>) : <div />}

                                    </Row>

                                    <Row form>
                                        <Col sm={12} md={4}>
                                            <FormGroup>
                                                <Label>State</Label>
                                                <Input disabled={!this.state.edit_state} value={this.state.state}
                                                    invalid={this.state.onSubmit && !this.state.state}
                                                    style={whiteBG} type="text" name="state" id="state"
                                                    placeholder="State" onChange={this.handleChange.bind(this)} />
                                                <FormFeedback invalid>
                                                    This field can't be empty!
                                            </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col sm={12} md={4}>
                                            <FormGroup>
                                                <Label>Country</Label>
                                                <Input disabled={!this.state.edit_state} value={this.state.country}
                                                    invalid={this.state.onSubmit && !this.state.country} style={whiteBG} type="text"
                                                    name="country" id="country" placeholder="Country"
                                                    onChange={this.handleChange.bind(this)} />
                                                <FormFeedback invalid>
                                                    This field can't be empty!
                                            </FormFeedback>
                                            </FormGroup>

                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label>Zip</Label>
                                                <Input disabled={!this.state.edit_state} value={this.state.zip}
                                                    invalid={this.state.onSubmit && !this.state.zip}
                                                    style={whiteBG} type="text" name="zip" id="zip"
                                                    placeholder="Zip" onChange={this.handleChange.bind(this)} />
                                                <FormFeedback invalid>
                                                    This field can't be empty!
                                            </FormFeedback>
                                            </FormGroup>
                                        </Col>

                                    </Row>

                                </Grid>
                                <Grid item  xs ={12} md={6}>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label>Short URL for Google Map/Location of the Company</Label>
                                                <Input disabled={!this.state.edit_state} value={this.state.address_url}
                                                    invalid={this.state.onSubmit && !this.state.address_url} style={whiteBG}
                                                    type="text" name="address_url" id="address_url" onChange={this.handleChange.bind(this)} />
                                                <FormFeedback invalid>
                                                    This field can't be empty!
                                            </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label>Name of the Mentor</Label>
                                                <Input disabled={!this.state.edit_state} value={this.state.mentor_name}
                                                    invalid={this.state.onSubmit && !this.state.mentor_name} style={whiteBG}
                                                    type="text" name="mentor_name" id="mentor_name" onChange={this.handleChange.bind(this)} />
                                                <FormFeedback invalid>
                                                    This field can't be empty!
                                            </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label>Mentor's Designation</Label>
                                                <Input disabled={!this.state.edit_state} value={this.state.mentor_designation}
                                                    invalid={this.state.onSubmit && !this.state.mentor_designation} style={whiteBG}
                                                    type="text" name="mentor_designation" id="mentor_designation"
                                                    onChange={this.handleChange.bind(this)} />
                                                <FormFeedback invalid>
                                                    This field can't be empty!
                                            </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label>Email of the Mentor</Label>
                                                <Input disabled={!this.state.edit_state} value={this.state.mentor_email}
                                                    style={whiteBG} type="email" name="mentor_email" id="mentor_email"
                                                    onChange={this.handleChange.bind(this)} />
                                                <FormText>optional</FormText>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label>Project Domain</Label>
                                                <Input disabled={!this.state.edit_state}
                                                    value={this.state.project_domain} invalid={this.state.onSubmit && !this.state.project_domain}
                                                    style={whiteBG} placeholder={"Eg: Full Stack Development, Data Analyst"} type="text" name="project_domain" id="project_domain"
                                                    onChange={this.handleChange.bind(this)} />
                                                <FormFeedback invalid>
                                                    This field can't be empty!
                                            </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label>Joined Date</Label>



                                                <Input dateFormat={'dd/mm/yyyy'} disabled={!this.state.edit_state}
                                                    invalid={this.state.onSubmit && !this.state.joined_date} value={(this.state.joined_date !== null) ? this.state.joined_date.substr(0, 10) : ''}
                                                    style={whiteBG} type="date" name="joined_date" id="joined_date" onChange={this.handleChange.bind(this)} />
                                                <FormFeedback invalid>
                                                    This field can't be empty!
                                            </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Grid>
                            </Grid>

                            <div  style={{ marginTop: 10 }}>
                                {this.state.edit_state ?
                                    (<Row>
                                        <Col className="col-sm-auto offset-sm-1 offset-md-4">
                                            <FormGroup>
                                                <Button color="danger" onClick={this.handleReset}>Reset</Button>
                                            </FormGroup>
                                        </Col>
                                        <Col className="col-sm-auto offset-sm-1 offset-md-4">
                                            <FormGroup>
                                                <Button color="success" onClick={this.handleSubmit}>
                                                    Done</Button>
                                            </FormGroup>
                                        </Col>
                                    </Row>) : ''}
                            </div>
                        </Form>
                    </Col>
                </Row>

                <Modal isOpen={this.state.submitAlert} toggle={this.toggleInfo}>
                    <ModalHeader className="block"  toggle={this.handleSubmitAlert}>
                        <h3><Badge color="dark">Confirm</Badge></h3>
                    </ModalHeader>
                    <ModalBody style={{border:0}}>
                    <Typography align="justify" variant="body1" gutterBottom>
                        Once submitted cannot be modified. Are you sure?
                        </Typography>
                    </ModalBody>
                    <ModalFooter style={{border:0}}>
                        <Button variant="contained" onClick={this.handleSubmitAlert}>Cancel</Button>
                        <Button variant="contained"  color="primary"onClick={this.confirmSubmitAlert}>Confirm Submit</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );


    }

    handleSubmitAlert() {
        this.setState({ submitAlert: !this.state.submitAlert })
    }

    confirmSubmitAlert() {

        let req_data = this.state;
        if (this.state.city === 'OTHERS') {
            req_data.city = this.state.other_city
        }
        delete req_data.other_city;

        axiosInstance.post('/api/students/addProjectDetails', { id: (JSON.parse(Cookies.get("session")).id), roll_no: (JSON.parse(Cookies.get("session")).userName), batch_id: (JSON.parse(Cookies.get("session")).batch), projectInfo: req_data })
            .then((res) => {

                if (res.data.result === 'success') {

                    toast('Project Details Uploaded Successfully!')
                    this.setState({
                        edit_state: false
                    });
                    this.handleSubmitAlert()

                }
                else {
                    toast.error('Failed to Upload Details, Try again later!')

                }
            })
            .catch((error) => {

                toast.error('Failed to Upload Details, Try again later!')
            })

    }

    handleEdit() {
        // this.setState({
        //     edit_state: !this.state.edit_state
        // });
    }

    handleReset() {

        this.setState({

            project_category: '',
            organization_name: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            country: '',
            zip: '',
            address_url: '',
            mentor_name: '',
            mentor_designation: '',
            mentor_email: '',
            project_domain: '',
            project_title: '',
            joined_date: '',
            onSubmit: false,
        });

    }

    checkValid() {
        if (!this.state.project_category ||
            !this.state.organization_name ||
            !this.state.addressLine1 ||
            !this.state.addressLine2 ||
            !this.state.city ||
            !this.state.state ||
            (this.state.city == 'OTHERS' && !this.state.other_city) ||
            !this.state.country ||
            !this.state.zip ||
            !this.state.address_url ||
            !this.state.mentor_name ||
            !this.state.mentor_designation ||
            !this.state.project_domain ||
            !this.state.project_title ||
            !this.state.joined_date) {
            return false
        }
        return true

    }

    handleSubmit() {
        this.setState({ onSubmit: true }, this.handleUpdate)

    }

    handleUpdate() {



        if (this.checkValid()) {
            this.handleSubmitAlert()
        }


    }
    handleDateChange(event) {
        this.setState({ joined_date: (event.target.value) })
    }

    handleChange(event) {

        this.setState({ [event.target.name]: (event.target.value)});

    }

}




