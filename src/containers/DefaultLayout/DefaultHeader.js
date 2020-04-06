import React, { Component } from 'react';
import { Nav,Badge } from 'reactstrap';
import PropTypes from 'prop-types';
// import NavigatorOnline from 'react-navigator-online';
import { Detector } from "react-detect-offline";

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.jpeg'
import sygnet from '../../assets/img/brand/sygnet.jpeg'
import Cookies from "js-cookie" 
import axios from 'axios';
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

const defaultProps = {};


class DefaultHeader extends Component {

  constructor(props) {
    super(props)
      this.state = {
      profile: [],
    }
    this.getUserfromSession = this.getUserfromSession.bind(this)
  }

  getUserfromSession = () => {
    const sessionCookie = Cookies.get("session");
    console.log(sessionCookie)
    return JSON.parse(sessionCookie).user
  }
  componentDidMount() {

    axios.get('/api/faculty/getProfile', {params:{id : this.getUserfromSession()}
      }).then((res) => {
        if (res.data.result === 'success') {
          this.setState({
            profile: res.data.profile
           
          });
        }
      })
      .catch((error) => {
        toast(error)
      })
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
        <Detector render={({ online }) => (
          // < MuiThemeProvider theme={theme}>
          // <Badge
          //     color={online ? "primary" : "secondary"} 
          //     variant="dot">
          //    {online ? "online" : "offline"}
          // </Badge>
          
           //</MuiThemeProvider>

           <h4><Badge color={online ? "success" : "secondary"}>{online ? "online" : "offline"}</Badge></h4>
        )}/>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={(this.state.profile.image)?'data:image/jpeg;base64,'+this.state.profile.image:placeholder_img} className="img-avatar"/>
              {/* <Detector render={({ online }) => (
                  <Badge color= {online ? "success" : "default"}/>
             )}/> */}
            </DropdownToggle>
            
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>{this.state.profile.name}</strong></DropdownItem>
              {/* <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem> */}
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
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
