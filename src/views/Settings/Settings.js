import React, { Component } from 'react'
import {
    Row, Col,
    Nav, NavItem, NavLink,
    TabPane, TabContent, Badge,
    Button, ButtonGroup, InputGroup, InputGroupAddon, InputGroupText,
    Card, CardHeader, CardBody,
} from 'reactstrap';
import classnames from 'classnames'

import TabPanes from './TabPanes'
export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.tabPanes = this.tabPanes.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

        this.state = {
            activeTab: '1',
            activeSem: 4,
            stringActiveSem: '4th Semester',
        };
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
                                            <CardHeader>Configure</CardHeader>
                                            <CardBody>
                                                <div className="animated fadeIn">
                                                    <InputGroup>
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>Session : </InputGroupText>
                                                        </InputGroupAddon>
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText><Badge color="primary">{this.state.stringActiveSem}</Badge></InputGroupText>
                                                        </InputGroupAddon>
                                                        <InputGroupAddon addonType="append">
                                                            <ButtonGroup>
                                                                <Button color="primary" onClick={() => this.onRadioBtnClick(4, '4th Semester')} active={this.state.activeSem === 4}>4th Semester</Button>
                                                                <Button color="success" onClick={() => this.onRadioBtnClick(7, '7th Semester')} active={this.state.activeSem === 7}>7th Semester</Button>
                                                                <Button color="danger" onClick={() => this.onRadioBtnClick(10, '10th Semester')} active={this.state.activeSem === 10}>10th Semester</Button>
                                                            </ButtonGroup>
                                                        </InputGroupAddon>
                                                    </InputGroup>
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
            </div>
        );
    }
}