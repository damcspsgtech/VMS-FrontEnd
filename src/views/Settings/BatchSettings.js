import React, { Component } from 'react';
import {
  ListGroup, ListGroupItem,
  Input, InputGroup, InputGroupAddon, InputGroupText,
  Button, ButtonGroup,
} from 'reactstrap';
import Batch from './Batch';
import axiosInstance from '../../axiosInstance';
import { toast } from 'react-toastify';

export default class BatchSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      batches: [],
      course_id: '',
      batch_semester: '',
      batch_year: ''
    }

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (this.props.batches !== prevProps.batches) {
      this.setState({
        batches: this.props.batches,
      })
    }
  }
  render() {
    return ([
      <div class="animated fadeIn" >
        <ListGroup>
          <ListGroupItem color="secondary" >
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>
                  Batch Addition
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupAddon>
                <InputGroupText>Course Code</InputGroupText>
              </InputGroupAddon>
              <Input name="course_id" placeholder="PX" value={this.state.course_id} onChange={this.handleOnChange} ></Input>
              <InputGroupAddon>
                <InputGroupText>Batch Semester</InputGroupText>
              </InputGroupAddon>
              <Input name="batch_semester" placeholder="IV/VII/X" value={this.state.batch_semester} onChange={this.handleOnChange} ></Input>
              <InputGroupAddon>
                <InputGroupText>Batch Year</InputGroupText>
              </InputGroupAddon>
              <Input name="batch_year" placeholder="20XX" value={this.state.batch_year} onChange={this.handleOnChange} onKeyPress={this.handleKeyPress}></Input>
              <ButtonGroup className="float-right">
                <Button color="success" className="float-right" onClick={this.handleAdd}>
                  Add
                </Button>
              </ButtonGroup>
            </InputGroup>
          </ListGroupItem>
          {this.state.batches.map((batch) => <Batch value={batch} handleDelete={this.handleDelete} updateBatch={this.props.updateBatch} />)},
    </ListGroup></div>
    ])
  }

  handleDelete(id, course_name) {
    axiosInstance.post('/api/settings/batch/delete', {
      batch_id: id,
    })
      .then((res) => {
        if (res.data.result === 'success') {
          this.props.updateBatch();
          toast.success('Batch ' + id + ' has been deleted successfully!')
        }
        else if (res.data.result === 'failed') {
          toast.error('Failed to delete batch ' + id);
        }
      })
      .catch((err) => {
        toast.error('Failed to connect to proxy!')
      })
  }

  handleOnChange(event) {
    if (event.target.name === 'batch_semester' || event.target.name === 'course_id') {
      this.setState({
        [event.target.name]: (event.target.value).toUpperCase()
      })
    }
    else {
      this.setState({
        [event.target.name]: (event.target.value)
      })
    }
  }

  handleAdd() {
    axiosInstance.post('/api/settings/batch/add', {
      course_id: this.state.course_id,
      batch_semester: this.state.batch_semester,
      batch_year: this.state.batch_year
    })
      .then((res) => {
        console.log(res)
        if (res.data.result === 'course_dne') {
     
          toast.error('Course does not exist!\nCreate the course before you create a batch!')
        }
        else if (res.data.result === 'batch_exists') {
          toast.warning('Batch entry already exists!');
        }
        else if (res.data.result === 'success') {
          this.state.batches.push(res.data.batch)
          this.props.updateBatch();
          toast.success('Batch ' + (this.state.batch_year).slice(2, 4) + this.state.course_id + ' has been added!')
        }
        else{
          toast('Failed!')
        }
      })
  }

  handleKeyPress(target) {
    if (target.charCode === 13) {
      this.handleAdd();
    }
  }
}