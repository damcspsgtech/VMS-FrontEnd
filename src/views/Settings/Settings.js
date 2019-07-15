import React, { Component } from 'react'
import {
  Row, Col, Nav, NavItem, NavLink,
  TabPane, TabContent, Card, CardHeader, CardBody,
} from 'reactstrap';
import classnames from 'classnames'
import axios from 'axios';
import { toast } from 'react-toastify';

const BatchSettings = React.lazy(() => import('./BatchSettings'))
const GenericSettings = React.lazy(() => import('./GenericSettings'))
const CourseSettings = React.lazy(() => import('./CourseSettings'))

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
    this.renderPanes = this.renderPanes.bind(this);
    this.updateCourse = this.updateCourse.bind(this);
    this.updateBatch = this.updateBatch.bind(this);

    this.state = {
      activeTab: 'Generic',
      batch_list: [[]],
      course_list: [[]],
    };
  }

  componentDidMount() {
    axios.all([
      axios.get('/api/settings/batch/'),
      axios.get('/api/settings/course/')
    ])
      .then(axios.spread((batchResponse, courseResponse) => {
        this.setState({
          batch_list: (batchResponse.data.result === 'success') ? batchResponse.data.batches : [[]],
          course_list: (courseResponse.data.result === 'success') ? courseResponse.data.courses : [[]],
        });
      }))
      .catch()
      .finally()
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Nav tabs>
              {this.renderTabs()}
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              {this.renderPanes(this.state.batch_list, this.state.course_list)}
            </TabContent>
          </Col>
        </Row>
      </div >
    );
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  renderTabs() {
    return (

      <React.Fragment>
        <NavItem className="animated fadeIn">
          <NavLink className={classnames({ active: this.state.activeTab === 'Generic' })} onClick={() => { this.toggle('Generic') }}>
            Generic
          </NavLink>
        </NavItem>
        <NavItem className="animated fadeIn">
          <NavLink className={classnames({ active: this.state.activeTab === 'Batch' })}
            onClick={() => { this.toggle('Batch') }}>
            Batches
          </NavLink>
        </NavItem>
        <NavItem className="animated fadeIn">
          <NavLink className={classnames({ active: this.state.activeTab === 'Course' })} onClick={() => { this.toggle('Course') }}>
            Courses
          </NavLink>
        </NavItem>
      </React.Fragment>
    )
  }

  renderPanes(batches, courses) {
    return ([
      <TabPane tabId='Generic' className="animated fadeIn">
        <GenericSettings />
      </TabPane>
      ,
      <React.Fragment>
        <TabPane tabId='Batch' className="animated fadeIn">
          <Row>
            <Col xs="12">
              <Card>
                <CardHeader>Configure Batches</CardHeader>
                <CardBody>
                  <BatchSettings batches={batches} updateBatch={this.updateBatch} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </React.Fragment>
      ,
      <React.Fragment>
        <TabPane tabId='Course' className="animated fadeIn">
          <Row>
            <Col xs="12">
              <Card>
                <CardHeader>Configure Courses</CardHeader>
                <CardBody>
                  <CourseSettings courses={courses} updateCourse={this.updateCourse} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </React.Fragment>
    ]);
  }
  updateCourse() {
    axios.get('/api/settings/course')
      .then((res) => {
        if (res.data.result === 'success') {
          this.setState({
            course_list: res.data.courses
          });
        }
        else if (res.data.result === 'course_dne') {
          toast.warning('Could not find any set courses!')
        }
        else if (res.data.result === 'failed') {
          toast.error('Uncaught Error!\n' + res.data.error)
        }
      })
      .catch(() => {
        toast.danger('Failed to connect to proxy')
      })
  }
  updateBatch() {
    axios.get('/api/settings/batch')
      .then((res) => {
        if (res.data.result === 'success') {
          this.setState({
            batch_list: res.data.batches
          })
        }
        else if (res.data.result === 'failed') {
          toast.warning('Could not retrieve any batch')
        }
      })
      .catch((err) => {
        toast.danger('Failed to connect to proxy')
      })
  }
}