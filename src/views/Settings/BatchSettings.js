import React, { Component } from 'react'
import {
  Button, ButtonGroup, Badge,
  Input, InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap'
import { toast } from 'react-toastify'
import parseColor from '../Colors'
import axios from 'axios';

export default class BatchSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      batch_id: this.props.value.code,
      batch_code: this.props.value.code,
      batch_count: this.props.value.count,
      batch_email: this.props.value.email,
      batch_year: this.props.value.year,
      batch_tutor: this.props.value.tutor,
      batch_color: this.props.value.color
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      batch_code: this.props.value.code,
      batch_count: this.props.value.count,
      batch_email: this.props.value.email,
      batch_year: this.props.value.year,
      batch_tutor: this.props.value.tutor,
      batch_color: this.props.value.color
    });
  }

  componentDidReceiveProps() {
    this.setState({
      batch_id: (this.props.value.year).slice(2, -1) + this.props.value.code,
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>
              Batch Code
            </InputGroupText>
          </InputGroupAddon>
          <Input name='batch_code' value={this.state.batch_code} onChange={this.handleChange.bind(this)} />
          <InputGroupAddon addonType="prepend">
            <InputGroupText><Badge color={parseColor(this.state.batch_color)}>{this.state.batch_code}</Badge></InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <br></br>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Batch Count</InputGroupText>
          </InputGroupAddon>
          <Input name='batch_count' value={this.state.batch_count} onChange={this.handleChange.bind(this)} />
          <InputGroupAddon addonType="prepend">
            <InputGroupText><Badge color={parseColor(this.state.batch_color)}>{this.state.batch_count}</Badge></InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <br></br>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Batch Email ID</InputGroupText>
          </InputGroupAddon>
          <Input name='batch_email' value={this.state.batch_email} onChange={this.handleChange.bind(this)} />
          <InputGroupAddon addonType="prepend">
            <InputGroupText><Badge color={parseColor(this.state.batch_color)}>{this.state.batch_email}</Badge></InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <br></br>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Batch Year</InputGroupText>
          </InputGroupAddon>
          <Input name='batch_year' value={this.state.batch_year} onChange={this.handleChange.bind(this)} />
          <InputGroupAddon addonType="prepend">
            <InputGroupText><Badge color={parseColor(this.state.batch_color)}>{this.state.batch_year}</Badge></InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <br></br>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Batch Tutor</InputGroupText>
          </InputGroupAddon>
          <Input name="batch_tutor" value={this.state.batch_tutor} onChange={this.handleChange.bind(this)} />
          <InputGroupAddon addonType="prepend">
            <InputGroupText><Badge color={parseColor(this.state.batch_color)}>{this.state.batch_tutor}</Badge></InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <br></br>
        <InputGroup >
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Batch Color</InputGroupText>
          </InputGroupAddon>
          <InputGroupAddon>
            <ButtonGroup>
              <Button outline color="danger" onClick={() => this.setState({ batch_color: 'Red' })} active={this.state.batch_color === 'Red'}> Red</Button>
              <Button outline color="success" onClick={() => this.setState({ batch_color: 'Green' })} active={this.state.batch_color === 'Green'}>Green</Button>
              <Button outline color="primary" onClick={() => this.setState({ batch_color: 'Blue' })} active={this.state.batch_color === 'Blue'}>Blue</Button>
              <Button outline color="warning" onClick={() => this.setState({ batch_color: 'Yellow' })} active={this.state.batch_color === 'Yellow'}>Yellow</Button>
              <Button outline color="light" className="text-dark" onClick={() => this.setState({ batch_color: 'White' })} active={this.state.batch_color === 'White'}>White</Button>
              <Button outline color="secondary" onClick={() => this.setState({ batch_color: 'Grey' })} active={this.state.batch_color === 'Grey'}>Grey</Button>
              <Button outline color="dark" onClick={() => this.setState({ batch_color: 'Black' })} active={this.state.batch_color === 'Black'}>Black</Button>
            </ButtonGroup>
          </InputGroupAddon>
          <InputGroupAddon addonType="prepend">
            <InputGroupText><Badge color={parseColor(this.state.batch_color)}>{this.state.batch_color}</Badge></InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <br></br>
        <ButtonGroup>
          <Button color="success" onClick={this.handleSubmit}>Update</Button>
          <Button color="danger" onClick={this.handleReset}>Reset</Button>
        </ButtonGroup>
      </div>
    )
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  };

  handleReset() {
    this.setState({
      batch_id: (this.props.value.year).slice(2, -1) + this.props.value.code,
      batch_code: this.props.value.code,
      batch_count: this.props.value.count,
      batch_email: this.props.value.email,
      batch_year: this.props.value.year,
      batch_tutor: this.props.value.tutor,
      batch_color: this.props.value.color
    });
  };

  handleSubmit() {
    axios.post('/api/settings/batch', this.state)
      .then((response) => toast(response.data))
      .catch((error) => console.log(error))
  };
}