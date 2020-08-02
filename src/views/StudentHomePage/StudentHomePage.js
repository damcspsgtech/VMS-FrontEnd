import React, { Component } from 'react';
import { Card, CardContent, CardHeader, CardMedia, Typography, Grid } from '@material-ui/core';
import { Row, Col } from 'reactstrap'
import axiosInstance from '../../axiosInstance';
import placeholder_img from '../../assets/img/avatars/user-placeholder.png';
import axios from 'axios'
import { toast } from 'react-toastify';
import Cookies from "js-cookie";

const classes =
{

  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',


  },

  tutorImg: {
    marginTop: 20,
    height: 128,
    width: 128,
    borderRadius: 128 / 2,

  },
  content: {
    flex: '1 0 auto',
    display: 'inline-block'
  },
  cover: {
    height: 220,
    width:300,
    maxHeight: 300,
    maxWidth: 300,
    objectFit: 'cover'

  },
  guide: {
    height: 175,
    maxHeight: 300,
    maxWidth: 200,
    objectFit: 'cover'

  },
};


export default class StudentHomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      studentName: '',
      tutor: '',
      guide: ''

    }

  }

  componentDidMount() {

    axios.all([
      axiosInstance.get('/api/settings/batchTutor', { params: { id: (JSON.parse(Cookies.get("session")).batch) } }),
      axiosInstance.get('/api/students/getStudentName', { params: { id: (JSON.parse(Cookies.get("session")).userName) } })
    ])
      .then(axios.spread((tutor, student) => {
        this.setState({
          tutor: (tutor.data.result === 'success') ? tutor.data.tutor : " ",
          studentName: (student.data.result === 'success') ? student.data.name : " ",
        });
      }))
      .catch()
      .finally()



  }
  render() {
    return (
      <div className="animated fade-in align-center">

        <Row>
          <Col sm={11} className=" mx-auto">


            <Card className={classes.root} style={{ borderRadius: 20 }}>
              {/* <div className={classes.details}> */}

              <CardContent className="align-center">

                <Row>
                  <Col sm={12} md={8}>
                    <Typography color="primary" component="h4" variant="h4">
                      WELCOME  {(this.state.studentName)}  ,
                </Typography>
                    <Typography align="justify" variant="body1" gutterBottom>
                      <br />
                      &nbsp; &nbsp;&nbsp; &nbsp;Welcome to <b>Internship Management Portal</b>, a digital platform made by the Department of Applied Mathematics and Computational Sciences, to bridge the gap between students and the college during the internship periods.
                It will serve as the one stop shop for all kinds of information and communication, ranging from faculty guides to submitting project details and reports to showcasing updates,
                there by easing the process while being away from college.
                </Typography>
                  </Col>
                  <Col sm={12} md={3}>
                    <img className="d-block mx-auto" style={classes.cover} 
                    src={'https://amcspsgtech.s3.amazonaws.com/vectors/welcome.jpg'} />
                  </Col>
                </Row>
              </CardContent>

              {/* </div> */}



            </Card>


          </Col>
        </Row>
        <Row>
          <Col sm={5} className=" mx-auto mt-5">
            <Card style={{ borderRadius: 20 }}>
              <CardMedia>

              </CardMedia>



              <CardContent className="align-center">



                {this.state.tutor ? (

                  <Row className="flex-sm-column-reverse flex-md-row">
                    <Col sm={12} md={8}>

                      <Typography color="primary" component="h4" variant="h4">
                        TUTOR
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <br /> <b> NAME&nbsp;&nbsp;&nbsp;:</b> &nbsp; {this.state.tutor.title}   {this.state.tutor.name}<br />
                        <b>PHONE&nbsp;:</b> &nbsp;{this.state.tutor.phone_number}<br />
                        <div class="text-nowrap"><b>EMAIL&nbsp;&nbsp;&nbsp;:</b> &nbsp;{this.state.tutor.email}</div><br />
                      </Typography>

                    </Col>
                    <Col sm={12} md={3}>
                      <img className="d-block mx-auto" style={classes.tutorImg}
                        src={(this.state.tutor) ? 'https://amcspsgtech.s3.amazonaws.com/faculty/photos/' + this.state.tutor.image_name : placeholder_img } />
                    </Col>
                  </Row>



                )
                  :

                  <Row>
                    <Col sm={12} md={8}>
                      <Typography color="primary" component="h4" variant="h4">
                        TUTOR
                 </Typography>

                      <Typography align="left" variant="body1" gutterBottom>
                        <div className="align-justify"><br />Yet to be assigned.</div><br />
                      </Typography>

                    </Col>
                    <Col sm={12} md={3}>
                      <img className="d-block  mx-auto" style={classes.guide} 
                      src= {'https://amcspsgtech.s3.amazonaws.com/vectors/plan.jpg'}/>
                    </Col>
                  </Row>
                }

              </CardContent>
            </Card>

          </Col>
          <Col sm={5} className="mx-auto mt-5">
            <Card style={{ borderRadius: 20 }}>
              <CardContent className="align-center">

                <Row>
                  <Col sm={12} md={5}>
                    <Typography color="primary" component="h4" variant="h4">
                      Guide
                 </Typography>

                    <Typography align="left" variant="body1" gutterBottom>
                      <div className="align-justify"><br />Yet to be assigned.</div><br />
                    </Typography>

                  </Col>
                  <Col sm={12} md={3}>
                    <img className="d-block  mx-auto" style={classes.guide}
                     src={'https://amcspsgtech.s3.amazonaws.com/vectors/plan.jpg'} />
                  </Col>
                </Row>
              </CardContent>
            </Card>

          </Col>
        </Row>

      </div >
    );
  }

}