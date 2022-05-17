import React, { Component } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap';
import { saveForm, getWoodSpecies } from '../../firebase/Service';
import { loadButton, disableFields, getSelectOptions } from './FormActions';
import validateFields from './ValidateFields';
import swal from 'sweetalert';


import Image from 'react-bootstrap/Image'
import TextField from './Fields/TextField';
import NumberField from './Fields/NumberField';
import SelectField from './Fields/SelectField';

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

    return (
      <div className="form-container">
          <h1>Detalhes da Madeira</h1>

        <SelectField fieldName='specie' title='Espécie de madeira' inputChange={inputChange('specie')} 
            values={values.specie} isRequired={false} defaultValue='Selecione uma espécie' options={this.state.WoodList} hasOther={true}/>

        { 
          values.specie === "other" && (
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

        <SelectField fieldName='cutType' title='Tipo de Corte' inputChange={inputChange('cutType')} 
            values={values.cutType} isRequired={false} defaultValue='Selecione um tipo de corte' options={getSelectOptions('cutType')}/>

        <NumberField fieldName='weight' title='Peso em gramas (Opcional)' inputChange={inputChange('weight')} values={values.weight} 
            placeholder='ex.: 200' isRequired={false} message='As dimensões podem ser aproximadas'/>

        <SelectField fieldName='density' title='Densidade (Opcional)' inputChange={inputChange('density')} 
            values={values.density} isRequired={false} defaultValue='Selecione uma densidade' options={getSelectOptions('density')}/>

        <SelectField fieldName='cut' title='Corte (Opcional)' inputChange={inputChange('cut')} 
            values={values.cut} isRequired={false} defaultValue='Selecione um tipo de corte' options={getSelectOptions('default')}/>

        <SelectField fieldName='planer' title='Plaina (Opcional)' inputChange={inputChange('planer')} 
            values={values.planer} isRequired={false} defaultValue='Selecione um tipo de plaina' options={getSelectOptions('default')}/>

        <SelectField fieldName='sandpaper' title='Lixa (Opcional)' inputChange={inputChange('sandpaper')} 
            values={values.sandpaper} isRequired={false} defaultValue='Selecione um tipo de lixa' options={getSelectOptions('default')}/>

        <SelectField fieldName='lathe' title='Torno (Opcional)' inputChange={inputChange('lathe')} 
            values={values.lathe} isRequired={false} defaultValue='Selecione um tipo de torno' options={getSelectOptions('default')}/>

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
