const validateFields = (values) => {
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

    if(values.cutType === '') {
      labelsName+='- Tipo de Corte \n';
      document.getElementsByName("cutType")[0].focus();
      document.getElementsByName("cutType")[0].style.borderColor="red";
    } else {
      document.getElementsByName("cutType")[0].style.borderColor="#ced4da";
    }

    return labelsName;
  }

  export default validateFields;