import React, { Component } from 'react';
import WoodDetails from './WoodDetails';
import StartForm from './StartForm';
import ThankYou from './ThankYou';

export class Form extends Component {
  state = {
    step: 1,
    specie: '',
    other: '',
    density: '',
    cut: '',
    planer: '',
    weight: '',
    sandpaper: '',
    lathe: '',
    imageUrl: '',
    imageUpload: '',
    width: '',
    height: '',
    cutType: ''
  };

  nextStep = () => {
      const { step } = this.state;
      this.setState({ step: step + 1 });
  };

  prevStep = () => {
      const { step } = this.state;
      this.setState({ step: step - 1 });
  };

  inputChange = input => element => {
      if(input === 'imageUrl') {
        this.setState({
          imageUrl: element.target.files[0]
        });
        this.setState({
          imageUpload: URL.createObjectURL(element.target.files[0])
        }); 
      } else {
        this.setState({
          [input]: element.target.value
        });
      }
  };

  newRegister = () => {
		const { step } = this.state;
		this.setState({ step: step - 2 });
	};

  render() {
    const { step } = this.state;
    const { specie, other, density, cut, planer, weight, sandpaper, lathe, imageUrl, imageUpload, width, height, cutType } = this.state;
    const values = { specie, other, density, cut, planer, weight, sandpaper, lathe, imageUrl, imageUpload, width, height, cutType };

    switch (step) {
      case 1:
        return (
          <StartForm
            nextStep={this.nextStep}
          />
        );
      case 2:
        return (
          <WoodDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            inputChange={this.inputChange}
            values={values}
          />
        );
      case 3:
        return (
          <ThankYou
            newRegister={this.newRegister}
          />
        );
      default:
    }
  }
}

export default Form
