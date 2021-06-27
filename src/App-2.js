import React, { Component } from 'react'
import './App.css';
import firebase from "./firebase/firebase"

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar'

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      image: null,
      progress:0,
      downloadURL: null,
      checkBox: ''
    }
  }


  handleChange = (e) =>{
    if(e.target.files[0]){
      this.setState({
      image: e.target.files[0]
    })
    this.setState({
      downloadURL: URL.createObjectURL(e.target.files[0])
    })
  }
    console.log(this.state.progress)
}

inputChange = input => e => {
  this.setState({
      [input]: e.target.value
  });
};

handleUpload = () =>{
  // console.log(this.state.image);
  let file = this.state.image;
  var storage = firebase.storage();
  var storageRef = storage.ref();
  var uploadTask = storageRef.child('folder/' + file.name + Date.now()).put(file);
  var database = firebase.firestore();

  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    (snapshot) =>{
      var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes))*100
      this.setState({progress})
    },(error) =>{
      throw error
    },() =>{
      // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{

    uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
      this.setState({
        downloadURL: url
      })
      database.collection("woods").add({
        name: document.getElementById("woodName").value,
        image: url,
        check: this.state.checkBox 
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    })
    document.getElementById("file").value = null

   }
 ) 
}


  render() {
    return (
      <Container>
        <Row className="justify-content-center text-center">
          <Jumbotron>
            <h1 className="">Olá, seja bem vindo(a)!</h1>
            <p>
              Insira a imagem de uma madeira e informe seu respectivo nome para que possamos armazenar no nosso banco de dados.
            </p>
        </Jumbotron>
        </Row>
        <Row className="justify-content-md-center text-center">
            <Col md="8" className="welcome">
                <img
                  className="ref"
                  src={this.state.downloadURL || "https://via.placeholder.com/400x300"}
                  alt="Uploaded Images"
                  height="300"
                  width="400"
                />
            </Col>
        </Row>
        <Row className="justify-content-md-center  text-center mt-2">
          <Col md="8" className="welcome">
            <input type="text" placeholder="Nome da Madeira" id="woodName"></input>
          </Col>
        </Row>
        <Row className="justify-content-md-center text-center mt-2">
            <Col md="8" className="welcome">
            <label>
              Escolher imagem
              <input type="file" id="file" onChange={this.handleChange} />        
            </label> {' '}
            <Button onClick={this.handleUpload}>Cadastrar</Button>
            </Col>
        </Row>
        <div className="form-group check-element">
              <label htmlFor="name">Visão da madeira</label>
              <br />
              <input type="radio" className="btn-check" name="topo" onChange={this.inputChange('checkBox')} value={this.state.checkBox} id="option1" autocomplete="off"/>
              <label class="btn btn-secondary" for="option1">Topo</label>

              <input type="radio" className="btn-check" name="tangencial" onChange={this.inputChange('checkBox')} value={this.state.checkBox}  id="option2" autocomplete="off"/>	
              <label class="btn btn-secondary" for="option2">Tangêncial</label>

              <input type="radio" className="btn-check" name="radial" onChange={this.inputChange('checkBox')} value={this.state.checkBox}  id="option4" autocomplete="off"/>
              <label class="btn btn-secondary" for="option4">Radial</label>
          </div>

        {this.state.progress > 0 && this.state.progress <=100 ?
        <Row className="justify-content-md-center text-center">
             <Col md="8" className="welcome">
              <ProgressBar animated now={this.state.progress} label={`${this.state.progress}%`}/>
            </Col>
        </Row>
        : ''}
      </Container>
    )
  }
}