import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap';
export class AccountSetup extends Component {
	continue = values => e => {
		e.preventDefault();
		if(this.handleValidation(values)) {
			this.props.nextStep();
		}
	};

	back = e => {	
		e.preventDefault();
		this.props.prevStep();
	};

	handleValidation = (values) => {
		if (values.specie === '') {
			document.getElementsByName("specie")[0].focus();
			document.getElementsByName("specie")[0].style.borderColor="red";
			return false;
		}
		if (values.specie === 'other' && values.other === '') {
			document.getElementsByName("other")[0].focus();
			document.getElementsByName("other")[0].style.borderColor="red";
			return false;
		} 
		return true; 
	} 

	renderSelectOptions = () => {
		return(<>
		<option value="aroeira">Aroeira</option>
		<option value="carvalho">Carvalho</option>
		<option value="cedro">Cedro</option>
		<option value="cerejeira">Cerejeira</option>
		<option value="cumaru">Cumaru</option>
		<option value="freijo">Freijó</option>
		<option value="goiabao">Goiabão</option>
		<option value="imbuia">Imbuia</option>
		<option value="ipe">Ipê</option>
		<option value="itauba">Itaúba</option>
		<option value="jacaranda">Jacarandá</option>
		<option value="louro">Louro</option>
		<option value="nogueira">Nogueira</option>
		<option value="mogno">Mogno</option>
		<option value="pinho">Pinho</option>
		<option value="pinus">Pinus</option>
		<option value="garapeira">Garapeira</option>
		<option value="eucalipto">Eucalipto</option>
		<option value="angelim">Angelim</option>
		<option value="madeira-de-demolicao">Madeira de demolição</option>
		<option value="mdf">MDF</option>
		<option value="other">Outro</option></>)
	}

	render() {
		const { values, inputChange } = this.props;
		
		return (
			<div className="form-container">
					<h1>Informações Básicas</h1>

				<div className="form-group">
					<label htmlFor="specie">Espécie de madeira</label>
					<select name="specie" id="specie" onChange={inputChange('specie')} value={values.specie} class="form-control form-select" aria-label="Default select example" required>
						<option value="" selected>Esocolha uma espécie</option>
						{this.renderSelectOptions()}
					</select>
				</div>
				{ values.specie === "other" && (
					<div className="form-group">
						<label htmlFor="other">Outra</label>
						<input type="text" className="form-control" name="other" onChange={inputChange('other')} value={values.other} required/>
					</div>)
				}

				<div className="form-group">
					<label htmlFor="weight">Peso em gramas (Opcional)</label>
					<input type="number" className="form-control" name="weight" onChange={inputChange('weight')} value={values.weight} />
				</div>
					
				<div className="form-group">
					<label htmlFor="density">Densidade (Opcional)</label>
					<select name="density" onChange={inputChange('density')} value={values.density} class="form-control form-select" aria-label="Default select example">
						<option selected>Esocolha uma espécie</option>
							<option value="leve">Madeira Leve</option>
							<option value="medio">Madeira Média</option>
							<option value="pesada">Madeira Pesada</option>
					</select>
				</div>

				<div className="form-group">
					<label htmlFor="cutType">Corte (Opcional)</label>
					<select name="cutType" onChange={inputChange('cutType')} value={values.cutType} class="form-control form-select" aria-label="Default select example">
						<option selected>Esocolha uma opção</option>
							<option value="facil">Fácil</option>
							<option value="medio">Médio</option>
							<option value="dificil">Difícil</option>
					</select>
				</div>

				<div className="form-group">
					<label htmlFor="planer">Plaina (Opcional)</label>
					<select name="planer" onChange={inputChange('planer')} value={values.planer} class="form-control form-select" aria-label="Default select example">
						<option selected>Esocolha uma opção</option>
							<option value="facil">Fácil</option>
							<option value="medio">Médio</option>
							<option value="dificil">Difícil</option>
					</select>
				</div>

				<div className="form-group">
					<label htmlFor="sandpaper">Lixa (Opcional)</label>
					<select name="sandpaper" onChange={inputChange('sandpaper')} value={values.sandpaper} class="form-control form-select" aria-label="Default select example">
						<option selected>Esocolha uma opção</option>
							<option value="facil">Fácil</option>
							<option value="medio">Médio</option>
							<option value="dificil">Difícil</option>
					</select>
				</div>

				<div className="form-group">
					<label htmlFor="lathe">Torno (Opcional)</label>
					<select name="lathe" onChange={inputChange('lathe')} value={values.lathe} class="form-control form-select" aria-label="Default select example">
						<option selected>Esocolha uma opção</option>
							<option value="facil">Fácil</option>
							<option value="medio">Médio</option>
							<option value="dificil">Difícil</option>
					</select>
				</div>

				<br />
				<Row className="btn-section">
					<Col className="btn-back">
						<button className="btn btn-danger" onClick={this.back}>Voltar</button>
					</Col>
					<Col className="btn-continue">
						<button className="btn btn-primary" onClick={this.continue(values)}>Continuar</button>
					</Col>
				</Row>
					
			</div>
		)
	}
}

export default AccountSetup
