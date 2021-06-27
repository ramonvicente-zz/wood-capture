import React from 'react';
import { Navbar } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import './App.css';
import Form from './components/Form';
import IFPE from './ifpe.png';
import UFRPE from './ufrpe.jpeg';

function App() {
  return (
    <div className="App">
      <div className="">
        <Navbar className="nav-header">
          <Navbar.Brand>Smart Wood Database</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Image className="logo" src={IFPE} />
            <Image className="logo" src={UFRPE} />
          </Navbar.Collapse>
        </Navbar>
        <div className="container">
          <Form />
        </div>
      </div>
    </div>
  );
}

export default App;
