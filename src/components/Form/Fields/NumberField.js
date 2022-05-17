import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class NumberField extends Component {

	render() {
		const { isRequired } = this.props
		const required = isRequired ? 'required' : '';
		
		return(
			<div className="form-group">
				<label htmlFor={this.props.fieldName}>{this.props.title}</label>
				<input type="number" className="form-control" name={this.props.fieldName} id={this.props.fieldName}
						onChange={this.props.inputChange} value={this.props.values}  placeholder={this.props.placeholder} {...required} />
				<span>{this.props.message}</span>
			</div>
		)
	}
}

NumberField.propTypes = {
	fieldName: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	inputChange: PropTypes.func.isRequired,
	values: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	isRequired: PropTypes.bool.isRequired,
	message: PropTypes.string
};

export default NumberField