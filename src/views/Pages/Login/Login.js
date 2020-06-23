import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

import  Cookies from "js-cookie";




class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
     // role: ''
    }
    this.onLogin = this.onLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loading = this.loading.bind(this);
  }
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  

  onLogin() {
    axios.post('/api/login', {
      username: this.state.username.toUpperCase(),
      password: this.state.password
    })
      .then((res) => {
        console.log(res);
        if (res.data.result === "success") {
         // this.setState({isLoggedIn: true});
          const cookie_value = {'user':this.state.username.toUpperCase(),'role':res.data.role}
          Cookies.set("session", JSON.stringify(cookie_value))
          this.props.history.push('/')
        }
        else if (res.data.result === "failed-credentials" || res.data.result === 'failed-user-dne') {
          toast('failed')
          toast.warning('Wrong Credentials')
        }
      })
      .catch((error) => {
        toast('hello\n' + error)
      })
  }
 
  handleChange(event) {
    this.setState(
      { [event.target.name]: event.target.value }
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
                          <Button color="primary" className="px-4" onClick={this.onLogin}>Login</Button>
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
export default Login;