import React, { Component } from 'react'
import { Col, Row, Button, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import EditIcon from '@material-ui/icons/Edit';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import axiosInstance from '../../../axiosInstance';
import { Fab, Badge, Grid, ListItemSecondaryAction } from '@material-ui/core';

import DatePicker from 'react-datetime-picker';


const whiteBG = {
    backgroundColor: '#fff',// borderColor: '#333'
}

const cities = ['bengaluru','chennai','coimbatore','hyderabad','mumbai','pune'];


export default class StudentProjectForm extends Component {
    constructor(props) {
        super(props);

        this.state = {


            project_category: 'industry',
            organization_name: '',
            addressLine1: '',
            addressLine2: '',
            city: 'bengaluru',
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

            edit_state: false,
        }
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
                    let res_city= cities.includes(res.data.studentInfo.city)?
                    {city:res.data.studentInfo.city ,
                    other_city:''}:
                    {city:'others',
                    other_city:res.data.studentInfo.city}
                    this.setState({

                        project_category: res.data.studentInfo.project_category,
                        organization_name: res.data.studentInfo.organization_name,
                        addressLine1: res.data.studentInfo.addressLine1,
                        addressLine2: res.data.studentInfo.addressLine2,
                        city:res_city.city,
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

                    });

                }
                else if (res.data.result === 'failed') {
                    this.setState({ edit_state: true })

                }
                else {
                    toast('Failed To Fetch Details')

                }
            })
            .catch((error) => {
                toast('error' + error)
            })

    }

    render() {
        let item = []
        return (
            <Row>

                <Col xs={12}>
                    {/* <Fab color="primary" size="small" style={{ float: "right" }} disabled={this.state.edit_state} onClick={this.handleEdit}><EditIcon /></Fab> */}

                    <Form>
                        <Grid container spacing={5}
                            direction="row"
                            justify="center"
                            alignItems="center">
                            <Grid item xs="6">
                                <Row form>
                                    <Col>
                                        <FormGroup>
                                            <Label>Project Title</Label>
                                            <Input disabled={!this.state.edit_state} value={this.state.project_title} invalid={this.state.onSubmit && !this.state.project_title} style={whiteBG} type="text" name="project_title" id="project_title" placeholder="title" onChange={this.handleChange} />
                                            <FormFeedback invalid>
                                                This field can't be empty!
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>Category</Label>
                                            <Input disabled={!this.state.edit_state} style={whiteBG}  type="select" name="project_category" id="project_category" onChange={this.handleChange} >
                                             <option value='industry' name="project_category" selected={this.state.project_category === 'industry'}>INDUSTRY</option>
                                                <option value='institute' name="project_category" selected={this.state.project_category === 'institute'}>INSTITUTE</option>
                                                
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row form>
                                    <Col>
                                        <FormGroup>
                                            <Label>Name of the Organization</Label>
                                            <Input disabled={!this.state.edit_state} value={this.state.organization_name} invalid={this.state.onSubmit && !this.state.organization_name} type="text" name="organization_name" id="organization_name" style={whiteBG} placeholder="company name" onChange={this.handleChange.bind(this)} />
                                            <FormFeedback invalid>
                                                This field can't be empty!
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row form>
                                    <Col>
                                        <FormGroup>
                                            <Label>Door/Building/Floor no</Label>
                                            <Input disabled={!this.state.edit_state} value={this.state.addressLine1} invalid={this.state.onSubmit && !this.state.addressLine1} type="text" name="addressLine1" id="addressLine1" style={whiteBG} placeholder={"123 xxxx"} onChange={this.handleChange.bind(this)} />
                                            <FormFeedback invalid>
                                                This field can't be empty!
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col>
                                        <FormGroup>
                                            <Label>Street name</Label>
                                            <Input disabled={!this.state.edit_state} value={this.state.addressLine2} invalid={this.state.onSubmit && !this.state.addressLine2} type="text" name="addressLine2" id="addressLine2" style={whiteBG} placeholder={"yyy"} onChange={this.handleChange.bind(this)} />
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
                                            <Input disabled={!this.state.edit_state} style={whiteBG}  type="select" name="city" id="city" onChange={this.handleChange} >
                                               
                                               {cities.forEach((city)=> item.push(<option value={city} name="city" selected={this.state.city === city}>{city.toUpperCase()}</option>))}
                                               {item}
                                                <option value='others' name="city" selected={'others' === this.state.city}>OTHERS</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    {this.state.city==='others'?(
                                    <Col md = {6}>
                                        <FormGroup>
                                            <Label>If Others Please Specify</Label>
                                            <Input disabled={!this.state.edit_state} value={this.state.other_city} invalid={this.state.onSubmit && !this.state.other_city} style={whiteBG} type="text" name="other_city" id="other_city" placeholder="city" onChange={this.handleChange.bind(this)} />
                                            <FormFeedback invalid>
                                                This field can't be empty!
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>):<div/>}

                                </Row>

                                <Row form>
                                 <Col md={4}>
                                        <FormGroup>
                                            <Label>state</Label>
                                            <Input disabled={!this.state.edit_state} value={this.state.state} invalid={this.state.onSubmit && !this.state.state} style={whiteBG} type="text" name="state" id="state" placeholder="state" onChange={this.handleChange.bind(this)} />
                                            <FormFeedback invalid>
                                                This field can't be empty!
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>country</Label>
                                            <Input disabled={!this.state.edit_state} value={this.state.country} invalid={this.state.onSubmit && !this.state.country} style={whiteBG} type="text" name="country" id="country" placeholder="country" onChange={this.handleChange.bind(this)} />
                                            <FormFeedback invalid>
                                                This field can't be empty!
                                            </FormFeedback>
                                        </FormGroup>

                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label>zip</Label>
                                            <Input disabled={!this.state.edit_state} value={this.state.zip} invalid={this.state.onSubmit && !this.state.zip} style={whiteBG} type="text" name="zip" id="zip" placeholder="zip" onChange={this.handleChange.bind(this)} />
                                            <FormFeedback invalid>
                                                This field can't be empty!
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>

                                </Row>

                            </Grid>
                            <Grid item xs={6}>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label>Short URL for Google Map/Location of the Company</Label>
                                            <Input disabled={!this.state.edit_state} value={this.state.address_url} invalid={this.state.onSubmit && !this.state.address_url} style={whiteBG} type="text" name="address_url" id="address_url" placeholder="http://" onChange={this.handleChange.bind(this)} />
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
                                            <Input disabled={!this.state.edit_state} value={this.state.mentor_name} invalid={this.state.onSubmit && !this.state.mentor_name} style={whiteBG} type="text" name="mentor_name" id="mentor_name" onChange={this.handleChange.bind(this)} />
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
                                            <Input disabled={!this.state.edit_state} value={this.state.mentor_designation} invalid={this.state.onSubmit && !this.state.mentor_designation} style={whiteBG} type="text" name="mentor_designation" id="mentor_designation" onChange={this.handleChange.bind(this)} />
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
                                            <Input disabled={!this.state.edit_state} value={this.state.mentor_email}  style={whiteBG} type="email" name="mentor_email" id="mentor_email" onChange={this.handleChange.bind(this)} />
                                            <FormText>optional</FormText>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label>Project Domain</Label>
                                            <Input disabled={!this.state.edit_state} value={this.state.project_domain} invalid={this.state.onSubmit && !this.state.project_domain} style={whiteBG} type="text" name="project_domain" id="project_domain" placeholder="Web designing/Full Stack" onChange={this.handleChange.bind(this)} />
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



                                            <Input dateFormat={'dd/mm/yyyy'} disabled={!this.state.edit_state} invalid={this.state.onSubmit && !this.state.joined_date} value={(this.state.joined_date !== null) ? this.state.joined_date.substr(0, 10) : ''} style={whiteBG} type="date" name="joined_date" id="joined_date" onChange={this.handleChange.bind(this)} />
                                            <FormFeedback invalid>
                                                This field can't be empty!
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Grid>
                        </Grid>

                        <div style={{ marginTop: 10 }}>
                            {this.state.edit_state ?
                                (<Row>
                                    <Col sm={{ size: 'auto', offset: 4 }}>
                                        <FormGroup>
                                            <Button color="danger" onClick={this.handleReset}>Reset</Button>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={{ size: 'auto', offset: 4 }}>
                                        <FormGroup>
                                            <Button color="success" onClick={this.handleSubmit}>Done</Button>
                                        </FormGroup>
                                    </Col>
                                </Row>) : ''}
                        </div>
                    </Form>
                </Col>
            </Row>
        );


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

        });

    }

    checkValid() {
        if (!this.state.project_category ||
            !this.state.organization_name ||
            !this.state.addressLine1 ||
            !this.state.addressLine2 ||
            !this.state.city ||
            !this.state.state ||
            (this.state.city=='others' && !this.state.other_city) ||
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

        let req_data=this.state;
        if(this.state.city==='others'){
            req_data.city = this.state.other_city
        }
        delete req_data.other_city;

        if (this.checkValid()) {
            axiosInstance.post('/api/students/addProjectDetails', { id: (JSON.parse(Cookies.get("session")).id), roll_no: (JSON.parse(Cookies.get("session")).userName), batch_id: (JSON.parse(Cookies.get("session")).batch), projectInfo: req_data })
                .then((res) => {
                   
                    if (res.data.result === 'success') {

                        toast('Project Details Uploaded Successfully!')
                        this.setState({
                            edit_state: false
                        });

                    }
                    else {
                        toast('Failed To upload Details, Try later!')

                    }
                })
                .catch((error) => {
                    toast('error' + error)
                })
        }


    }
    handleDateChange(event) {
        this.setState({ joined_date: (event.target.value) })
    }

    handleChange(event) {

        this.setState({ [event.target.name]: (event.target.value).toLowerCase() });

    }

}




