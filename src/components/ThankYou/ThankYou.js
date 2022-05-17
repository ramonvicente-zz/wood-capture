import React, { Component } from 'react'

export class Success extends Component {

	render() {
		return (
			<div className="form-container">
				<h1>Muito Obrigado!</h1>
				<div className="jumbotron jumbotron-success">
          <p> Suas informações foram salvas com sucesso!</p>
          <p> Sua contribuição irá ajudar muito em nossa pesquisa e para a comunidade.</p>
        </div>
				<div className="btn-newRegister btn-section">
          <a className="btn btn-primary" href={window.location.href}>Adicionar nova espécie de madeira </a>
        </div>
			</div>
		)
	}
}

export default Success