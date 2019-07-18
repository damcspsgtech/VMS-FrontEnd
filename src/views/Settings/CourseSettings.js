import React, { Component } from 'react';
import {
  ListGroup, ListGroupItem, Button, ButtonGroup,
  Input, InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap'
import axios from 'axios';
import { toast } from 'react-toastify';

const Course = React.lazy(() => import('./Course'));

export default class CourseSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      course_id: '',
      course_name: '',
      courses: [],
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.courses !== prevProps.courses) {
      this.setState({
        courses: this.props.courses
      })
    }
  }
  render() {
    return (
      <div class="animated fadeIn">
        <ListGroup>
          <ListGroupItem color="secondary">
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>
                  Course Addition
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupAddon>
                <InputGroupText>Course Code</InputGroupText>
              </InputGroupAddon>
              <Input name="course_id" value={this.state.course_id} onChange={this.handleOnChange} placeholder="PW" ></Input>
              <InputGroupAddon>
                <InputGroupText>Course Name</InputGroupText>
              </InputGroupAddon>
              <Input name="course_name" value={this.state.course_name} onChange={this.handleOnChange} onKeyPress={this.handleKeyPress} placeholder="MSc. Software Systems"></Input>
              <ButtonGroup className="float-right">
                <Button color="success" className="float-right" onClick={this.handleAdd}>
                  Add
                </Button>
              </ButtonGroup>
            </InputGroup>
          </ListGroupItem>
          {this.state.courses.map((course, key) => <Course key={course.id} value={course} handleDelete={this.handleDelete} />)}
        </ListGroup>
      </div>
    );
  }

  handleAdd() {
    axios.post('/api/settings/course/add/', {
      course_id: this.state.course_id,
      course_name: this.state.course_name,
    })
      .then((res) => {
        if (res.data.result === 'success') {
          this.props.updateCourse()
          toast.success('Added Course ' + this.state.course_name);
        }
        else if (res.data.result === 'failed') {
          toast.error('Failed to add course ' + this.state.course_name)
        }
      })

  }

  handleDelete(course_id, course_name) {
    axios.post('/api/settings/course/delete/', {
      course_id: course_id,
    })
      .then((res) => {
        if (res.data.result === 'success') {
          this.props.updateCourse()
          toast.success('Deleted course ' + course_name);
        }
        else if (res.data.result === 'failed') {
          toast.success('Failed to delete course ' + course_name + '!')
        }
      })
  }

  handleOnChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleKeyPress(target) {
    if (target.charCode === 13) {
      this.handleAdd();
    }
  }
}