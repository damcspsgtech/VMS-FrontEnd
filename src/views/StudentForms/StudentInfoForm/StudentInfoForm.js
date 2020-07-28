import React, { Component } from 'react'
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import EditIcon from '@material-ui/icons/Edit';
import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
import Fab from '@material-ui/core/Fab';
import placeholder_img from '../../../assets/img/avatars/user-placeholder.png';
import {  Badge, Grid, IconButton } from '@material-ui/core';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import axiosInstance from '../../../axiosInstance';;


const whiteBG = {
	backgroundColor: '#fff',// borderColor: '#333'
}
const imgStyle = {
	height: 128,
	width: 128,
	borderRadius:128/2,
	
}

const paddingStyle = {
	padding : 10
}

export default class StudentInfoForm extends Component {


	constructor(props) {
		super(props);

		this.state = {
			roll_no:'',
			name: '',
			course:'',
			semester:'',
			email:'',
			phone_number:'',
			image:'',
			
			imageData: ' ',
			edit_state: false,
			onSubmit: false,
		}
		this.handleEdit = this.handleEdit.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.checkValid = this.checkValid.bind(this);	
		this.handleChange = this.handleChange.bind(this);
		this.handlePhotoChange = this.handlePhotoChange.bind(this);
		this.uploadPhoto = this.uploadPhoto.bind(this)
	}

	componentDidMount() {

	  this.setState({semester:(JSON.parse(Cookies.get("session")).batch).split('_')[1]})

	  axiosInstance.get('/api/students/getStudentPersonalInfo/',{params: {id:(JSON.parse(Cookies.get("session")).userName)}})
      .then((res) => {
		  console.log(res)
		if(res.data.result === 'success'){
     		   this.setState({
				   
				roll_no:res.data.studentInfo.roll_no,
				name: res.data.studentInfo.name,
				course:res.data.studentInfo.course,
				email:res.data.studentInfo.email,
				phone_number:res.data.studentInfo.phone_number,
				image:res.data.studentInfo.image,
			});
		
		}
		else{
			toast('Failed To Fetch Details')	
		
		}
      })
      .catch((error) => {
        toast('error'+error)
      })

		
	}

	render() {
		return (

			<Grid  container spacing={10}
			direction="row"
			justify="center"
			alignItems="center">

				<Grid item >
					<Badge
						overlap="circle"
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
						badgeContent={<div><input accept="image/*" style={{display:'none'}} name="imageData"  id="icon-button-file" type="file" onChange={this.handlePhotoChange}/>
						<label htmlFor="icon-button-file">
						  <IconButton color="secondary" aria-label="upload picture" component="span">
							<CameraAltRoundedIcon />
						  </IconButton>
						</label></div>}>
						<img  style={imgStyle} src={this.state.image?this.state.image:placeholder_img} className="img-avatar" />
					</Badge>
				</Grid>

				<Grid item md={6} >
					<div style={{marginTop:50}}> 

						<Badge

							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							badgeContent={<Fab color="primary" size="small" disabled={this.state.edit_state} onClick={this.handleEdit} ><EditIcon /></Fab>}>


							<Form>
							<div>
							<Row form>
									<Col md={12}>
										<FormGroup>
										<Label>Roll Number</Label>
											<Input readonly="true" style={this.state.edit_state?{}:whiteBG} value={this.state.roll_no} type="text" name="roll" id="roll" />
										</FormGroup>
									</Col>
								</Row>
								<Row form>
									<Col md={12}>
										<FormGroup>
										<Label>Name</Label>
											<Input value={this.state.name} type="text" name="name" id="name"readonly="true" style={this.state.edit_state?{}:whiteBG}  />
										</FormGroup>
									</Col>
								</Row>

								<Row form>
									<Col>
										<FormGroup>
											<Label>Course</Label>
											<Input style={this.state.edit_state?{}:whiteBG} value={this.state.course} type="text" name="course" id="course" readonly="true" />
										</FormGroup>
									</Col>
								
									<Col md={4}>
										<FormGroup>
											<Label>Semester</Label>
											<Input readonly="true" style={this.state.edit_state?{}:whiteBG} value={this.state.semester} type="text" name="semester" id="semester" />
										</FormGroup>
									</Col>
								</Row>

								<Row form>
									<Col md={12}>
										<FormGroup>
											<Label>Email</Label>
											<Input disabled={!this.state.edit_state} invalid={this.state.onSubmit && !this.state.email} style={whiteBG} value={this.state.email} type="email" name="email" id="email" placeholder="abc@gmail.com"   onChange={this.handleChange}/>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col md={12}>
										<FormGroup>
											<Label for="examplePhone">Phone Number</Label>
											<Input disabled={!this.state.edit_state} style={whiteBG} invalid={this.state.onSubmit && !this.state.phone_number} value={this.state.phone_number} type="number" name="phone_number" id="phone_number" placeholder="xxxxxxxxx"  onChange={this.handleChange}/>
										</FormGroup>
									</Col>
								</Row>
								</div>
								
								<div style={{marginTop:10}}>
								{this.state.edit_state?
								(<Row>
									<Col sm={{ size: 'auto', offset: 2 }}>
										<FormGroup>
										
											<Button  color="danger" onClick={this.handleReset}>Cancel</Button>
										</FormGroup>
									</Col>
									<Col sm={{ size: 'auto', offset: 2 }}>
										<FormGroup>
											<Button color="success" onClick={this.handleSubmit}>Done</Button>
										</FormGroup>
									</Col>
								</Row>):''}
								</div>
							</Form>
						</Badge>
					</div>

					
			
				</Grid>


			</Grid>



		);


	}

