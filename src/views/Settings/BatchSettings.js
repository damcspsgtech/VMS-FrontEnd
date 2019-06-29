import React, { Component } from 'react'
import {
  Button, ButtonGroup, Badge,
  Input, InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap'
import { toast } from 'react-toastify'
import parseColor from '../Colors'

export default class BatchSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      batch_code: '19PX',
      batch_count: '40',
      batch_email: 'contact@googlegroups.com',
      batch_year: '2019',
      batch_tutor: 'Alien',
      batch_color: 'Red'
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  render() {
    return (
      <div className="animated fadeIn">
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Batch Count</InputGroupText>
          </InputGroupAddon>
          <Input name='batch_count' value={this.state.batch_count} onChange={this.handleChange.bind(this)} />
          <InputGroupAddon addonType="prepend">
            <InputGroupText><Badge color="primary">{this.state.batch_count}</Badge></InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <br></br>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Batch Email ID</InputGroupText>
          </InputGroupAddon>
          <Input name='batch_email' value={this.state.batch_email} onChange={this.handleChange.bind(this)} />
          <InputGroupAddon addonType="prepend">
            <InputGroupText><Badge color="primary">{this.state.batch_email}</Badge></InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <br></br>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Batch Year</InputGroupText>
          </InputGroupAddon>
          <Input name='batch_year' value={this.state.batch_year} onChange={this.handleChange.bind(this)} />
          <InputGroupAddon addonType="prepend">
            <InputGroupText><Badge color="primary">{this.state.batch_year}</Badge></InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <br></br>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Batch Tutor</InputGroupText>
          </InputGroupAddon>
          <Input name="batch_tutor" value={this.state.batch_tutor} onChange={this.handleChange.bind(this)} />
          <InputGroupAddon addonType="prepend">
            <InputGroupText><Badge color="primary">{this.state.batch_tutor}</Badge></InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <br></br>
        <InputGroup >
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Batch Color</InputGroupText>
          </InputGroupAddon>
          <InputGroupAddon>
            <ButtonGroup>
              <Button color="danger" onClick={() => this.setState({ batch_color: 'Red' })}> Red</Button>
              <Button color="success" onClick={() => this.setState({ batch_color: 'Green' })}>Green</Button>
              <Button color="primary" onClick={() => this.setState({ batch_color: 'Blue' })}>Blue</Button>
              <Button color="warning" onClick={() => this.setState({ batch_color: 'Yellow' })}>Yellow</Button>
              <Button color="light" onClick={() => this.setState({ batch_color: 'White' })}>White</Button>
              <Button color="dark" onClick={() => this.setState({ batch_color: 'Black' })}>Black</Button>
            </ButtonGroup>
          </InputGroupAddon>
          <InputGroupAddon addonType="prepend">
            <InputGroupText><Badge color={parseColor(this.state.batch_color)}>{this.state.batch_color}</Badge></InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <br></br>
        <ButtonGroup>
          <Button color="success" onClick={this.handleSubmit.bind(this)}>Update</Button>
          <Button color="danger" onClick={this.handleReset}>Reset</Button>
        </ButtonGroup>
      </div>
    )
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  };

  handleReset = () => {
    this.setState({
      batch_code: '19PX',
      batch_count: '40',
      batch_email: 'contact@googlegroups.com',
      batch_year: '2019',
      batch_tutor: 'Alien',
      batch_color: 'Red'
    });
  };

  handleSubmit(event) {
    toast("Batch details have been set.", { position: toast.POSITION.TOP_RIGHT });
    event.preventDefault();
  };
}