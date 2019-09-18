import React, { Component } from 'react'
import { Card, CardHeader, CardBody } from 'reactstrap';
import { Draggable } from 'react-beautiful-dnd';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({

	// some basic styles to make the items look a bit nicer
	userSelect: 'none',
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,

	// change background colour if dragging
	background: isDragging ? 'lightgreen' : 'grey',

	// styles we need to apply on draggables
	...draggableStyle
});

export default class Guide extends Component {
	render() {
		return (
			<Draggable key={this.props.guide.id} draggableId={this.props.guide.id} index={this.props.index}>
				{(provided, snapshot) => (
					<Card ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						style={getItemStyle(snapshot.isDragging, provided.draggableProps)}
					>
						<CardHeader>
							{this.props.guide.name}
						</CardHeader>
						<CardBody>
							{this.props.guide.name}
						</CardBody>
					</Card>
				)}
			</Draggable>
		);
	}
}