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
      batch_list: [[]]
    };
  }

  componentWillMount() {
    axios.get('/settings')
      .then((response) => {
        this.setState({
          batch_list: response.batch_list
        });
      })
      .catch((error) => {
        this.setState({
          batch_list: [['PA', 'MSc. Applied Mathematics'], ['PW', 'MSc. Software Systems'], ['PD', 'MSc. Theoretical Computer Science'], ['PT', 'MSc. Data Science']]
        });
      })
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
              {this.renderPanes(this.state.batch_list)}
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

  renderTabs(items) {
    return (
      <React.Fragment>
        <NavItem>
          <NavLink className={classnames({ active: this.state.activeTab === 'GS' })} onClick={() => { this.toggle('GS') }}>
            Generic Settings
          </NavLink>
        </NavItem>
        {items.map((item) =>
          <NavItem>
            <NavLink className={classnames({ active: this.state.activeTab === item[0] })}
              onClick={() => { this.toggle(item[0]) }}>
              {item[1]}
            </NavLink>
          </NavItem>
        )}
      </React.Fragment>
    )
  }

  renderPanes(batch_list) {
    return ([(
      <TabPane tabId='GS'>
        <GenericSettings />
      </TabPane>
    ),
    batch_list.map((batch) => <TabPane tabId={batch[0]}>
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>Configure {batch[1]}</CardHeader>
            <CardBody>
              <BatchSettings batch />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </TabPane>
    )]
    );
  }

}