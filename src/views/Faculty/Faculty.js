import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, Row, Button, ButtonGroup,
  Input, InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap';
import FacultyMember from "./FacultyMember"
import axiosInstance from '../../axiosInstance';
import { toast } from 'react-toastify';



export default class Students extends Component {
  constructor(props) {
    super(props)
    this.state = {
      faculty_list: [],
      search: '',
      filter_guide: false,
      filter_notguide: false,
    }
    this.facultyCards = this.facultyCards.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.updateFaculty = this.updateFaculty.bind(this);
    this.handleFilterGuide = this.handleFilterGuide.bind(this);
    this.handleFilterNotGuide = this.handleFilterNotGuide.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  componentDidMount() {
    axiosInstance.get('/api/faculty/')
      .then((res) => {
        if (res.data.result === 'success') {
          this.setState({
            faculty_list: res.data.faculty
          });
        }
      })
      .catch((error) => {
        toast(error)
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
              <InputGroupAddon>
                <ButtonGroup>
                  <Button color="success" outline active={this.state.filter_guide} onClick={this.handleFilterGuide}>
                    Guide
                  </Button>

                </ButtonGroup>
                <ButtonGroup>
                  <Button color="danger" outline active={this.state.filter_notguide} onClick={this.handleFilterNotGuide}>
                    Not a Guide
                  </Button>
                </ButtonGroup>
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
      filter_guide: this.state.filter_guide,
      filter_notguide: this.state.filter_notguide,
    })
      .then((res) => {
        if (res.data.result === 'success') {
          this.setState({
            faculty_list: res.data.faculty
          })
        }
      })
  }

  async clearFilter() {
    await this.setState({

      filter_guide: false,
      filter_notguide: false,
    });
    this.handleSearch();
  }

  async handleFilterGuide() {
    await this.setState({
      search: '',
      filter_guide: !this.state.filter_guide,
      filter_notguide: false,
    });
    this.handleSearch();
  }

  async handleFilterNotGuide() {
    await this.setState({
      filter_notguide: !this.state.filter_notguide,
      filter_guide: false,
    });
    this.handleSearch();
  }

  updateFaculty() {
    if (this.state.filter_guide === true) {
      this.handleSearch()
    }
    else {
      this.handleSearch()
    }

  }
} 