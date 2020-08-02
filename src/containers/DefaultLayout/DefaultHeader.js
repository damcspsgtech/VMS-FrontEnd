import React, { Component } from 'react';
import { Nav,Badge } from 'reactstrap';
import PropTypes from 'prop-types';
// import NavigatorOnline from 'react-navigator-online';
import { Detector } from "react-detect-offline";

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.jpeg'
import sygnet from '../../assets/img/brand/sygnet.jpeg'
import Cookies from "js-cookie" 
import axiosInstance from '../../axiosInstance';
import { toast } from 'react-toastify'; 
import placeholder_img from '../../assets/img/avatars/user-placeholder.png';

import { UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap'
//  import {Badge, Typography,MuiThemeProvider,createMuiTheme} from '@material-ui/core';
import {green, grey} from '@material-ui/core/colors';
const propTypes = {
  children: PropTypes.node,
};
// const theme = createMuiTheme({
//   palette: {
//     primary: green,
//     secondary:grey,
//   },
// });

const imgStyle = {
	height: 35,
	width: 35,
	borderRadius:35/2,
	
}

const defaultProps = {};


class DefaultHeader extends Component {

  constructor(props) {
    super(props)
      this.state = {
      name:'',
      image:''
    }
    this.getUserfromSession = this.getUserfromSession.bind(this)
  }

  getUserfromSession = () => {
    const sessionCookie = Cookies.get("session");
    console.log(sessionCookie)
    return JSON.parse(sessionCookie).user
  }
  componentDidMount() {

    if((JSON.parse(Cookies.get("session")).role) === 'student'){

      axiosInstance.get('/api/students/getStudentPersonalInfo/',{params: {id:(JSON.parse(Cookies.get("session")).userName)}
    }).then((res) => {
      if (res.data.result === 'success') {
        this.setState({
          name: res.data.studentInfo.name,
          image: res.data.studentInfo.image
         
        });
      }
    })
    .catch((error) => {
      toast(error)
    })

    }
    else{

      axiosInstance.get('/api/faculty/getProfile', {params: {id:(JSON.parse(Cookies.get("session")).userName)}
      }).then((res) => {
        if (res.data.result === 'success') {
          this.setState({
            name: res.data.profile.name,
            image: (res.data.profile.image_name)?'https://amcspsgtech.s3.amazonaws.com/faculty/photos/' + res.data.profile.image_name:''
           
          });
        }
      })
      .catch((error) => {
        toast(error)
      })
    }
  }
    showMessage(status) {
      if (status) {
          toast.success("this.state.message_online")
      }
      else {
          toast.error("this.state.message_ofline")
      }
    }
    
  render() {

  

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;



    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 54, height: 54, alt: 'DAMCS Logo' }}
          minimized={{ src: sygnet, width: 54, height: 54, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

      
     
        <Nav className="ml-auto" navbar>
        <span class="dot"></span>
        {/* <Detector render={({ online }) => (
         

           <h4><Badge color={online ? "success" : "secondary"}>{online ? "online" : "offline"}</Badge></h4>
        )}/> */}
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={(this.state.image)?this.state.image:placeholder_img} style={imgStyle} className="img-avatar"/>
              {/* <Detector render={({ online }) => (
                  <Badge color= {online ? "success" : "default"}/>
             )}/> */}
            </DropdownToggle>
            
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>{this.state.name}</strong></DropdownItem>
              {/* <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem> */}
              {/* <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem> */}
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
