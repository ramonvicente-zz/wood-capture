import React, { Component } from 'react'
export class Welcome extends Component {

  render() {
    return (
      <div className="form-container center">
        <h1>Olá, seja bem vindo(a) ao Wood Capture!</h1>
        <div className="jumbotron jumbotron-info">
          <div className="center icon-section">
            <i className="em em-male-scientist" ></i>
            <i className="em em-female-scientist" ></i>
          </div>
          <span>Projeto de pesquisa para catalogação e identificação automática de espécies de madeira. </span>
        </div>
        <div className="jumbotron jumbotron-success">
          <div className="center icon-section">
            <i className="em em-trophy" aria-label="TROPHY"></i>
          </div>
          <span>A sua participação é essencial e poderá ajudar muitas pessoas interessadas no assunto!</span>
        </div>
        <div className="jumbotron jumbotron-warn">
          <div className="center icon-section">
          <i className="em em-iphone" aria-label="MOBILE PHONE"></i>
          </div>
          <span> Forneça preferencialmente amostras de imagens de madeira sem acabamento.</span>
        </div>

        <div className="btn-continue btn-section">
          <button className="btn btn-primary" id="welcome-next" onClick={this.props.nextStep}>Continuar</button>
        </div>
      </div>
    )
  }
}

export default Welcome
