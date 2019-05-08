window.Utils = window.Utils || {}
Utils.SvgIcon = function(id, path, color) {
	var i = document.createElementNS("http://www.w3.org/2000/svg", "path");
	i.setAttributeNS(null, "d", path);
	i.setAttribute("data-original", path);
	if (color != undefined) {
		i.setAttribute('fill', color);
	}
	i.setAttribute("class", id || "");
	return i;
};