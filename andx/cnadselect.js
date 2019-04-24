function get(a){return arguments[1] ? arguments[1].getElementsByTagName(a) : document.getElementById(a)}
ANDX = {};
ANDX.cnadSelect = function(conf){
	var sIdNameSelect = "-childselect-";
	var sIdNameInput = "-childinput-";
	var sDataPath = (conf.data && conf.data.path) ? conf.data.path : "/data/";
	var sDataTop = (conf.data && conf.data.top) ? conf.data.top : "100000";
	var sDataExtension = (conf.data && conf.data.extension) ? conf.data.extension : ".json";
	var sInputId = getInputId();
	var aDefault = get(sInputId).value.split(",");
	var iLevel = 0;
	var aData = [];
	function setSelect(iLevelThis, sFileName)
	{
		var sUrl = sDataPath + sFileName + sDataExtension;
		var x = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
		x.open('GET', sUrl, true);
		x.send(null);
		x.onreadystatechange = function() {
			if (x.readyState == 4 && x.status == 200)
			{
				var iNum = 0;
				var sSelected = (aDefault.length > iLevelThis) ? aDefault[iLevelThis] : "";
				var eSelect = document.createElement('select');
				eSelect.id = conf.container + sIdNameSelect + iLevelThis;
				if(conf.css) eSelect.className = conf.css;
				eSelect.onchange = function(){changeSelect(iLevelThis, eSelect.id);};
				var oData = JSON.parse(x.responseText);
				aData[iLevelThis] = oData;
				for (key in oData)
				{
					var eOption=document.createElement("option");
					eOption.value = key;
					eOption.text = oData[key].name;
					if (sSelected == "")
					{
						if (iNum == 0) eOption.selected = 'selected';
					}
					else if (key == sSelected) eOption.selected = 'selected';
					eSelect.add(eOption);
					iNum ++;
				}
				get(conf.container).appendChild(eSelect);
				var sNextKey = get(eSelect.id).value;
				if (oData[sNextKey].next == 1)
				{
					setSelect((iLevelThis + 1), sNextKey);
				}
				iLevel ++;
				update();
			}
		};
	}
	function changeSelect(iLevelThis, sSelectId)
	{
		removeSelect(iLevelThis + 1);
		if (aData[iLevelThis][get(sSelectId).value].next == 1)
		{
			setSelect((iLevelThis + 1), get(sSelectId).value);
		} else {
			update();
		}
	}
	function removeSelect(iLevelThis)
	{
		aData.splice(iLevelThis, (iLevel - iLevelThis));
		for (var i=iLevelThis; i<iLevel; i++)
		{
			if(get(conf.container + sIdNameSelect + i))
			{
				get(conf.container).removeChild(get(conf.container + sIdNameSelect + i));
			}
		}
		iLevel = iLevelThis;
	}
	function update()
	{
		var newData = "";
		for (var i=0; i<iLevel; i++)
		{
			if(i==0) newData += get(conf.container + sIdNameSelect + i).value;
			else  newData += "," + get(conf.container + sIdNameSelect + i).value;
		}
		get(sInputId).value = newData;
	}
	function getInputId()
	{
		if (conf.input)
		{
			if(get(conf.input)) return conf.input;
			else console.log("The input id '"+conf.input+"' can't be found.");
		}
		var iInputNum = 0;
		var sInputIdThis = conf.container + sIdNameInput + iInputNum;
		for(var i=0; i<get(conf.container).childNodes.length; i++)
		{
			if(get(conf.container).childNodes[i].tagName=="INPUT"){
                get(conf.container).childNodes[i].id = conf.container + sIdNameInput + iInputNum;
				iInputNum ++;
            }
        }
		if(iInputNum < 1) console.log("There is no container (such as 'input') for receiving data.");
		return sInputIdThis;
	}
	setSelect(0, sDataTop);
};
//	Powered by Transidc.com		Github: https://github.com/Transidc/CNAD-SELECT/