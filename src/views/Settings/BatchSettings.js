import React, { Component } from 'react'
import { 
    Button, Badge, 
    Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import { toast } from 'react-toastify'

export default class BatchSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            batch_count: '40',
            batch_email: 'contact@googlegroups.com',
            batch_year: '2019',
            batch_tutor: 'Alien'
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleChange(field, event) {
        if (field === 'batch_count') {
            this.setState({ batch_count: event.target.value });
        }
        else if (field === 'batch_email') {
            this.setState({ batch_email: event.target.value });
        }
        else if (field === 'batch_year') {
            this.setState({ batch_year: event.target.value });
        }
    };
    handleReset = () => {
        this.setState({
            batch_count: '40',
            batch_email: 'contact@googlegroups.com',
            batch_year: '2019',
            batch_tutor: 'Alien'
        });
    };


    handleSubmit(field, value, event) {
        toast.info(field + ' have been updated for ' + value, { position: toast.POSITION.TOP_RIGHT });
        event.preventDefault();
    };

    render() {
        return (
            <div className="animated fadeIn">
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>Batch Count</InputGroupText>
                    </InputGroupAddon>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><Badge color="primary">{this.state.batch_count}</Badge></InputGroupText>
                    </InputGroupAddon>
                    <Input name='count' value={this.state.batch_count} onChange={this.handleChange.bind(this, 'batch_count')} placeholder="Wrong? Change it then!" />
                    <InputGroupAddon addonType="append">
                        <Button color="danger" onClick={this.handleSubmit.bind(this, 'Batch Count', this.state.batch_count)}>Update</Button>
                    </InputGroupAddon>
                </InputGroup>
                <br></br>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>Batch Email ID</InputGroupText>
                    </InputGroupAddon>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><Badge color="primary">{this.state.batch_email}</Badge></InputGroupText>
                    </InputGroupAddon>
                    <Input name='email_id' value={this.state.batch_email} onChange={this.handleChange.bind(this, 'batch_email')} placeholder="batch email id" />
                    <InputGroupAddon addonType="append">
                        <Button color="success" onClick={this.handleSubmit.bind(this, 'Batch Email ID', this.state.batch_email)}>Update</Button>
                    </InputGroupAddon>
                </InputGroup>
                <br></br>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>Batch Year</InputGroupText>
                    </InputGroupAddon>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><Badge color="primary">{this.state.batch_year}</Badge></InputGroupText>
                    </InputGroupAddon>
                    <Input name='year' value={this.state.batch_year} onChange={this.handleChange.bind(this, 'batch_year')} placeholder="batch year" />
                    <InputGroupAddon addonType="append">
                        <Button color="success" onClick={this.handleSubmit.bind(this, 'Batch Year', this.state.batch_year)}>Update</Button>
                    </InputGroupAddon>
                </InputGroup>
                <br></br>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>Batch Tutor</InputGroupText>
                    </InputGroupAddon>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><Badge color="primary">{this.state.batch_tutor}</Badge></InputGroupText>
                    </InputGroupAddon>
                    <Input />
                    <InputGroupAddon addonType="append">
                        <Button color="success">Update</Button>
                    </InputGroupAddon>
                </InputGroup>
                <br></br>

                <Button onClick={this.handleReset}>Reset</Button>
                <Button>Send Form Mail</Button>
                <Button onClick={this.handleSubmit.bind(this, 'All details', 'this batch')}>Update</Button>

            </div>
        )
    }
}