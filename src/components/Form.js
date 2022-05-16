import React, { Component } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap';
import { saveForm, getWoodSpecies } from '../firebase/Service';
import { loadButton, disableFields } from '../utils/FormActions';
import validateFields from '../utils/ValidateFields';
import swal from 'sweetalert';


import Image from 'react-bootstrap/Image'
import TextField from './Form/TextField';
import NumberField from './Form/NumberField';
import SelectField from './Form/SelectField';

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

  getDefaultOptions = () => {
    return [
      {name:'Fácil', value:'facil'},
      {name:'Médio', value:'medio'},
      {name:'Difícil', value:'dificil'}
    ]
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
          <TextField fieldName="other" title="Outra" inputChange={inputChange('other')} value={values.other} />)
				}

        <div className="form-group">
          <label htmlFor="imageUrl">Imagem</label>
          <br></br>
          <input type="file" class="form-control-file" name="imageUrl" onChange={inputChange('imageUrl')} id="imageUrl"></input>
        </div>
  
        <div className="form-group">
          <Image src={values.imageUpload || "https://via.placeholder.com/400x300"} fluid id="wood-image"/>
        </div>

        <NumberField fieldName='width' title='Largura em mm (Opcional)' inputChange={inputChange('width')} values={values.width} 
            placeholder='ex.: 60' isRequired={false} message='As dimensões podem ser aproximadas'/>
        
        <NumberField fieldName='height' title='Altura em mm (Opcional)' inputChange={inputChange('height')} values={values.height} 
            placeholder='ex.: 60' isRequired={false} message='As dimensões podem ser aproximadas'/>

        <div className="form-group">
          <label htmlFor="cutType">Tipo de Corte</label>
          <select name="cutType" onChange={inputChange('cutType')} value={values.cutType} class="form-control form-select" aria-label="Default select example" id="cutType">
            <option selected>Selecione um tipo de corte</option>
              <option value="topo">Topo</option>
              <option value="tangencial">Tangencial</option>
              <option value="radial">Radial</option>
          </select>
        </div>

        <NumberField fieldName='weight' title='Peso em gramas (Opcional)' inputChange={inputChange('weight')} values={values.weight} 
            placeholder='ex.: 200' isRequired={false} message='As dimensões podem ser aproximadas'/>
					
				<div className="form-group">
					<label htmlFor="density">Densidade (Opcional)</label>
					<select name="density" onChange={inputChange('density')} value={values.density} class="form-control form-select" aria-label="Default select example">
						<option selected>Selecione uma densidade</option>
							<option value="leve">Madeira Leve</option>
							<option value="medio">Madeira Média</option>
							<option value="pesada">Madeira Pesada</option>
					</select>
				</div>

        <SelectField fieldName='cut' title='Corte (Opcional)' inputChange={inputChange('cut')} 
            values={values.cut} isRequired={false} defaultValue='Selecione um tipo de corte' options={this.getDefaultOptions()}/>

        <SelectField fieldName='planer' title='Plaina (Opcional)' inputChange={inputChange('planer')} 
            values={values.planer} isRequired={false} defaultValue='Selecione um tipo de plaina' options={this.getDefaultOptions()}/>

        <SelectField fieldName='sandpaper' title='Lixa (Opcional)' inputChange={inputChange('sandpaper')} 
            values={values.sandpaper} isRequired={false} defaultValue='Selecione um tipo de lixa' options={this.getDefaultOptions()}/>

        <SelectField fieldName='lathe' title='Torno (Opcional)' inputChange={inputChange('lathe')} 
            values={values.lathe} isRequired={false} defaultValue='Selecione um tipo de torno' options={this.getDefaultOptions()}/>

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
