import React, { Component } from 'react'

export class TextField extends Component {

	render() {
		return(
			<div className="form-group">
				<label htmlFor={this.props.fieldName}>{this.props.title}</label>
				<input type="text" className="form-control" name={this.props.fieldName} onChange={this.props.inputChange} value={this.props.values} required/>
			</div>
		)
	}
}

export default TextField