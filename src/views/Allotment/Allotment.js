import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Row, Col, Card, CardHeader, CardBody, CardColumns } from 'reactstrap'
import axios from 'axios'


const Guide = React.lazy(() => import('./Guide'))
const Student = React.lazy(() => import('./Student'))

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
	const sourceClone = Array.from(source);
	const destClone = Array.from(destination);
	const [removed] = sourceClone.splice(droppableSource.index, 1);

	destClone.splice(droppableDestination.index, 0, removed);

	const result = {};
	result[droppableSource.droppableId] = sourceClone;
	result[droppableDestination.droppableId] = destClone;

	return result;
};
const grid = 8;

const getListStyle = isDraggingOver => ({
	background: isDraggingOver ? 'lightblue' : 'lightgrey',
	padding: grid,
	width: 250
});

export default class Allotment extends Component {
	constructor(props) {
		super(props);

		this.state = {
			guides: [],
			students: [],
			guides_selected: [],
			students_alloted: [],
		}

		this.onDragEnd = this.onDragEnd.bind(this);
	}

	componentDidMount() {
		axios.all([
			axios.get('/api/faculty/guide'),
			axios.get('/api/students/')
		])
			.then(axios.spread((guideRes, studentRes) => {
				this.setState({
					guides: (guideRes.data.result === 'success') ? guideRes.data.guides : [],
					students: (studentRes.data.result === 'success') ? studentRes.data.student_list : [],
				});
			}))

	}

	onDragEnd(result) {
		const { source, destination } = result;
		if (!destination) {
			return
		}
		if (destination.droppableId === source.droppabaleId && destination.index === source.index) {
			return;
		}

		if (source.droppabaleId === destination.droppableId) {

		}
		else if (source.droppabaleId === "Guides" && destination.droppableId === "Map") {

		}
		else if (source.droppableId === "Students") {

		}
	}
	render() {
		return (
			<div class="animated fadeIn" >
				<DragDropContext
					OnDragEnd={this.onDragEnd}
				>
					<Row>
						<Col >
							<Card >
								<CardHeader>
									Guides
                </CardHeader>
								<CardBody>
									<Droppable droppableId="Guides">
										{(provided, snapshot) => (
											<div ref={provided.innerRef}
												style={getListStyle(snapshot.isDraggingOver)}>
												{this.state.guides.map((guide, index) => <Guide key={guide.id} guide={guide} index={index} />)}
											</div>
										)}
									</Droppable>
								</CardBody>
							</Card>
						</Col>
						<Col >
							<Card>
								<CardHeader>
									Map
                </CardHeader>
								<CardBody>
									<Droppable droppableId="Map">
									</Droppable>
								</CardBody>
							</Card>
						</Col>
						<Col >
							<Card>
								<CardHeader>
									Students
                </CardHeader>
								<CardColumns>
									<Droppable droppableId="Students">
										<CardBody>
											{(provided, snapshot) => (
												<div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
													{this.state.students.map((student, index) => <Student key={student.roll_no} student={student} index={index} />)}
													{provided.placeholder}
												</div>
											)}
										</CardBody>
									</Droppable>
								</CardColumns>
							</Card>
						</Col>
					</Row>
				</DragDropContext>
			</div >
		);
	}
}