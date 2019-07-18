import React, { Component } from 'react'
import {
  Button, ButtonGroup, Badge, CardBody,
  ListGroupItem, ListGroupItemHeading,
  Input, InputGroup, InputGroupAddon, InputGroupText,
  Collapse,
} from 'reactstrap'
import { toast } from 'react-toastify'
import parseColor from '../Colors'
import axios from 'axios';

export default class Batch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
      batch_id: this.props.value.id,
      batch_semester: this.props.value.semester,
      batch_tutor: this.props.value.Tutor,
      batch_course: this.props.value.Course,
      batch_count: this.props.value.count,
      batch_email: this.props.value.email,
      batch_year: this.props.value.year,
      batch_color: this.props.value.color,
      batch_active: this.props.value.active,
    };

    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleActive = this.handleActive.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.setState({
        batch_id: this.props.value.id,
        batch_semester: this.props.value.semester,
        batch_tutor: this.props.value.Tutor,
        batch_course: this.props.value.Course,
        batch_count: this.props.value.count,
        batch_email: this.props.value.email,
        batch_year: this.props.value.year,
        batch_color: this.props.value.color,
        batch_active: this.props.value.active,
      });
    }
  }

  render() {
    return (
      <div class="animated fadeIn">
        <ListGroupItem color="white">
          <ListGroupItemHeading>
            {this.state.batch_course.name}
            <ButtonGroup className="float-right">
              <Button outline active={this.state.batch_active} color="secondary" onClick={this.handleActive}>
                {this.state.batch_active ? 'Active' : 'In Active'}
              </Button>
              <Button color="secondary" onClick={this.toggleCollapse}>
                Edit
            </Button>
              <Button color="danger" onClick={this.props.handleDelete.bind(this, this.state.batch_id, this.state.batch_course.name)}>
                Delete
            </Button>
            </ButtonGroup>
          </ListGroupItemHeading>
          <ListGroupItemHeading>
            <h4>
              <Badge outline color={parseColor(this.state.batch_color)}> {this.state.batch_id}</Badge>&nbsp;
            <Badge color={parseColor(this.state.batch_color)}>Batch Count: {this.state.batch_count}</Badge>&nbsp;
            <Badge>Semester: {this.state.batch_semester}</Badge>&nbsp;
            <Badge color="dark">Tutor: {this.state.batch_tutor.name}</Badge>&nbsp;
            <Badge color={(this.state.batch_active === true) ? 'primary' : 'secondary'}>{this.state.batch_active ? 'Active' : 'In Active'}</Badge>
            </h4>
          </ListGroupItemHeading>
        </ListGroupItem>
        <Collapse isOpen={this.state.collapse}>
          <ListGroupItem>
            <CardBody><div className="animated fadeIn">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Batch Count</InputGroupText>
                </InputGroupAddon>
                <Input name='batch_count' value={this.state.batch_count} onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress} />
                <InputGroupAddon addonType="prepend">
                  <InputGroupText><Badge color={parseColor(this.state.batch_color)}>{this.state.batch_count}</Badge></InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <br></br>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Batch Email ID</InputGroupText>
                </InputGroupAddon>
                <Input name='batch_email' value={this.state.batch_email} onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress} />
                <InputGroupAddon addonType="prepend">
                  <InputGroupText><Badge color={parseColor(this.state.batch_color)}>{this.state.batch_email}</Badge></InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <br></br>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Batch Tutor</InputGroupText>
                </InputGroupAddon>
                <Input name="batch_tutor" value={(this.state.batch_tutor.id)} onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress} />
                <InputGroupAddon addonType="prepend">
                  <InputGroupText><Badge color={parseColor(this.state.batch_color)}>{this.state.batch_tutor.id}</Badge></InputGroupText>
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
                <Button color="success" onClick={this.handleUpdate}>Update</Button>
                <Button color="danger" onClick={this.handleReset}>Reset</Button>
              </ButtonGroup>
            </div></CardBody>
          </ListGroupItem>
        </Collapse>
      </div>
    )
  }

  toggleCollapse() {
    this.setState({
      collapse: !this.state.collapse
    })
  }
  handleChange(event) {
    if (event.target.name === 'batch_tutor') {
      this.setState({ [event.target.name]: (event.target.value).toUpperCase() });
    }
    else {
      this.setState({ [event.target.name]: (event.target.value) });
    }

  };

  handleReset() {
    this.setState({
      batch_count: this.props.value.count,
      batch_email: this.props.value.email,
      batch_year: this.props.value.year,
      batch_tutor: this.props.value.Tutor,
      batch_color: this.props.value.color,
      batch_active: this.props.value.active,
    });
  };

  handleUpdate() {
    axios.post('/api/settings/batch/update', this.state)
      .then((res) => {
        if (res.data.result === 'success') {
          this.props.updateBatch();
        }
        else if (res.data.result === 'failed') {
          toast.error('Failed update batch details!');
        }
        else {
          toast.warning('Uncaught Exception!');
        }
      })
      .then(() => {
        this.toggleCollapse();
      })
      .catch((error) => {
        toast.error('Failed to connect to proxy!\n' + error)
      })
  }

  async handleActive() {
    await this.setState({
      batch_active: !this.state.batch_active
    })
    axios.post('/api/settings/batch/update', this.state)
      .then((res) => {
        if (res.data.result === 'failed') {
          toast.error('Failed to set batch as ' + (this.state.batch_active ? 'active' : 'in- active') + '!');
        }
        else if (res.data.result === 'success') {
          toast.success('Updated batch as ' + (this.state.batch_active ? 'active' : 'in-active') + '!');
          this.props.updateBatch();
        }
        else {
          toast.warning('Uncaught Exception!');
        }
      })
      .catch((error) => {
        toast.error('Failed to connect to proxy!\n' + error)
      })
  }
  handleKeyPress(target) {
    if (target.charCode === 13) {
      this.handleUpdate();
    }
  }
}