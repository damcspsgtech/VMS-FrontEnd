import React, { Component } from 'react'
import {
  Row, Col, Button, ButtonGroup,
  Input, InputGroup, InputGroupAddon, InputGroupText,
  Card, CardHeader, CardBody, Collapse
} from 'reactstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

export default class GenericSettings extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.toggleCollapseForm = this.toggleCollapseForm.bind(this);
    this.toggleCollapseSheet = this.toggleCollapseSheet.bind(this);

    this.state = {
      count: 0,
      student_form: 'https://docs.google.com/forms',
      faculty_form: 'https://docs.google.com/forms',
      report_form: 'https://docs.google.com/forms',
      examiner_form: 'https://docs.google.com/forms',
      student_sheet: 'https://docs.google.com/sheets',
      faculty_sheet: 'https://docs.google.com/sheets',
      report_sheet: 'https://docs.google.com/sheets',
      examiner_sheet: 'https://docs.google.com/sheets',

      collapseForm: false,
      collapseSheet: false,
    };
  }

  componentDidMount() {
    axios.get('/api/settings/')
      .then((res) => {
        this.setState({
          count: res.data.count,
          student_form: res.data.student_form,
          faculty_form: res.data.faculty_form,
          report_form: res.data.report_form,
          examiner_form: res.data.examiner_form,
          student_sheet: res.data.student_sheet,
          faculty_sheet: res.data.faculty_sheet,
          report_sheet: res.data.report_sheet,
          examiner_sheet: res.data.examiner_sheet
        });
      })
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>Configure Generic Settings</CardHeader>
              <CardBody>
                <div className="animated fadeIn">
                  <Card>
                    <CardHeader>
                      <InputGroup>
                        <InputGroupAddon>
                          <InputGroupText>Update</InputGroupText>
                        </InputGroupAddon>
                        <InputGroupAddon>
                          <ButtonGroup>
                            <Button color="primary" onClick={this.toggleCollapseForm} className={'mb-1'} id="toggleCollapseForms">Google Forms</Button>
                            <Button color="success" onClick={this.toggleCollapseSheet} className={'mb-1'} id="toggleCollapseForms">Google Sheets</Button>
                          </ButtonGroup>
                        </InputGroupAddon>
                      </InputGroup>
                    </CardHeader>
                    <Collapse isOpen={this.state.collapseForm}>
                      <div className="animated fadeIn">
                        <CardBody>
                          <InputGroup>
                            <InputGroupAddon>
                              <InputGroupText>Student Details Form Link</InputGroupText>
                            </InputGroupAddon>
                            <Input name="stud_form" value={this.state.student_form} onChange={this.handleChange.bind(this)} />
                          </InputGroup>
                          <br></br>
                          <InputGroup>
                            <InputGroupAddon>
                              <InputGroupText>Student Report Form Link</InputGroupText>
                            </InputGroupAddon>
                            <Input name="report_form" value={this.state.report_form} onChange={this.handleChange.bind(this)} />
                          </InputGroup>
                          <br></br>
                          <InputGroup>
                            <InputGroupAddon>
                              <InputGroupText>Faculty Details Form Link</InputGroupText>
                            </InputGroupAddon>
                            <Input name="faculty_form" value={this.state.faculty_form} onChange={this.handleChange.bind(this)} />
                          </InputGroup>
                          <br></br>
                          <InputGroup>
                            <InputGroupAddon>
                              <InputGroupText>Examiner Details Form Link</InputGroupText>
                            </InputGroupAddon>
                            <Input name="examiner_form" value={this.state.examiner_form} onChange={this.handleChange.bind(this)} />
                          </InputGroup>
                        </CardBody>
                      </div>
                    </Collapse>
                    <Collapse isOpen={this.state.collapseSheet}>
                      <div className="animated fadeIn">
                        <CardBody>
                          <InputGroup>
                            <InputGroupAddon>
                              <InputGroupText>Student Details Sheet Link</InputGroupText>
                            </InputGroupAddon>
                            <Input name="stud_sheet" value={this.state.student_sheet} onChange={this.handleChange.bind(this)} />
                          </InputGroup>
                          <br></br>
                          <InputGroup>
                            <InputGroupAddon>
                              <InputGroupText>Student Report Sheet Link</InputGroupText>
                            </InputGroupAddon>
                            <Input name="report_sheet" value={this.state.report_sheet} onChange={this.handleChange.bind(this)} />
                          </InputGroup>
                          <br></br>
                          <InputGroup>
                            <InputGroupAddon>
                              <InputGroupText>Faculty Details Sheet Link</InputGroupText>
                            </InputGroupAddon>
                            <Input name="faculty_sheet" value={this.state.faculty_sheet} onChange={this.handleChange.bind(this)} />
                          </InputGroup>
                          <br></br>
                          <InputGroup>
                            <InputGroupAddon>
                              <InputGroupText>Examiner Details Sheet Link</InputGroupText>
                            </InputGroupAddon>
                            <Input name="examiner_sheet" value={this.state.examiner_sheet} onChange={this.handleChange.bind(this)} />
                          </InputGroup>
                        </CardBody>
                      </div>
                    </Collapse>
                  </Card>
                  <InputGroup>
                    <InputGroupAddon>
                      <ButtonGroup>
                        <Button onClick={this.handleSubmit}>Update Generic Settings</Button>
                        <Button color="danger" onClick={this.handleReset}>Reset</Button>
                      </ButtonGroup>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment >
    );
  }

  toggleCollapseForm() {
    if (this.state.collapseSheet) {
      this.toggleCollapseSheet();
    }
    this.setState({ collapseForm: !this.state.collapseForm });
  }

  toggleCollapseSheet() {
    if (this.state.collapseForm) {
      this.toggleCollapseForm();
    }
    this.setState({ collapseSheet: !this.state.collapseSheet });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit() {
    axios.post('/api/settings/', {
      student_form: this.state.stud_form,
      report_form: this.state.report_form,
      faculty_form: this.state.faculty_form,
      examiner_form: this.state.examiner_form,
      student_sheet: this.state.stud_sheet,
      report_sheet: this.state.report_sheet,
      faculty_sheet: this.state.faculty_sheet,
      examiner_sheet: this.state.examiner_sheet,
    })
      .then()
      .catch()
  }
  handleReset() {
    this.setState({
      count: 0,
      student_form: 'https://docs.google.com/forms',
      faculty_form: 'https://docs.google.com/forms',
      report_form: 'https://docs.google.com/forms',
      examiner_form: 'https://docs.google.com/forms',
      student_sheet: 'https://docs.google.com/sheets',
      faculty_sheet: 'https://docs.google.com/sheets',
      report_sheet: 'https://docs.google.com/sheets',
      examiner_sheet: 'https://docs.google.com/sheets',

      collapseForm: false,
      collapseSheet: false,
    });
    toast('Reset Complete!');
  }
}