import React, { Component } from 'react';
import { Row } from 'reactstrap';
import Student from "./Student"
import axios from 'axios';


export default class Students extends Component {
  constructor(props) {
    super(props)
    this.state = {
      student_list: [[]],
    }
    this.studentCards = this.studentCards.bind(this);

  }

  componentWillMount() {
    this.setState({
      student_list: [
        ['17PW01', 'Aakash Hemadri', 'Internship Report Filled', 'red'],
        ['17PW01', 'Aakash Hemadri', 'Internship Report Filled', 'red'],
        ['17PW01', 'Aakash Hemadri', 'Internship Report Filled', 'red'],
        ['17PD02', 'Aditiya', 'Internship Report Filled', 'blue'],
        ['17PD02', 'Aditiya', 'Internship Report Filled', 'blue'],
        ['17PD02', 'Aditiya', 'Internship Report Filled', 'blue'],
        ['17PT02', 'Aditiya', 'Internship Report Filled', 'yellow'],
        ['17PT02', 'Aditiya', 'Internship Report Filled', 'yellow'],
        ['17PA02', 'Aditiya', 'Internship Report Filled', 'green'],
        ['17PA02', 'Aditiya', 'Internship Report Filled', 'green'],
      ]
    })
  }

  componenDidMount() {
    axios.get('/student/list')
      .then((response) => {
        this.setState({
          student_list: response.student_list
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
          {this.studentCards(this.state.student_list)}
        </Row>
      </div>
    );
  }

  studentCards(items) {
    return (
      <React.Fragment >
        {items.map((item) => <Student key={item[0]} value={item} />)}
      </React.Fragment >
    );
  }
}