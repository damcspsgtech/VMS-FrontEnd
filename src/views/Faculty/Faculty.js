import React, { Component } from 'react';
import { Row } from 'reactstrap';
import FacultyMember from "./FacultyMember"
import axios from 'axios';


export default class Students extends Component {
  constructor(props) {
    super(props)
    this.state = {
      faculty_list: [[]],
    }
    this.facultyCards = this.facultyCards.bind(this);

  }

  componentWillMount() {
    this.setState({
      faculty_list: [
        ['C6027', 'Dr.', 'JEEVADOSS', 'Assistant Professor', 'SJD', 'Mathematics', 'raazdoss@gmail.com', 'Graph Theory', 9600327567, 0, 0],
        ['C1692', 'Mr.', 'A.MUTHUSAMY', 'Assistant Professor(Selection Grade)', 'AM', 'Mathematics, Computer Science', 'ams.mca@gapps.psgtech.ac.in', "Game theory, Data Mining, Machine learning, Computational Finance, Graph theory, Cryptography", 9442002655, 0, 0],
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
          {this.facultyCards(this.state.faculty_list)}
        </Row>
      </div>
    );
  }

  facultyCards(items) {
    return (
      <React.Fragment >
        {items.map((item) => <FacultyMember key={item[0]} value={item} />)}
      </React.Fragment >
    );
  }
}