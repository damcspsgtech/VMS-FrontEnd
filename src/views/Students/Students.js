import React, { Component } from 'react';
import {
  Row, Card, CardBody, CardHeader,
  Input, InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap';
import Student from "./Student"
import axiosInstance from '../../axiosInstance';
import { toast } from 'react-toastify';
import Cookies from "js-cookie";


export default class Students extends Component {
  constructor(props) {
    super(props)
    this.state = {
      student_list: [],
      search: '',
    }
 
    this.handleChange = this.handleChange.bind(this);
  }
  

  componentDidMount() {
    axiosInstance.get('/api/students/', { params: { id: (JSON.parse(Cookies.get("session")).batch) } })
      .then((res) => {
        this.setState({
          student_list: res.data.student_list
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
        <Card>
          <CardHeader>
            <InputGroup className="float-right">
              <InputGroupAddon prepend>
                Students
              </InputGroupAddon>
              <InputGroupAddon append>
                <InputGroupText>
                  Search
              </InputGroupText>
              </InputGroupAddon>
              <Input name="search" value={this.state.search} onChange={this.handleChange.bind(this)} />
            </InputGroup>
          </CardHeader>
          <CardBody>
            <Row>
              <Student student={this.state.student_list}/>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
  studentCards(items) {
    return (
      <React.Fragment>
        {items.map((item) => <Student student={item} />)}
      </React.Fragment>
    );
  }
  async handleChange(event) {
    await this.setState({
      [event.target.name]: event.target.value
    }, () => {
      axiosInstance.post('/api/students/search', {
        search: this.state.search
      }).then((res) => {
        if (res.data.result === 'success') {
          this.setState({
            student_list: res.data.students
          })
        }
      })
    })

  }
}
