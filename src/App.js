import React from 'react';
import { Navbar } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import './App.css';
import Initializer from './components/Initializer';
import IFPE from './resources/ifpe.png';
import UFRPE from './resources/ufrpe.jpeg';

function App() {
  return (
    <div className="App">
      <div className="">
        <Navbar className="nav-header">
          <Navbar.Brand>Wood Capture</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Image className="logo" src={IFPE} />
            <Image className="logo" src={UFRPE} />
          </Navbar.Collapse>
        </Navbar>
        <div className="container">
          <Initializer />
        </div>
      </div>
    </div>
  );
}

export default App;
