import React, { Component } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../axiosInstance';
import axios from 'axios'
import Cookies from "js-cookie";
import LoginComponent from './LoginComponent';






let axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
  }
};

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      batch: '',
      signInAs: 1,
      role: ''
    }
    this.onLogin = this.onLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignInChange = this.handleSignInChange.bind(this);
    this.loading = this.loading.bind(this);
    this.checkStudent = this.checkStudent.bind(this);
    this.redirectStudent = this.redirectStudent.bind(this);
  }
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  redirectStudent() {
    const cookie_value = { 'userName': this.state.username, 'role': 'student', 'batch': this.state.batch, 'id': this.state.username + '_' + this.state.batch.split('_')[1] }
    Cookies.set("session", JSON.stringify(cookie_value))
    this.props.history.push('/studentInfoForm')
  }

  checkStudent(student_info) {
    axiosInstance.post('/api/students/studentLogin/', {
      roll_no: student_info.rollno,
      name: student_info.name,
      course: student_info.branch,
      email: student_info.emailId,
      phone_number: student_info.phoneNumber,
    })
      .then((res) => {

        if (res.data.result === 'success') {
          this.redirectStudent()
        }
        else {
          toast('Failed to connect to Server!\n')
        }
      })
      .catch((error) => {
        toast('Failed to connect to Server!\n')
      })

  }


  onLogin() {
    if (this.state.signInAs === 1) {
      console.log(this.state.username)
      axiosInstance.post('/api/login', {
        username: this.state.username,
        password: this.state.password
      }, axiosConfig)
        .then((res) => {
          console.log(res.data.result)
          if (res.data.result === "success") {
            this.setState({ isLoggedIn: true });
            const cookie_value = res.data
            Cookies.set("session", JSON.stringify(cookie_value))
            this.props.history.push('/')
          }
          else if (res.data.result === "failed-credentials" || res.data.result === 'failed-user-dne') {
            toast.warning('Wrong Credentials')
          }
        })
        .catch((error) => {
          toast('error\n' + error)
        })
    }
    else {

      axiosInstance.get('/api/settings/batch/checkBatchActive', { params: { id: (this.state.username).substring(0, 4).toUpperCase() } })
        .then((res) => {
          console.log(res.data.result)
          if (res.data.result === 'success') {
            this.setState({ batch: res.data.batch_id })
            const requestOptions = {
              method: 'POST',
              headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type, Accept', 'Accept': 'application/json', 'Content-Type': 'application/json', 'apikey': 'hasldfuiqwbfnljdhsabfalsukydfbsad' },
              body: JSON.stringify({
                'userName': this.state.username,
                'password': this.state.password
              })
            };
            fetch('https://api.amcspsgtech.in/v1/auth/login', requestOptions).then(res => res.json())
              .then((res) => {
                if (res.auth === "success") {
                  this.checkStudent(res)

                }
                else {
                  toast.warning('Wrong Credentials')
                }
              })
              .catch((error) => {
                toast('error\n' + error)
              })

          }
          else {
            toast.warning('Batch Not Active!')
          }
        }).catch((error) => {
          toast('error\n')
        })
    }
  }
  handleSignInChange(event,value) {
    this.setState(
      { signInAs: value}
    );
  }
  handleChange(event) {
    this.setState(
      { [event.target.name]: event.target.value }
    );
  }

  render() {

    return (

      <LoginComponent loginState={this.state} handleSignInChange={this.handleSignInChange} handleChange={this.handleChange} onLogin={this.onLogin}/>
    
    );
  }
}
export default Login;










