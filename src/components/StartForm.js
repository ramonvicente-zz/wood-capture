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
      <div className="form-container">
        <div>
          <span>Projeto de pesquisa para catalogação e identificação automática de espécies de madeira. </span>
        </div>
        <div>
          <span>A sua participação é essencial e poderá ajudar muitas pessoas interessadas no assunto!</span>
        </div>
        <div>
          <span> Forneça preferencialmente amostras de imagens de madeira sem acabamento.</span>
        </div>

        <div className="btn-continue">
          <button className="btn btn-primary" onClick={this.continue}>Continuar</button>
        </div>
      </div>
    )
  }
}

export default StartForm
