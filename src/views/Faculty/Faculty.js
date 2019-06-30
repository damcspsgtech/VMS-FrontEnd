import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import facultyData from './FacultyData'

function FacultyRow(props) {
  const faculty = props.faculty
  const facultyLink = `/faculty/${faculty.id}`

  const getBadge = (is_guide) => {
    return is_guide === true ? 'success' : 'danger'
  }

  return (
    <tr key={faculty.id.toString()}>
      <th scope="row"><Link to={facultyLink}>{faculty.id}</Link></th>
      <td><Link to={facultyLink}>{faculty.name}</Link></td>
      <td>{faculty.registered}</td>
      <td>{faculty.role}</td>
      <td><Link to={facultyLink}><Badge color={getBadge(faculty.status)}>{faculty.status}</Badge></Link></td>
    </tr>
  )
}

export default class Faculty extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillMount() {

  }

  render() {
    //const facultyList = facultyData.filter((user) => user.id < 10)
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card className="">
              <CardHeader>
                <i className="icon-people"></i> Faculty <small className="text-muted">information</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Short Name</th>
                      <th scope="col">Position</th>
                      <th scope="col">Guide</th>
                    </tr>
                  </thead>
                  <tbody>
                    {facultyData.map((faculty, index) =>
                      <FacultyRow key={index} faculty={faculty} />
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