	handleEdit() {
		this.setState({
			edit_state: !this.state.edit_state
		});
	}

	handleReset(){
		window.location.reload(false);
	}

	handleSubmit(){
		this.setState({onSubmit : true},this.handleUpdate)
	}

	checkValid(){
		if(!this.state.email ||  !this.state.phone_number){
			return false
		}
		return true
	}
	
	handleUpdate() {
	if(this.checkValid()){

		this.setState({
			edit_state: !this.state.edit_state,
			onSubmit:false
		});

		axiosInstance.post('/api/students/updateStudentPersonalInfo/', {
			roll_no: this.state.roll_no,
			email: this.state.email,
			phone_number: this.state.phone_number,
		  } )
			.then((res) => {
	  
			  if (res.data.result === 'success') {
				toast('Updation Successful!\n')
			  }
			  else {
				toast('Failed to Update!\n')
			  }
			})
			.catch((error) => {
			  toast('Failed to Update!\n')
			})
	}
		
	}

	handleChange(event){
		this.setState({
			[event.target.name]:event.target.value
		})	
	
    }

	handlePhotoChange(event){
		this.setState({
			[event.target.name]:event.target.files[0]
		},this.uploadPhoto)		
	
    }
uploadPhoto(){

	const formData = new FormData();
		
	formData.append('file',this.state.imageData)


	const requestOptions = {
		method: 'POST',
		headers: { 'Access-Control-Allow-Origin': '*',  'apikey': 'hasldfuiqwbfnljdhsabfalsukydfbsad' },
		body:formData
		
	  };
	  fetch('https://api.amcspsgtech.in/v1/student/update/profilePhoto/'+this.state.roll_no, requestOptions).then(res => res.json())
		.then((res) => {
		  if (res) {
			axiosInstance.post('api/students/uploadPhoto',{roll_no:this.state.roll_no,url:res.url})
			   .then((res) => {
			  	if(res.data.result === 'success'){
					  this.setState({
						image: res.data.imageURL
				  });
			  
			  }
			  else{
				  toast('Failed To Upload Photo,Try Later')	
			  
			  }
			})
			.catch((error) => {
			  toast('error'+error)
			})
				
		  }
	})
}
}
