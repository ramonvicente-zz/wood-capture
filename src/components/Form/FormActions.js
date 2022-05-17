export const loadButton = () => {
	document.getElementById("without-load").style.display = "none";
	document.getElementById("with-load").style.display = "block";
}

export const disableFields = () => {
	document.getElementById("back").setAttribute("disabled","disabled");
	document.getElementById("imageUrl").setAttribute("disabled","disabled");
	document.getElementById("width").setAttribute('readonly', true);
	document.getElementById("height").setAttribute('readonly', true);
	document.getElementById("cutType").setAttribute('readonly', true);
}

export const getSelectOptions = (key) => {
  let response = []; 
  switch (key) {
    case 'default':
      response = [
        {name:'Fácil', value:'facil'},
        {name:'Médio', value:'medio'},
        {name:'Difícil', value:'dificil'}
      ]
      break;

    case 'cutType':
      response = [
        {name:'Topo', value:'topo'},
        {name:'Tangencial', value:'tangencial'},
        {name:'Radial', value:'radial'}
      ]
      break;

      case 'density':
        response = [
          {name:'Madeira Leve', value:'leve'},
          {name:'Madeira Média', value:'media'},
          {name:'Madeira Pesada', value:'pesada'}
        ]
        break;
  }
  return response;
}