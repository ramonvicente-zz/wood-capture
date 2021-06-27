import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap';

export class WoodDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
      const { values, inputChange } = this.props;

      return (
        <div className="form-container">
            <h1>Detalhes da Madeira</h1>

            <div className="form-group">
            <label htmlFor="images">Imagem</label>
            <input type="file" class="form-control-file" name="images" onChange={inputChange('images')} value={values.image} id="images"></input>
          </div>
          <div className="form-group">
            <img
              className="ref"
              src={values.downloadURL || "https://via.placeholder.com/400x300"}
              alt="Uploaded Images"
              id="wood-image"
            />
          </div>
          <div className="form-group">
            <label htmlFor="other">Largura em mm</label>
            <input type="number" className="form-control" name="other" onChange={inputChange('other')} value={values.widght} placeholder="ex.: 60"/>
            <span>As dimensões podem ser aproximadas</span>
          </div>
          <div className="form-group">
            <label htmlFor="other">Altura em mm</label>
            <input type="number" className="form-control" name="other" onChange={inputChange('other')} value={values.height} placeholder="ex.: 60"/>
            <span>As dimensões podem ser aproximadas</span>
          </div>
          <div className="form-group">
            <label htmlFor="cutType">Visão</label>
            <select name="cutType" onChange={inputChange('cutType')} value={values.cutType} class="form-control form-select" aria-label="Default select example">
              <option selected>Esocolha uma opção</option>
                <option value="topo">Topo</option>
                <option value="tangencial">Tangencial</option>
                <option value="radial">Radial</option>
            </select>
          </div>
          {/* <div className="form-group check-element">
              <label htmlFor="name">Visão da madeira</label>
              <br />
              <input type="radio" className="btn-check" name="options" id="option1" autocomplete="off"/>
              <label class="btn btn-secondary" for="option1">Topo</label>

              <input type="radio" className="btn-check" name="options" id="option2" autocomplete="off"/>	
              <label class="btn btn-secondary" for="option2">Tangêncial</label>

              <input type="radio" className="btn-check" name="options" id="option4" autocomplete="off"/>
              <label class="btn btn-secondary" for="option4">Radial</label>
          </div> */}

            <br />
          <Row>
            <Col className="btn-back">
              <button className="btn btn-danger" onClick={this.back}>Voltar</button>
            </Col>
            <Col className="btn-continue">
              <button className="btn btn-primary" onClick={this.continue}>Continue</button>
            </Col>
          </Row>
        </div>
      )
    }
}

export default WoodDetails
