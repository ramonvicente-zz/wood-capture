import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class SelectField extends Component {

	mountOptions = (options) => {
		return options.map( option => <option value={option.value}>{option.name}</option>);
	}

	render() {
		const { isRequired, hasOther } = this.props
		const required = isRequired ? 'required' : '';
		const otherOption = hasOther && (<option value="other">Outro</option>);
		
		return(<>
			<div className="form-group">
				<label htmlFor={this.props.fieldName}>{this.props.title}</label>
				<select name={this.props.fieldName} onChange={this.props.inputChange} value={this.props.values} class="form-control form-select" id={this.props.fieldName} {...required}>
					<option value="" selected>{this.props.defaultValue}</option>
						{this.mountOptions(this.props.options)}
						{otherOption}
				</select>
			</div></>
		)
	}
}

SelectField.propTypes = {
	fieldName: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	inputChange: PropTypes.func.isRequired,
	values: PropTypes.string.isRequired,
	defaultValue: PropTypes.string.isRequired,
	isRequired: PropTypes.bool.isRequired,
	options: PropTypes.array.isRequired,
	hasOther: PropTypes.bool
};

export default SelectField