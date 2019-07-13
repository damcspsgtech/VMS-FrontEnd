import React, { Component } from 'react';
import { Row } from 'reactstrap';
import Student from "./Student"
import axios from 'axios';
import { toast } from 'react-toastify';


export default class Students extends Component {
  constructor(props) {
    super(props)
    this.state = {
      student_list: [{}],
    }
    this.studentCards = this.studentCards.bind(this);

  }

  componentDidMount() {
    axios.get('/api/students/')
      .then((response) => {
        this.setState({
          student_list: response.data
        });
      })
      .catch((error) => {
        toast('error')
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
        {items.map((item) => <Student key={item[0]} student={item} />)}
      </React.Fragment >
    );
  }
}