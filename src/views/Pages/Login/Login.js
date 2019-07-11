import React, { Component, Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { toast } from 'react-toastify';

import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
    this.onLogin = this.onLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onLogin() {
    console.log('fired request')
    axios.post('/api/login', {
      user_id: this.state.username,
      user_pass: this.state.password
    })
      .then(function (response) {
        console.log(response);
        if (response.data === "Wrong Credentials") {
          toast(response);
          return (
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  <Redirect from="/login" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>);
        }
        else
          console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  handleChange(event) {
    const name = event.target.name;
    this.setState(
      { [name]: event.target.value }
    );
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="username" type="text" value={this.state.username} placeholder="Username" autoComplete="username" onChange={this.handleChange} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="password" type="password" value={this.state.password} placeholder="Password" autoComplete="current-password" onChange={this.handleChange} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={() => this.onLogin}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0" onClick={() => toast("Tsk Tsk, its probably the same as your username!")}>Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
