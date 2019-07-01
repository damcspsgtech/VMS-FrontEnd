import React, { Component } from 'react';
import { Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import FacultyMember from "./FacultyMember"
import axios from 'axios';
import classnames from 'classnames';


export default class Students extends Component {
  constructor(props) {
    super(props)
    this.state = {
      faculty_list: [[]],
      activeTab: 'Faculty'
    }
    this.facultyCards = this.facultyCards.bind(this);
    this.toggle = this.toggle.bind(this);

  }

  componentWillMount() {
    this.setState({
      faculty_list: [
        ['C6027', 'Dr.', 'JEEVADOSS', 'Assistant Professor', 'SJD', 'Mathematics', 'raazdoss@gmail.com', 'Graph Theory', 9600327567, 1, 5],
        ['C1692', 'Mr.', 'A.MUTHUSAMY', 'Assistant Professor(Selection Grade)', 'AM', 'Mathematics, Computer Science', 'ams.mca@gapps.psgtech.ac.in', "Game theory, Data Mining, Machine learning, Computational Finance, Graph theory, Cryptography", 9442002655, 0, 10], ['C6027', 'Dr.', 'JEEVADOSS', 'Assistant Professor', 'SJD', 'Mathematics', 'raazdoss@gmail.com', 'Graph Theory', 9600327567, 1, 7],
      ]
    })
  }

  componenDidMount() {
    axios.get('/faculty/list')
      .then((response) => {
        this.setState({
          faculty_list: response.faculty_list
        });
      })
      .catch((error) => {

      })
      .finally()
  }

  render() {
    return (
      <div className="animated fade-in">
        <Row>
          <Col xs="12">
            <Nav tabs>
              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === 'Faculty' })} onClick={() => { this.toggle('Faculty') }}>
                  Faculty
              </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === 'Guides' })} onClick={() => { this.toggle('Guides') }}>
                  Guides
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId='Faculty' className="animated fade-in">
                <Row>
                  {this.facultyCards(this.state.faculty_list)}
                </Row>
              </TabPane>
              <TabPane tabId='Guides'>
                <Row>
                  {this.facultyCards(this.state.faculty_list.filter((faculty) => faculty[9] === 1))}
                </Row>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </div >
    );
  }

  facultyCards(items) {
    return (
      <React.Fragment >
        {items.map((item, act) => <FacultyMember key={item[0]} value={item} />)}
      </React.Fragment >
    );
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

} 