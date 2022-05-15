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
