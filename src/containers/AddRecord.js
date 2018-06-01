import _ from 'lodash';
import React, { Component } from 'react'
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { addRecordAction, fetchAllRecordsAction } from "../actions";

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
class AddRecord extends Component {

	constructor(props) {
		super(props);

		this.state = {
			rooms: []
		}
	}

	componentDidMount() {
		this.props.fetchAllRecordsAction();

		let roomsArr = [];
		roomsArr = _.map(this.props.records, record => {
			return record.roomNr;
		});
		this.setState({rooms: roomsArr})
	}

	renderField(field) {
		const { meta: { touched, error } } = field,
			className = `form-group ${touched && error ? "has-danger" : ""}`;
		
		return (
			<div className={className}>
				<label>{field.label}</label>
				<input className="form-control" type="text" {...field.input} />
				<div className="invalid-feedback">
					{touched ? error : ""}
				</div>
			</div>
		);
	}

	renderDatepicker(field) {
		const { meta: { touched, error } } = field,
			className = `form-group ${touched && error ? "has-danger" : ""}`;

		return (
			<div className={className}>
				<label>{field.label}</label>
				<DatePicker
					className="form-control"
					minDate={new Date()}
					{...field.input}
					dateForm="DD.MM.YYYY"
					onChange={date => field.input.onChange(moment(date).format('DD.MM.YYYY'))}
					selected={field.input.value ? moment(new Date()) : null}
					autoComplete="off" />
				<div className="invalid-feedback">
					{touched ? error : ""}
				</div>
			</div>
		);
	}

	renderRoomsField(field) {
		const { meta: { touched, error }, input: { value } } = field;
		const className = `form-group ${touched && error ? "has-danger" : ""}`;

		if (this.state.rooms && _.includes(this.state.rooms, parseInt(value, 10))) {
			return (
				<div className={className}>
					<label>{field.label}</label>
					<input className="form-control" type="text" {...field.input} value={`Room ${value} has been cleaned.`}/>
					<div className="invalid-feedback">
						{touched ? error : ""}
					</div>
				</div>
			);
		} else {
			let parsedValue = isNaN(parseInt(value, 10)) ? value : parseInt(value, 10);
			return (
				<div className={className}>
					<label>{field.label}</label>
					<input className="form-control" type="text" {...field.input} value={parsedValue}/>
					<div className="invalid-feedback">
						{touched ? error : ""}
					</div>
				</div>
			);
		}
	
	}

	onSubmit(values) {
		let parsedValues = {
			name: values.name,
			nickname: values.nickname, 
			date: values.date, 
			roomNr: parseInt(values.roomNr, 10)
		}

		this.props.addRecordAction(parsedValues, () => {
			this.props.history.push("/");
		});
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<div>
				<h1>Add a Record</h1>
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<Field
						label="Name"
						name="name"
						component={this.renderField.bind(this)}
					/>
					<Field
						label="Nickname"
						name="nickname"
						component={this.renderField.bind(this)}
					/>
					<Field
						label="Date"
						name="date"
						component={this.renderDatepicker.bind(this)}
						placeholder="dd.mm.rr"
						type="number"
					/>
					<Field
						label="Room Number"
						name="roomNr"
						component={this.renderRoomsField.bind(this)}
						placeholder="0"
					/>
					<button type="submit" className="btn btn-primary mr-2">Submit</button>
					<Link to="/" className="btn btn-danger">Cancel</Link>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	if (!values.name) {
		errors.name = "Enter a name";
	}
	if (!values.nickname) {
		errors.nickname = "Enter a nickname";
	}
	if (!values.date) {
		errors.date = "Enter some date";
	}
	if (!values.roomNr || isNaN(values.roomNr)) {
		errors.roomNr = "Enter a number";
	}
	return errors;
}

function mapStateToProps({ records }) {
	return { records };
}

export default reduxForm({
	validate,
	form: "RecordsNewForm"
})(connect(mapStateToProps, { addRecordAction, fetchAllRecordsAction })(AddRecord));