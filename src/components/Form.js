import React, { Component } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap';
import { saveForm, getWoodSpecies } from '../firebase/Service';
import { loadButton, disableFields } from '../utils/FormActions';
import validateFields from '../utils/ValidateFields';
import swal from 'sweetalert';


import Image from 'react-bootstrap/Image'
export class Form extends Component {

  constructor(props) {
    super(props)
    this.state = {
      WoodList: []
    }
  }

  save = values => e => {
    e.preventDefault();
    let errorMessage = validateFields(values);
    if(errorMessage === '') {
      loadButton();
      disableFields();
      saveForm(values, this.props);
    }
    if(errorMessage !== '')
      swal("Campos obrigatórios:", errorMessage, "error");
  };

  imageUpload = (element) => {
    
    if(element.target.files[0]){
      this.setState({
        imageURL: element.target.files[0]
      });
      this.setState({
        imageUpload: URL.createObjectURL(element.target.files[0])
      });
    }
  }

	componentDidMount = async () => {
    const woodList = await getWoodSpecies();

    this.setState({WoodList: woodList})
	}

  render() {
    const { values, inputChange } = this.props;
    const renderOptions = this.state.WoodList?.map( wood => <option value={wood.value}>{wood.name}</option>);

    return (
      <div className="form-container">
          <h1>Detalhes da Madeira</h1>

        <div className="form-group">
					<label htmlFor="specie">Espécie de madeira</label>
					<select name="specie" id="specie" onChange={inputChange('specie')} value={values.specie} class="form-control form-select" aria-label="Default select example" required>
						<option value="" selected>Selecione uma espécie</option>
						{renderOptions}
            <option value="other">Outro</option>
					</select>
				</div>
        { values.specie === "other" && (
					<div className="form-group">
						<label htmlFor="other">Outra</label>
						<input type="text" className="form-control" name="other" onChange={inputChange('other')} value={values.other} required/>
					</div>)
				}

        <div className="form-group">
          <label htmlFor="imageUrl">Imagem</label>
          <br></br>
          <input type="file" class="form-control-file" name="imageUrl" onChange={inputChange('imageUrl')} id="imageUrl"></input>
        </div>
  
        <div className="form-group">
          <Image src={values.imageUpload || "https://via.placeholder.com/400x300"} fluid id="wood-image"/>
        </div>
        <div className="form-group">
          <label htmlFor="width">Largura em mm (Opcional)</label>
          <input type="number" id="width" className="form-control" name="width" onChange={inputChange('width')} value={values.width} placeholder="ex.: 60"/>
          <span>As dimensões podem ser aproximadas</span>
        </div>
        <div className="form-group">
          <label htmlFor="height">Altura em mm (Opcional)</label>
          <input type="number" className="form-control" name="height" onChange={inputChange('height')} value={values.height} placeholder="ex.: 60" id="height"/>
          <span>As dimensões podem ser aproximadas</span>
        </div>
        <div className="form-group">
          <label htmlFor="cutType">Tipo de Corte</label>
          <select name="cutType" onChange={inputChange('cutType')} value={values.cutType} class="form-control form-select" aria-label="Default select example" id="cutType">
            <option selected>Selecione um tipo de corte</option>
              <option value="topo">Topo</option>
              <option value="tangencial">Tangencial</option>
              <option value="radial">Radial</option>
          </select>
        </div>

      <div className="form-group">
					<label htmlFor="weight">Peso em gramas (Opcional)</label>
					<input type="number" className="form-control" name="weight" onChange={inputChange('weight')} value={values.weight} />
				</div>
					
				<div className="form-group">
					<label htmlFor="density">Densidade (Opcional)</label>
					<select name="density" onChange={inputChange('density')} value={values.density} class="form-control form-select" aria-label="Default select example">
						<option selected>Selecione uma densidade</option>
							<option value="leve">Madeira Leve</option>
							<option value="medio">Madeira Média</option>
							<option value="pesada">Madeira Pesada</option>
					</select>
				</div>

				<div className="form-group">
					<label htmlFor="cut">Corte (Opcional)</label>
					<select name="cut" onChange={inputChange('cut')} value={values.cutType} class="form-control form-select" aria-label="Default select example">
						<option selected>Selecione um modelo de corte</option>
							<option value="facil">Fácil</option>
							<option value="medio">Médio</option>
							<option value="dificil">Difícil</option>
					</select>
				</div>

				<div className="form-group">
					<label htmlFor="planer">Plaina (Opcional)</label>
					<select name="planer" onChange={inputChange('planer')} value={values.planer} class="form-control form-select" aria-label="Default select example">
						<option selected>Selecione um tipo de plaina</option>
							<option value="facil">Fácil</option>
							<option value="medio">Médio</option>
							<option value="dificil">Difícil</option>
					</select>
				</div>

				<div className="form-group">
					<label htmlFor="sandpaper">Lixa (Opcional)</label>
					<select name="sandpaper" onChange={inputChange('sandpaper')} value={values.sandpaper} class="form-control form-select" aria-label="Default select example">
						<option selected>Selecione um tipo de lixa</option>
							<option value="facil">Fácil</option>
							<option value="medio">Médio</option>
							<option value="dificil">Difícil</option>
					</select>
				</div>

				<div className="form-group">
					<label htmlFor="lathe">Torno (Opcional)</label>
					<select name="lathe" onChange={inputChange('lathe')} value={values.lathe} class="form-control form-select" aria-label="Default select example">
						<option selected>Selecione um tipo de torno</option>
							<option value="facil">Fácil</option>
							<option value="medio">Médio</option>
							<option value="dificil">Difícil</option>
					</select>
				</div>

          <br />
        <Row className="btn-section">
          <Col className="btn-back">
            <button id="back" className="btn btn-danger" onClick={this.props.prevStep}>Voltar</button>
          </Col>
          <Col className="btn-continue" id="with-load">
            <button disabled className="btn btn-primary"><Spinner animation="border" variant="info" size="sm"/> Salvando...</button>
          </Col>
          <Col className="btn-continue" id="without-load">
            <button className="btn btn-primary" onClick={this.save(values)}> Salvar</button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Form
