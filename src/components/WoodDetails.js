import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap';
import firebase from "../firebase/firebase";

export class WoodDetails extends Component {
  save = values => e => {
    e.preventDefault();
    console.log('teste', this.validateFields(values));
    if(this.validateFields(values) === 0) {
      console.log('teste1');
      this.registerWood(values);
      this.props.nextStep();
    }
  };

  back = e => {
      e.preventDefault();
      this.props.prevStep();
  };

  registerWood = (values) => e => {
    e.preventDefault();
  }

  clearFields = (values) => e => {
    e.preventDefault();

    document.getElementById("specie").value = "";
    document.getElementsByName("other")[0].value = '';
    document.getElementsByName("density")[0].value = '';
    document.getElementsByName("cutType")[0].value = '';
    document.getElementsByName("planer")[0].value = '';
    document.getElementById("weight").value = "";
    document.getElementsByName("specie")[0].value = '';
    document.getElementsByName("specie")[0].value = '';
    document.getElementsByName("specie")[0].value = '';
    document.getElementsByName("specie")[0].value = '';
    document.getElementsByName("specie")[0].value = '';
    document.getElementsByName("specie")[0].value = '';
    document.getElementsByName("specie")[0].value = '';

    values.weight = '';
  }
  
  validateFields = (values) => {
    let count = 0;

    if(values.image === '') {
      count++;
      document.getElementsByName("image")[0].style.borderColor="red";
    }

    if(values.width === 0 || values.width === '') {
      count++;
      document.getElementsByName("width")[0].style.borderColor="red";
    }

    if(values.height === 0 || values.height === '') {
      count++;
      document.getElementsByName("height")[0].style.borderColor="red";
    }

    if(values.view === '') {
      count++;
      document.getElementsByName("view")[0].style.borderColor="red";
    }
    console.log('width', values.width );
    return count;
  }

  render() {
    let { values, inputChange } = this.props;

    return (
      <div className="form-container">
          <h1>Detalhes da Madeira</h1>

        <div className="form-group">
          <label htmlFor="image">Imagem</label>
          <input type="file" class="form-control-file" name="image" onChange={inputChange('image')} value={values.image} id="image"></input>
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
          <label htmlFor="width">Largura em mm</label>
          <input type="number" className="form-control" name="width" onChange={inputChange('width')} value={values.width} placeholder="ex.: 60"/>
          <span>As dimensões podem ser aproximadas</span>
        </div>
        <div className="form-group">
          <label htmlFor="height">Altura em mm</label>
          <input type="number" className="form-control" name="height" onChange={inputChange('height')} value={values.height} placeholder="ex.: 60"/>
          <span>As dimensões podem ser aproximadas</span>
        </div>
        <div className="form-group">
          <label htmlFor="view">Visão</label>
          <select name="view" onChange={inputChange('view')} value={values.view} class="form-control form-select" aria-label="Default select example">
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
        <Row className="btn-section">
          <Col className="btn-back">
            <button className="btn btn-danger" onClick={this.back}>Voltar</button>
          </Col>
          <Col className="btn-continue">
            <button className="btn btn-primary" onClick={this.save(values)}>Salvar</button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default WoodDetails
