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
  }
  
  validateFields = (values) => {
    let count = 0;

    if(values.image === '') {
      count++;
      document.getElementsByName("imageUrl")[0].style.borderColor="red";
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
        let progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes))*100
      },(error) =>{
        throw error
      },() =>{
      uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
        this.setState({
          imageURL: url
        })
        database.collection("woods").add({
          specie: values.specie || values.other,
          density: values.density,
          cutType: values.cutType,
          planer: values.planer,
          weight: values.weight,
          sandpaper: values.sandpaper,
          lathe: values.lathe,
          woodDetails: [{
            image: url,
            width: values.width,
            height: values.height,
            view: values.view
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

  render() {
    let { values, inputChange } = this.props;
    
    return (
      <div className="form-container">
          <h1>Detalhes da Madeira</h1>

        <div className="form-group">
          <label htmlFor="image">Imagem</label>
          <input type="file" class="form-control-file" name="image" onChange={inputChange('imageUrl')} id="image"></input>
        </div>
        <div className="form-group">
          <img
            className="ref"
            src={values.imageUpload || "https://via.placeholder.com/400x300"}
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
