import React, { Component } from 'react'
import {
  Row, Col, Badge, Form,
  Button, ButtonGroup, Input, InputGroup, InputGroupAddon, InputGroupText,
  Card, CardHeader, CardBody, Collapse
} from 'reactstrap';
import { toast } from 'react-toastify';

export default class GenericSettings extends Component {
  constructor(props) {
    super(props);

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleCollapseForm = this.toggleCollapseForm.bind(this);
    this.toggleCollapseSheet = this.toggleCollapseSheet.bind(this);

    this.state = {
      activeSession: 'Odd',
      stud_form: 'https://docs.google.com/forms',
      intern_form: 'https://docs.google.com/forms',
      faculty_form: 'https://docs.google.com/forms',
      report_form: 'https://docs.google.com/forms',
      examiner_form: 'https://docs.google.com/forms',
      stud_sheet: 'https://docs.google.com/sheets',
      intern_sheet: 'https://docs.google.com/sheets',
      faculty_sheet: 'https://docs.google.com/sheets',
      report_sheet: 'https://docs.google.com/sheets',
      examiner_sheet: 'https://docs.google.com/sheets',

      collapseForm: false,
      collapseSheet: false,
    };
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
                  <Form>
                    <Card>
                      <CardHeader>
                        <InputGroup>
                          <InputGroupAddon addonType="append">
                            <InputGroupText>Session</InputGroupText>
                          </InputGroupAddon>
                          <InputGroupAddon addonType="append">
                            <ButtonGroup>
                              <Button outline color="danger" onClick={() => this.onRadioBtnClick('Odd')} active={this.state.activeSession === 'Odd'}>Odd</Button>
                              <Button outline color="danger" onClick={() => this.onRadioBtnClick('Even')} active={this.state.activeSession === 'Even'}>Even</Button>
                            </ButtonGroup>
                          </InputGroupAddon>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText><Badge color="danger">{this.state.activeSession}</Badge></InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                        <br></br>
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
                        <CardBody>
                          <InputGroup>
                            <InputGroupAddon>
                              <InputGroupText>Student Details Form Link</InputGroupText>
                            </InputGroupAddon>
                            <Input name="stud_form" value={this.state.stud_form} onChange={this.handleChange.bind(this, 'stud_form')} />
                          </InputGroup>
                          <br></br>
                          <InputGroup>
                            <InputGroupAddon>
                              <InputGroupText>Student Report Form Link</InputGroupText>
                            </InputGroupAddon>
                            <Input name="report_form" value={this.state.report_form} onChange={this.handleChange.bind(this, 'report_form')} />
                          </InputGroup>
                          <br></br>
                          <InputGroup>
                            <InputGroupAddon>
                              <InputGroupText>Faculty Details Form Link</InputGroupText>
                            </InputGroupAddon>
                            <Input name="faculty_form" value={this.state.faculty_form} onChange={this.handleChange.bind(this, 'faculty_form')} />
                          </InputGroup>
                          <br></br>
                          <InputGroup>
                            <InputGroupAddon>
                              <InputGroupText>Examiner Details Form Link</InputGroupText>
                            </InputGroupAddon>
                            <Input name="examiner_form" value={this.state.examiner_form} onChange={this.handleChange.bind(this, 'examiner_form')} />
                          </InputGroup>
                        </CardBody>
                      </Collapse>
                      <Collapse isOpen={this.state.collapseSheet} onEntering={this.onEntering} onEntered={this.onEntered} onExiting={this.onExiting} onExited={this.onExited}>
                        <CardBody>
                          <InputGroup>
                            <InputGroupAddon>
                              <InputGroupText>Student Details Sheet Link</InputGroupText>
                            </InputGroupAddon>
                            <Input name="stud_sheet" value={this.state.stud_sheet} onChange={this.handleChange.bind(this, 'stud_sheet')} />
                          </InputGroup>
                          <br></br>
                          <InputGroup>
                            <InputGroupAddon>
                              <InputGroupText>Student Report Sheet Link</InputGroupText>
                            </InputGroupAddon>
                            <Input name="report_sheet" value={this.state.report_sheet} onChange={this.handleChange.bind(this, 'report_sheet')} />
                          </InputGroup>
                          <br></br>
                          <InputGroup>
                            <InputGroupAddon>
                              <InputGroupText>Faculty Details Sheet Link</InputGroupText>
                            </InputGroupAddon>
                            <Input name="faculty_sheet" value={this.state.faculty_sheet} onChange={this.handleChange.bind(this, 'faculty_sheet')} />
                          </InputGroup>
                          <br></br>
                          <InputGroup>
                            <InputGroupAddon>
                              <InputGroupText>Examiner Details Sheet Link</InputGroupText>
                            </InputGroupAddon>
                            <Input name="examiner_sheet" value={this.state.examiner_sheet} onChange={this.handleChange.bind(this, 'examiner_sheet')} />
                          </InputGroup>
                        </CardBody>
                      </Collapse>
                    </Card>
                    <InputGroup>
                      <InputGroupAddon>
                        <ButtonGroup>
                          <Button onClick={() => toast("Updated All Generic Settings")}>Update Generic Settings</Button>
                          <Button color="danger" onClick={() => toast("Reset Complete")}>Reset</Button>
                        </ButtonGroup>
                      </InputGroupAddon>
                    </InputGroup>
                  </Form>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  onRadioBtnClick(session) {
    this.setState({
      activeSession: session
    });
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
    const name = event.target.name;
    this.setState({ [name]: event.target.value });

  }

}