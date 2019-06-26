import React, { Component } from 'react'
import {
    Card, CardHeader, CardBody,
    Row, Col,
    TabPane,
} from 'reactstrap';

import BatchSettings from './BatchSettings'

export default class TabPanes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: this.props.tabId,
        }
    }
    render() {
        return (
            <React.Fragment>
                <TabPane tabId='2'>
                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardHeader>Configure</CardHeader>
                                <CardBody>
                                    <BatchSettings />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId='3'>
                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardHeader>Configure</CardHeader>
                                <CardBody>
                                    <BatchSettings />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId='4'>
                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardHeader>Configure</CardHeader>
                                <CardBody>
                                    <BatchSettings />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId='5'>
                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardHeader>Configure</CardHeader>
                                <CardBody>
                                    <BatchSettings />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
            </React.Fragment>
        );
    }
}