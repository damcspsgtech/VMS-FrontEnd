import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, Row, Button, ButtonGroup,
  Input, InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap';
import FacultyMember from "./GuideCard"
import axiosInstance from '../../axiosInstance';
import { toast } from 'react-toastify';



export default class Students extends Component {
  constructor(props) {
    super(props)
    this.state = {
      faculty_list: [],
      search: '',
    }
    this.facultyCards = this.facultyCards.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
   
  }

  componentDidMount() {
    axiosInstance.post('/api/faculty/search', {
      search: '',
      filter_guide: true,
      filter_notguide: false,
    })
      .then((res) => {
        if (res.data.result === 'success') {
          this.setState({
            faculty_list: res.data.faculty
          })
        }
      })
  }
  render() {
    return (
      <div className="animated fade-in">
        <Card>
          <CardHeader>
            <InputGroup className="float-right">
              <InputGroupAddon prepend>
                Faculty
              </InputGroupAddon>
              <InputGroupAddon append>
                <InputGroupText>
                  Search Filter
              </InputGroupText>
              </InputGroupAddon>
           
              <Input name="search" placeholder="Search" value={this.state.search} onChange={this.handleChange.bind(this)} />
              <InputGroupAddon>
                <ButtonGroup>
                  <Button color="primary" onClick={this.clearFilter}>
                    clear
                  </Button>

                </ButtonGroup>
              </InputGroupAddon>
            </InputGroup>

          </CardHeader>
          <CardBody>
            <Row>
              {this.facultyCards(this.state.faculty_list)}
            </Row>
          </CardBody>
        </Card>
      </div >
    );
  }

  facultyCards(items) {
    return (
      <React.Fragment >
        {items.map((item) => <FacultyMember value={item} updateFaculty={this.handleSearch} />)}
      </React.Fragment >
    );
  }

  async handleChange(event) {
    await this.setState({
      [event.target.name]: event.target.value,
    })
    this.handleSearch()
  }

  async handleSearch() {
    await axiosInstance.post('/api/faculty/search', {
      search: this.state.search.toLowerCase(),
      filter_guide: true,
      filter_notguide: false,
    })
      .then((res) => {
        if (res.data.result === 'success') {
          this.setState({
            faculty_list: res.data.faculty
          })
        }
      })
  }

 
} 