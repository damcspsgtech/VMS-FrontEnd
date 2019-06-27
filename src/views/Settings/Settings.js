import React, { Component } from 'react'
import {
    Row, Col,
    Nav, NavItem, NavLink,
    TabPane, TabContent, Badge, Form,
    Button, ButtonGroup, Input, InputGroup, InputGroupAddon, InputGroupText,
    Card, CardHeader, CardBody, Collapse
} from 'reactstrap';
import classnames from 'classnames'

import TabPanes from './TabPanes'
import { toast } from 'react-toastify';
export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.tabPanes = this.tabPanes.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.onEntering = this.onEntering.bind(this);
        this.onEntered = this.onEntered.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.toggleCollapseForm = this.toggleCollapseForm.bind(this);
        this.toggleCollapseSheet = this.toggleCollapseSheet.bind(this);

        this.state = {
            activeTab: '1',
            activeSem: 4,
            stringActiveSem: '4th Semester',
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
    onEntering() {
        this.setState({ status: 'Opening...' });
    }

    onEntered() {
        this.setState({ status: 'Opened' });
    }

    onExiting() {
        this.setState({ status: 'Closing...' });
    }

    onExited() {
        this.setState({ status: 'Closed' });
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

    handleChange(field, event) {
        if (field === 'stud_form') {
            this.setState({ stud_form: event.target.value });
        }
        else if (field === 'faculty_form') {
            this.setState({ faculty_form: event.target.value });
        }
        else if (field === 'examiner_form') {
            this.setState({ examiner_form: event.target.value });
        }
        else if (field === 'report_form') {
            this.setState({ report_form: event.target.value });
        }
        else if (field === 'stud_sheet') {
            this.setState({ stud_sheet: event.target.value });
        }
        else if (field === 'examiner_sheet') {
            this.setState({ examiner_sheet: event.target.value });
        }
        else if (field === 'faculty_sheet') {
            this.setState({ faculty_sheet: event.target.value });
        }
        else if (field === 'report_sheet') {
            this.setState({ report_sheet: event.target.value });
        }
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    tabPanes() {
        if (this.state.activeSem === 4) {
            return (
                <React.Fragment>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1') }}>Generic Settings</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '5' })}
                            onClick={() => { this.toggle('5') }}>BSc. Applied Mathematics</NavLink>
                    </NavItem>
                </React.Fragment>
            );
        }
        else if (this.state.activeSem === 7) {
            return (<React.Fragment>
                <NavItem>
                    <NavLink className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggle('1') }}>Generic Settings</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggle('2') }}>MSc. Software Systems</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: this.state.activeTab === '3' })}
                        onClick={() => { this.toggle('3') }}>MSc. Theoretical Computer Science</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: this.state.activeTab === '4' })}
                        onClick={() => { this.toggle('4') }}>MSc. Data Science</NavLink>
                </NavItem>
            </React.Fragment>);
        }
        else if (this.state.activeSem === 10) {
            return (<React.Fragment>
                <NavItem>
                    <NavLink className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggle('1') }}>Generic Settings</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggle('2') }}>MSc. Software Systems</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: this.state.activeTab === '3' })}
                        onClick={() => { this.toggle('3') }}>MSc. Theoretical Computer Science</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: this.state.activeTab === '4' })}
                        onClick={() => { this.toggle('4') }}>MSc. Data Science</NavLink>
                </NavItem>
            </React.Fragment>);
        }
    }
    onRadioBtnClick(id, sem) {
        this.setState({
            activeSem: id,
            stringActiveSem: sem
        });
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12">
                        <Nav tabs>
                            {this.tabPanes()}
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId='1'>
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
                                                                            <Button onClick={() => this.onRadioBtnClick(4, '4th Semester')} active={this.state.activeSem === 4}>4th Semester</Button>
                                                                            <Button onClick={() => this.onRadioBtnClick(7, '7th Semester')} active={this.state.activeSem === 7}>7th Semester</Button>
                                                                            <Button onClick={() => this.onRadioBtnClick(10, '10th Semester')} active={this.state.activeSem === 10}>10th Semester</Button>
                                                                        </ButtonGroup>
                                                                    </InputGroupAddon>
                                                                    <InputGroupAddon addonType="prepend">
                                                                        <InputGroupText><Badge color="danger">{this.state.stringActiveSem}</Badge></InputGroupText>
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

                                                            <Collapse isOpen={this.state.collapseForm} onEntering={this.onEntering} onEntered={this.onEntered} onExiting={this.onExiting} onExited={this.onExited}>
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
                            </TabPane>
                            <TabPanes />
                        </TabContent>
                    </Col>
                </Row>
            </div >
        );
    }
}