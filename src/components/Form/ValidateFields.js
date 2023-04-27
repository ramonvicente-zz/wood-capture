const validateFields = (values) => {
    let labelsName = '';

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