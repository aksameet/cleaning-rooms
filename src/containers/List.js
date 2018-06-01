import _ from 'lodash';
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllRecordsAction, deleteRecordAction } from "../actions";

class List extends Component {
	componentDidMount() {
		this.props.fetchAllRecordsAction();
	}

	onDelete(id) {
		this.props.deleteRecordAction(id, () => {
			this.props.fetchAllRecordsAction();
		});
	}

	renderRecords() {
		return _.map(this.props.records, record => {
			const { id, name, nickname, date, roomNr } = record;
			return (
				<tr key={id}>
					<th scope="row">{id}</th>
					<td>{name}</td>
					<td>{nickname}</td>
					<td>{date}</td>
					<td>{roomNr}</td>
					<td><button className="btn btn-danger w-100" onClick={() => this.onDelete(id)}>Delete</button></td>
				</tr>
			);
		});
	}

	render() {
		return (
			<div>
				<h1>List of Records</h1>
				<table className="table">
					<thead className="thead-dark">
						<tr>
							<th scope="col">#</th>
							<th scope="col">Name</th>
							<th scope="col">Nickname</th>
							<th scope="col">Date</th>
							<th scope="col">Room number</th>
							<th scope="col">Delete</th>
						</tr>
					</thead>
					<tbody>
						{this.renderRecords()}
					</tbody>
				</table>
			</div>
		);
	}
}

function mapStateToProps({ records }) {
	return { records };
}

export default connect(mapStateToProps, { fetchAllRecordsAction, deleteRecordAction })(List);