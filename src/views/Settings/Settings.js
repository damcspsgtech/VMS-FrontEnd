import React, { Component } from 'react'
import {
  Row, Col, Nav, NavItem, NavLink,
  TabPane, TabContent, Card, CardHeader, CardBody,
} from 'reactstrap';
import classnames from 'classnames'
import axios from 'axios';

const BatchSettings = React.lazy(() => import('./BatchSettings'))
const GenericSettings = React.lazy(() => import('./GenericSettings'))

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
    this.renderPanes = this.renderPanes.bind(this);

    this.state = {
      activeTab: 'GS',
      batch_list: [[]],
      generic: [],
    };
  }

  componentDidMount() {
    axios.all([
      axios.get('/api/settings/'),
      axios.get('/api/settings/batch/'),
    ])
      .then(axios.spread((genericRes, batchRes) => {
        this.setState({
          generic: genericRes.data,
          batch_list: batchRes.data
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
              {this.renderTabs(this.state.batch_list)}
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              {this.renderPanes(this.state.batch_list, this.state.generic)}
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

  renderTabs(batches) {
    return (
      <React.Fragment>
        <NavItem>
          <NavLink className={classnames({ active: this.state.activeTab === 'GS' })} onClick={() => { this.toggle('GS') }}>
            Generic Settings
          </NavLink>
        </NavItem>
        {batches.map((batch) =>
          <NavItem>
            <NavLink className={classnames({ active: this.state.activeTab === batch.code })}
              onClick={() => { this.toggle(batch.code) }}>
              {batch.course}
            </NavLink>
          </NavItem>
        )}
      </React.Fragment>
    )
  }

  renderPanes(batches, generic) {
    return ([
      <TabPane tabId='GS'>
        <GenericSettings value={generic} />
      </TabPane>
      ,
      batches.map((batch) => <TabPane tabId={batch.code}>
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>Configure {batch.course}</CardHeader>
              <CardBody>
                <BatchSettings value={batch} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </TabPane>
      )
    ]);
  }

}