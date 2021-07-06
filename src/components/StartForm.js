import React, { Component } from 'react'
export class StartForm extends Component {
  continue = e => {
      e.preventDefault();
      this.props.nextStep();
  };

  back = e => {
      e.preventDefault();
      this.props.prevStep();
  };

  render() {
    return (
      <div className="form-container center">
        <h1>Olá, seja bem vindo(a) ao Smart Wood Database!</h1>
        <div className="jumbotron jumbotron-info">
          <div className="center icon-section">
            <i class="em em-male-scientist" ></i>
            <i class="em em-female-scientist" ></i>
          </div>
          <span>Projeto de pesquisa para catalogação e identificação automática de espécies de madeira. </span>
        </div>
        <div className="jumbotron jumbotron-success">
          <div className="center icon-section">
            <i class="em em-trophy" aria-label="TROPHY"></i>
          </div>
          <span>A sua participação é essencial e poderá ajudar muitas pessoas interessadas no assunto!</span>
        </div>
        <div className="jumbotron jumbotron-warn">
          <div className="center icon-section">
          <i class="em em-iphone" aria-label="MOBILE PHONE"></i>
          </div>
          <span> Forneça preferencialmente amostras de imagens de madeira sem acabamento.</span>
        </div>

        <div className="btn-continue btn-section">
          <button className="btn btn-primary" onClick={this.continue}>Continuar</button>
        </div>
      </div>
    )
  }
}

export default StartForm
