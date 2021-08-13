import React, { Component } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap';
import firebase from "../firebase/firebase";
import swal from 'sweetalert';
import { getWoods } from '../utils/WoodDatas'

import Image from 'react-bootstrap/Image'
export class WoodDetails extends Component {

  save = values => e => {
    e.preventDefault();
    let errorMessage = this.validateFields(values);
    if(errorMessage === '') {
      this.loadButton();
      this.disableFields();
      this.registerWood(values);
    }
    if(errorMessage !== '')
      swal("Campos obrigatórios:", errorMessage, "error");
  };

  back = e => {
      e.preventDefault();
      this.props.prevStep();
  };

  loadButton = () => {
    document.getElementById("without-load").style.display = "none";
    document.getElementById("with-load").style.display = "block";
  }

  disableFields = () => {
    document.getElementById("back").setAttribute("disabled","disabled");
    document.getElementById("imageUrl").setAttribute("disabled","disabled");
    document.getElementById("width").setAttribute('readonly', true);
    document.getElementById("height").setAttribute('readonly', true);
    document.getElementById("cutType").setAttribute('readonly', true);
  }

  clearFields = (values) => e => {
    e.preventDefault();
  }
  
  validateFields = (values) => {
    let labelsName = '';

    if(values.specie === '') {
      labelsName+='- Espécie de Madeira \n';
			document.getElementsByName("specie")[0].focus();
			document.getElementsByName("specie")[0].style.borderColor="red";
		} else {
      document.getElementsByName("specie")[0].style.borderColor="#ced4da";
    }

		if(values.specie === 'other' && values.other === '') {
      labelsName+='- Outra \n';
			document.getElementsByName("other")[0].focus();
			document.getElementsByName("other")[0].style.borderColor="red";
		} 
    if(values.specie === 'other' && values.other !== '') {
      document.getElementsByName("other")[0].style.borderColor="#ced4da";
    }

    if(values.imageUrl === '') {
      labelsName+='- Imagem \n';
      document.getElementsByName("imageUrl")[0].focus();
      document.getElementsByName("imageUrl")[0].style.borderColor="red";
    } else {
      document.getElementsByName("imageUrl")[0].style.borderColor="black";
    }

    if(values.width === 0 || values.width === '') {
      labelsName+='- Largura \n';
      document.getElementsByName("width")[0].focus();
      document.getElementsByName("width")[0].style.borderColor="red";
    } else {
      document.getElementsByName("width")[0].style.borderColor="#ced4da";
    }

    if(values.height === 0 || values.height === '') {
      labelsName+='- Altura \n';
      document.getElementsByName("height")[0].focus();
      document.getElementsByName("height")[0].style.borderColor="red";
    } else {
      document.getElementsByName("height")[0].style.borderColor="#ced4da";
    }

    if(values.cutType === '') {
      labelsName+='- Tipo de Corte \n';
      document.getElementsByName("cutType")[0].focus();
      document.getElementsByName("cutType")[0].style.borderColor="red";
    } else {
      document.getElementsByName("cutType")[0].style.borderColor="#ced4da";
    }

    return labelsName;
  }

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

  registerWood = (values) =>{
    let file = values.imageUrl;
    let storage = firebase.storage();
    let storageRef = storage.ref();
    let uploadTask = storageRef.child('folder/' + file.name + Date.now()).put(file);
    let database = firebase.firestore();
  
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>{

        },(error) =>{
          throw error
        },() =>{
        uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
          this.setState({
            imageURL: url
          })
          database.collection("woods").add({
            specie: values.specie === "other" ? values.other : values.specie,
            density: values.density,
            cut: values.cut,
            planer: values.planer,
            weight: values.weight,
            sandpaper: values.sandpaper,
            lathe: values.lathe,
            woodDetails: [{
              image: url,
              width: values.width,
              height: values.height,
              cutType: values.cutType
            }]
          })
          .then(() => {
            this.props.nextStep();
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
        })
      }
    ) 
  }

	renderSelectOptions = () => {
    const woodList = getWoods();
		return(<>
      {woodList.map( wood => <option value={wood.value}>{wood.name}</option>)}
    </>)
	}

  render() {
    const { values, inputChange } = this.props;
    
    return (
      <div className="form-container">
          <h1>Detalhes da Madeira</h1>

        <div className="form-group">
					<label htmlFor="specie">Espécie de madeira</label>
					<select name="specie" id="specie" onChange={inputChange('specie')} value={values.specie} class="form-control form-select" aria-label="Default select example" required>
						<option value="" selected>Selecione uma espécie</option>
						{this.renderSelectOptions()}
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
            <button id="back" className="btn btn-danger" onClick={this.back}>Voltar</button>
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

export default WoodDetails
