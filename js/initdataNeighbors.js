// Copyright (c) 2012 Thomas Tran 
// Date: 06/05/2012

var neighborCountries = new Array();
var neighborCountryNames = new Array();
var neighborWorldMap = new Object();
var neighborTargetMap = new Object();
var neighborCountryInSet = new Array();
var neighToggle;
var projectTitle, projectSubtitle;

	function initReadXML()	 {
	   var file="xml/cip_" + projCode + "_neighborsHTML5.xml"
	
	     var xmlObj = new load_XML(file);
	     projectTitle = xmlObj.tagNameElement("xmlData")[0].getAttribute("title");
	     projectSubtitle =  xmlObj.tagNameElement("xmlData")[0].getAttribute("subtitle");
	     console.log(projectTitle);
         var neighborXMLObj = xmlObj.tagNameElement("worldMap");
		 	 neighborWorldMap.src = neighborXMLObj[0].getAttribute('src');
			 neighborWorldMap.X= neighborXMLObj[0].getAttribute('X');
			 neighborWorldMap.Y = neighborXMLObj[0].getAttribute('Y');
			 neighborWorldMap.worldMapWidth = neighborXMLObj[0].getAttribute('worldMapWidth');
			 neighborWorldMap.worldMapHeight = neighborXMLObj[0].getAttribute('worldMapHeight');
			
			 
			 //neighborTargetMap
		     neighborXMLObj = xmlObj.tagNameElement("targetMap");
			 neighborTargetMap.map = neighborXMLObj[0].getAttribute('map');
		     neighborTargetMap.mapFlag = neighborXMLObj[0].getAttribute('mapFlag');
			 neighborTargetMap.flagIconSizeRatio = neighborXMLObj[0].getAttribute('flagIconSizeRatio');
		     neighborTargetMap.showLowerInstr = neighborXMLObj[0].getAttribute('showLowerInstr');
			 neighborTargetMap.hintBoxAlign = neighborXMLObj[0].getAttribute('hintBoxAlign');
		
		
			 var neighborXMLObj = xmlObj.tagNameElement("country");
			 for(var i = 0; i < neighborXMLObj.length; i++){
				 var obj = new Object();
				 var nameID;
				 var countryName;
			     var itemChilds = neighborXMLObj[i].childNodes;
					 for(var j=0; j< itemChilds.length; j++){
						 var xmlNode = itemChilds[j];
						 
						 switch (xmlNode.nodeName){
									case 'name':
										  obj.countryName = xmlNode.firstChild.nodeValue;
										 countryName = xmlNode.firstChild.nodeValue;
									break; 
									case 'hint':
										     obj.hint = parseInlineNodes(xmlNode).innerHTML;
									break;
									case 'map':
									           var mapObj = new Object();
											    mapObj.flagSRC = xmlNode.getAttribute('flagSRC');
			 									mapObj.flagX = xmlNode.getAttribute('flagX');
												mapObj.flagY = xmlNode.getAttribute('flagY');
												mapObj.dropPointX = xmlNode.getAttribute('dropPointX');
												mapObj.dropPointY = xmlNode.getAttribute('dropPointY');
												mapObj.dropBoxWidth = xmlNode.getAttribute('dropBoxWidth');
												mapObj.dropBoxHeight = xmlNode.getAttribute('dropBoxHeight');
												mapObj.lineDegree = xmlNode.getAttribute('lineDegree');
												mapObj.lineWidth = xmlNode.getAttribute('lineWidth');
												mapObj.conNameWithLine = xmlNode.getAttribute('conNameWithLine');
												mapObj.mapRollOverCollor= xmlNode.getAttribute('mapRollOverCollor');
										       obj.map = mapObj;
									 break;
									 case 'finalMap':
									           var finalMapObj = new Object();
											    finalMapObj.width = xmlNode.getAttribute('width');
			 									finalMapObj.height = xmlNode.getAttribute('height');
												finalMapObj.namePosX = xmlNode.getAttribute('namePosX');
												finalMapObj.namePosY = xmlNode.getAttribute('namePosY');
												finalMapObj.nameDegree = xmlNode.getAttribute('nameDegree');
												
												finalMapObj.finalMapX = xmlNode.getAttribute('finalMapX');
												finalMapObj.finalMapY = xmlNode.getAttribute('finalMapY');
												finalMapObj.numZoom= xmlNode.getAttribute('numZoom');
												finalMapObj.regionNames = xmlNode.getAttribute('regionNames');
												finalMapObj.regionNames_X = xmlNode.getAttribute('regionNames_X');
												finalMapObj.regionNames_Y = xmlNode.getAttribute('regionNames_Y');
												finalMapObj.regionNames_Width = xmlNode.getAttribute('regionNames_Width');
												finalMapObj.regionNames_Degree = xmlNode.getAttribute('regionNames_Degree');
										        obj.finalMap = finalMapObj;
									 break;
									 case 'button':
									           var buttonObj = new Object();
											    buttonObj.width = xmlNode.getAttribute('width');
			 									buttonObj.height = xmlNode.getAttribute('height');
										       obj.button = buttonObj;
									 break;
									 case 'legend':
									           var legendArray = new Array();
											   var index=0;
											    var legenChilds = xmlNode.childNodes;
					 								for(var x=0; x< legenChilds.length; x++){
														var legendXMLNode = legenChilds[x];
												    	switch (legendXMLNode.nodeName){
															case 'icon':
															   var legendObj = new Object();
													    		legendObj.name = legendXMLNode.getAttribute('name');
																legendObj.text= legendXMLNode.firstChild.nodeValue;
																legendArray[index] = legendObj;	
																index ++; 
															 break;
														}
														
													}
												 obj.legend = legendArray;
									 break;
									 
									  case 'inset':
									           var insetArray = new Array();
											   var index=0;
											    var insetChilds = xmlNode.childNodes;
					 								for(var y=0; y< insetChilds.length; y++){
														var insetXMLNode = insetChilds[y];
														switch (insetXMLNode.nodeName){
															case 'icon':
																    var insetObj = new Object();
											    					insetObj.name = insetXMLNode.getAttribute('name');
																	insetObj.X = insetXMLNode.getAttribute('X');
																	insetObj.Y = insetXMLNode.getAttribute('Y');
																	insetObj.text= parseInlineNodes(insetXMLNode).innerHTML;
																	insetArray[index] = insetObj;	
																    index ++; 
															 break;
														  }
														
													 }
												 obj.inset = insetArray;
									 break;
						 }//end switch
					 }//end for
					 neighborCountryNames[i] =countryName;
					 nameID="neighbor" + countryName.replace(/[" "]/g, "and");
					 neighborCountries[nameID]=obj;
					
					 
			 }//end for
			//alert(neighborCountryNames.length);
	} //end initReadXML() function
			


function loadNeighbors_HTML5() {
	initReadXML();
				loadInitMap();
				neighborCreateButtons();
	
	}


function loadInitMap() {
		var neighborsHTML5 = ce('div');
	    neighborsHTML5.setAttribute('id', "neighborsHTML5");
		document.getElementById('HTML5').appendChild(neighborsHTML5);
		
	var titleDiv = document.createElement("div");
				 titleDiv.id = "title";
				 titleDiv.innerHTML = projectTitle + " | " + "<span class='subtitle'>" + projectSubtitle + "</span>";
		         neighborsHTML5.appendChild(titleDiv);
		         
	var neighborIntrBtn = ce('div');
	neighborIntrBtn.innerHTML="Instructions";
	    neighborIntrBtn.setAttribute('id', "neighborIntrBtn");
			    neighborIntrBtn.onmouseover = function() {
		this.style.cursor="pointer";
		this.style.color = "#F00000";
}
 neighborIntrBtn.onmouseout = function() {
		this.style.color = "#000000";
}
		neighborIntrBtn.onclick = function () { //load instruction when button is clicked.
			loadInstruction(); 
		};
		document.getElementById('neighborsHTML5').appendChild(neighborIntrBtn);
	
	var mainDiv = ce('div');
	    mainDiv.setAttribute('id', "neighborMainMap");
		var neighborSVGMap = ce('div');
	    neighborSVGMap.setAttribute('id', "neighborSVGMap");
		mainDiv.appendChild(neighborSVGMap);
		
		var neighImgDiv = ce('img');
		var imgSRC= "images/neighbors/"+neighborWorldMap.src;
	
		//alert(imgSRC);
		neighImgDiv.setAttribute('src', imgSRC);
		neighImgDiv.setAttribute('id', "neighborWorldMap");
		mainDiv.appendChild(neighImgDiv);
		var neighborTarget= ce('img');
			imgSRC= "images/neighbors/"+neighborTargetMap.mapFlag;
				
		neighborTarget.setAttribute('src', imgSRC);
		neighborTarget.setAttribute('id', "neighborTarget");
		mainDiv.appendChild(neighborTarget);
		document.getElementById('neighborsHTML5').appendChild(mainDiv);
		
		var neighborInstrAnimateDiv= ce('div');
	    neighborInstrAnimateDiv.setAttribute('id', "neighborInstrAnimateDiv");
		var neighborDisplayMap = ce('div');
	    neighborDisplayMap.setAttribute('id', "neighborDisplayMap");
		neighborDisplayMap.appendChild(neighborInstrAnimateDiv);
		document.getElementById('neighborsHTML5').appendChild(neighborDisplayMap);
		
		var neighborSVGMapDivTarget= ce('div'); // create div SVG Target and place Map in there.
	     neighborSVGMapDivTarget.setAttribute('id', "neighborSVGMapDivTarget");
		document.getElementById("neighborDisplayMap").appendChild(neighborSVGMapDivTarget);
		var neighborLegend= ce('div'); // create div SVG Target and place Map in there.
	     neighborLegend.setAttribute('id', "neighborLegend");
		 neighborLegend.innerHTML="Legend";
		document.getElementById("neighborDisplayMap").appendChild(neighborLegend);
		
		var neighborDisplayLegend= ce('div'); // create div SVG Target and place Map in there.
	     neighborDisplayLegend.setAttribute('id', "neighborDisplayLegend");
		 var st ='<div class="neighborTopBorderBox"></div><div id="neighborBodyBorderBox"><div><div class="legendTitle">';
		     st +='Legend</div><div id="neighborLegendCloseBtn">Close<span style="margin:0px 0px 0px 0px; padding:10px 0px 0px 5px;"><img src="images/neighbors/close.png" width="15px" height="14px" hspace="0" vspace="0" border="0" />';
			 st +='</span></div></div><div id="neighborLegendsIcon"></div></div><div class="neighborBottomBorderBox"></div>';
		 neighborDisplayLegend.innerHTML =st;
		document.getElementById("neighborDisplayMap").appendChild(neighborDisplayLegend);
		
		
		var neighborDivIconInfo= ce('div'); // create div SVG Target and place Map in there.
	     neighborDivIconInfo.setAttribute('id', "neighborDivIconInfo");
		document.getElementById("neighborDisplayMap").appendChild(neighborDivIconInfo);
		
		var neighborCommentBox= ce('div'); // create div SVG Target and place Map in there.
	     neighborCommentBox.setAttribute('id', "neighborCommentBox");
		document.getElementById("neighborDisplayMap").appendChild(neighborCommentBox);
		var neighborTargetHelp= ce('div'); // create div SVG Target and place Map in there.
	    neighborTargetHelp.setAttribute('id', "neighborTargetHelp");
		neighborTargetHelp.innerHTML="Move cursor over icons.";
		document.getElementById("neighborDisplayMap").appendChild(neighborTargetHelp);
		
		loadInstruction();//load instruction
		
		
		
		
		$("#neighborWorldMap").css({'width': '722px','height': '391', 'left':'-282px', 'top':'-37px'});
		var neighborWorldMapWidth= parseFloat(neighborWorldMap.worldMapWidth) +"px";
		var neighborWorldMapHeight= parseFloat(neighborWorldMap.worldMapHeight) +"px";
		var left=0, top =0;
		if (parseFloat(neighborWorldMap.X) >0)
			left = "-" + neighborWorldMap.X +"px";
		else
		    left = neighborWorldMap.X +"px";
		if (parseFloat(neighborWorldMap.Y) >0)
			top = "-" + neighborWorldMap.Y +"px";
		else 
		    var top = neighborWorldMap.Y +"px";
			//alert(top);
        $("#neighborWorldMap").animate({'width': neighborWorldMapWidth,'height': neighborWorldMapHeight, 'left':left, 'top':top}, 3000, function() {
	       document.getElementById("neighborTarget").style.display="block";
		//$("#neighborTarget").animate({  width: '440px',height: '320', left:'0px', top:'0px', opacity: '1.0'}, 1000, function() {
	       //  initMaps(); //load SVG Maps.
 //});
 	$("#neighborTarget").animate({ opacity: '1.0'}, 600, function() {
	       initMaps(); //load SVG Maps.
});
 });
  
	 
		 
}

function parseInlineNodes(xmlNode){
		 var inlPart = ce('span');
			for(var i=0; i<xmlNode.childNodes.length; i++){
				var hPart;
				var xPart = xmlNode.childNodes[i];
					if(xPart.nodeName == '#text'){
							hPart = ce('span');
							hPart.appendChild(ctn(xPart.data));
				
					}  else {
							hPart = ce(xPart.nodeName); //html tags (b, u, i etc.)
							if(xPart.firstChild)
									hPart.appendChild(ctn(xPart.firstChild.data));
					}
					inlPart.appendChild(hPart);
			}
			return inlPart;
	}
	
	
function ce(name){
		var dn = document.createElement(name);
		return dn;
}
function ctn(from){
		 var tn = document.createTextNode(from);
		return tn;
}
function convertTextToUnicode(string){
	            var z = []
				var s = new String(string);
				for(var q=0; q < s.length;  q++)
          				z.push( "&#" + s.charCodeAt(q) + ";");
						
           		return z.join("");			
}

function loadInstruction() {
	var obj = document.getElementById('neighborInstrAnimateDiv');
	obj.style.display="block";
	document.getElementById("neighborLegend").style.display="none";
	 document.getElementById("neighborDivIconInfo").style.display= "none";
	document.getElementById("neighborDisplayLegend").style.display= "none";
	document.getElementById("neighborSVGMapDivTarget").style.display= "none";
	obj.innerHTML="";
	
	var tempTextDiv = ce('div');
	tempTextDiv.setAttribute('id', "neighborInstrText");
	if (browserDetection()=="firefox")
	      tempTextDiv.style.top = "8px";
	tempTextDiv.appendChild(ctn("Drag the button to the empty box which belongs to the country on the map."));
	obj.appendChild(tempTextDiv);
	var tempImg = ce('img');
	tempImg.setAttribute('src', "images/neighbors/instructions.gif");
	tempImg.style.position="absolute";
    tempImg.style.left= "0px";
	tempImg.style.top= "0px";
	
	obj.appendChild(tempImg);
	
	
	
}
function neighborCreateButtons () {
	 var outerDivButtons = ce('div');
	     outerDivButtons.id="outerDivButtons";
	     document.getElementById('neighborsHTML5').appendChild(outerDivButtons);
		 
       var button= ce('div');
	    button.setAttribute('id', "neighborBottomInstr"); 
		button.appendChild(ctn("Drag the buttons to the map"));
		if (neighborTargetMap.showLowerInstr.toLowerCase()== "true")
				button.style.display="none";
		else
		       button.style.display="block";
		outerDivButtons.appendChild(button);
		
		for(var i = 0; i < neighborCountryNames.length; i++){
		     button= ce('div'); 
		 var text = "neighbor" + neighborCountryNames[i].replace(/[" "]/g, "and") +"_btn";
		 var neighTemp= neighborCountries["neighbor" + neighborCountryNames[i].replace(/[" "]/g, "and")].button;
		     button.setAttribute('id', text);
			 button.className = 'drag';
			 button.onclick =function() {
				var name = this.id;
				  name =name.split("_btn");
				 showEthnicHintBox(name[0]);
			 };
			
			 button.style.left = "0px";
			 button.style.width = neighTemp.width +"px";
			 button.style.height = neighTemp.height +"px";
			 button.innerHTML= convertTextToUnicode(neighborCountries["neighbor" + neighborCountryNames[i].replace(/[" "]/g, "and")].countryName);
			 outerDivButtons.appendChild(button);
			
		 	 
	}
	 
 
}

function neighborDropArea() {

	
	
	 for(var i = 0; i < neighborCountryNames.length; i++){
		 var neighTemp= neighborCountries["neighbor" + neighborCountryNames[i].replace(/[" "]/g, "and")];
			
		 var box= ce('div');
		     box.className = 'dropOutsideBox';
			 box.setAttribute('id', "neighbor" + neighborCountryNames[i].replace(/[" "]/g, "and") +"_outBox");
			//box.style.width = (parseFloat((neighTemp.map).dropBoxWidth) + parseFloat((neighTemp.map).drawlineHeight))+"px";
			//box.style.height = (parseFloat((neighTemp.map).dropBoxHeight) + parseFloat((neighTemp.map).drawlineHeight))+"px";
           var lineImg = ce('img');
		       lineImg.className = 'neighLineDropBox';
			   lineImg.setAttribute('src', "images/neighbors/2pxLine.png");
			   lineImg.setAttribute('id', "neighborLineImg" + neighborCountryNames[i].replace(/[" "]/g, "and"));
		       box.appendChild(lineImg); 
			var cirleImg = ce('img');
		       cirleImg.className = 'neighLineDropBox';
			   cirleImg.setAttribute('src', "images/neighbors/smallball.png");
			   cirleImg.setAttribute('id', "neighborCirleImg" + neighborCountryNames[i].replace(/[" "]/g, "and"));
		       box.appendChild(cirleImg); 
		 var button= ce('div');
		  	 button.setAttribute('id', "neighbor" + neighborCountryNames[i].replace(/[" "]/g, "and"));
			 button.className = 'neighDrop';
			 box.appendChild(button); 
			 
	         document.getElementById('neighborMainMap').appendChild(box);
			 var neighBoxWidth = parseFloat((neighTemp.map).dropBoxWidth);
			 var neighBoxHeight = parseFloat((neighTemp.map).dropBoxHeight);
			 var neighDropPointX = parseFloat((neighTemp.map).dropPointX);
			 var neighDropPointY = parseFloat((neighTemp.map).dropPointY);
			 var neighLineDegree = parseFloat((neighTemp.map).lineDegree);
			 var neighLineWidth = parseFloat((neighTemp.map).lineWidth);
			 var namelineID=lineImg.getAttribute('id');
			 var nameCirleID=cirleImg.getAttribute('id');
			 var nameButtonID=button.getAttribute('id');
			 var nameBoxID= box.getAttribute('id');
			  rotateDropBox(namelineID, nameCirleID, nameButtonID, nameBoxID, neighBoxWidth, neighBoxHeight, neighLineWidth, neighLineDegree,  neighDropPointX, neighDropPointY);
	       
			  document.getElementById('neighborMainMap').appendChild(box);
			document.getElementById("neighbor" + neighborCountryNames[i].replace(/[" "]/g, "and")).onmouseover= function(){
				  var name=this.getAttribute('id')+"_1";
				 // alert(name);
				var targetID= $( this ).attr( "id" );
				 neighborConSVGArrayObjs[name].attr({'fill': neighborCountries[targetID].map.mapRollOverCollor,'fill-opacity': 0.7});
				  
			   
			    }
			  document.getElementById("neighbor" + neighborCountryNames[i].replace(/[" "]/g, "and")).onmouseout= function(){
				 var name=this.getAttribute('id')+"_1";
				 neighborConSVGArrayObjs[name].attr({'fill': neighborConSVGArray[name].fill,'fill-opacity': 1});
				
			    }		
	 }//end for loop
	 	 var neighborHintBox= ce('div'); // insert Hint Box;
	     neighborHintBox.setAttribute('id', "neighborHintBox");
		 document.getElementById('neighborMainMap').appendChild(neighborHintBox);

	 
	 neighborLoadDragAndDrop();
	 
	
	 	 
} //End  neighborDropArea()


function neighborLoadDragAndDrop() {
	$(function() {
		 for(var i = 0; i < neighborCountryNames.length; i++){
			 var iddrag="#" + "neighbor" + neighborCountryNames[i].replace(/[" "]/g, "and") +"_btn";
			
			var iddrop= "#" +"neighbor" + neighborCountryNames[i].replace(/[" "]/g, "and");
			$(iddrag).draggable({
   					start: function(event, ui) { 
					 $('#neighborHintBox').css('display', 'block');
							document.getElementById("neighborLegend").style.display= "none";
					        document.getElementById("neighborDisplayLegend").style.display= "none";
							            var name=   $( this ).attr( "id" );
										    name= name.split("_")[0];
								               showEthnicHintBox(name);   
											  
							
				   }
			});
			$( "#neighborSVGMap" ).droppable({
						drop: function( event, ui ) {
					$(ui.draggable).draggable({ revert: true });
					
					}
			});
			$( "body" ).droppable({
						drop: function( event, ui ) {
					$(ui.draggable).draggable({ revert: true });
					
					}
			});
			$( iddrop ).droppable({
							drop: function( event, ui ) {
								
								 $('#neighborHintBox').css('display', 'none');
									var dragTargetID = $(ui.draggable).attr( "id" );
									dragTargetID = dragTargetID.split("_")[0];
									var dropTargetID= $( this ).attr( "id" );
									if (dragTargetID == dropTargetID) {
										   neighToggle =true;
								   		  $(ui.draggable).css('display', 'none');
										  
									
										var objName= dropTargetID + "_1";
										neighborConSVGArrayObjs[objName].attr({'cursor': "pointer"});
										neighborConSVGArrayObjs[objName].attr({'fill': neighborCountries[dropTargetID].map.mapRollOverCollor,'fill-opacity': 1});
										neighborConSVGArrayObjs[objName].hover(function(){
														//this.animate({ 'fill': "#a3d275", 'fill-opacity': 1}, 0);
														this.attr({'fill': neighborCountries[dropTargetID].map.mapRollOverCollor,'fill-opacity': 1});
												}, function(){
													this.attr({'fill': neighborConSVGArray[this.id].fill,'fill-opacity': 1});
			                                          // this.animate({ fill: neighborConSVGArray[this.id].fill}, 0);
												   });
										
										neighborConSVGArrayObjs[objName].click(function(){
												//alert(neighborConSVGArrayObjs[this.id].id);
												loadTargetInformationOnMap(dropTargetID);
										});
										
										setFlagandCountryNameOnMap(dropTargetID);
									    loadTargetInformationOnMap(dropTargetID);
										
										var outsideBoxDropArea = dropTargetID +"_outBox";
										
										document.getElementById(outsideBoxDropArea).onmouseover= function(){
											neighborConSVGArrayObjs[objName].attr({'fill': neighborCountries[dropTargetID].map.mapRollOverCollor,'fill-opacity': 1});
												
				  						}
										document.getElementById(outsideBoxDropArea).onmouseout= function(){
											neighborConSVGArrayObjs[objName].attr({'fill': neighborConSVGArray[objName].fill,'fill-opacity': 1});
										}	
										
										outsideBoxDropArea = "#" + dropTargetID +"_outBox";
										$(outsideBoxDropArea).css('cursor', 'pointer');
										$( outsideBoxDropArea ).click(function () {loadTargetInformationOnMap(dropTargetID); });
									}
									else {
										$(ui.draggable).draggable({ revert: true });
										var objName= $( this ).attr( "id" ) +"_1";
								 	        neighborConSVGArrayObjs[objName].attr({'fill': "#CBD4C2",'fill-opacity': 1});
									}
								
							},
							over: function( event, ui ) {
								
									var objName= $( this ).attr( "id" ) +"_1";
							 		neighborConSVGArrayObjs[objName].attr({'fill': neighborCountries[$( this ).attr( "id" )].map.mapRollOverCollor,'fill-opacity': 0.7});
							
							},
							out: function( event, ui ) {
								
									var objName= $( this ).attr( "id" ) +"_1";
									//alert(objName);
									neighborConSVGArrayObjs[objName].attr({'fill': neighborConSVGArray[objName].fill,'fill-opacity': 1});
							
							}
				}); //droppable method
		 }//end for
	}); // end jquery
		
	
	
}//end neighborLoadDragAndDrop()

function showEthnicHintBox(name) {
	 

	 var neighborHintBox=  document.getElementById('neighborHintBox');
 	 var string = '<div class="neighborHintBoxTop"></div>';
         string +='<div id="neighborHintBoxBody">'+neighborCountries[name].hint + '</div><div class="neighborHintBoxBottom"></div>';
	neighborHintBox.innerHTML =string;
	if (neighborTargetMap.hintBoxAlign.toLowerCase() =="topleft"){
	    	 neighborHintBox.style.top= "1px";
			 neighborHintBox.style.left= "0px";
	         neighborHintBox.style.height= (parseFloat(document.getElementById("neighborHintBoxBody").offsetHeight) + 14) +"px";
	} else if (neighborTargetMap.hintBoxAlign.toLowerCase() =="topright"){
		     neighborHintBox.style.top= "1px";
			 neighborHintBox.style.left= "0px";
			 neighborHintBox.style.height= (parseFloat(document.getElementById("neighborHintBoxBody").offsetHeight) + 14) +"px";
	}else if (neighborTargetMap.hintBoxAlign.toLowerCase() =="bottomright"){
	 		neighborHintBox.style.left= "0px";
			 neighborHintBox.style.top= (316 - (parseFloat(document.getElementById("neighborHintBoxBody").offsetHeight)+16)) +"px";
			 neighborHintBox.style.height= (parseFloat(document.getElementById("neighborHintBoxBody").offsetHeight) + 14) +"px";
	} else {
	 		neighborHintBox.style.left= "0px";
	 		neighborHintBox.style.top= (316 - (parseFloat(document.getElementById("neighborHintBoxBody").offsetHeight)+16)) +"px";
	 		neighborHintBox.style.height= (parseFloat(document.getElementById("neighborHintBoxBody").offsetHeight) + 14) +"px";
	}

	

}

function setFlagandCountryNameOnMap(name) {
     var objName= name + "_1";
	 var neighTemp= neighborCountries[name];
	 document.getElementById(name).innerHTML=neighTemp.countryName;
	  document.getElementById(name).style.border="none";
	  document.getElementById(name).style.textTransform="uppercase";
	  document.getElementById(name).style.background="none";
	  
	  if (neighTemp.map.conNameWithLine.toLowerCase() =="no") {
		 document.getElementById((name+"_outBox")).style.display="none";
		  var neighcountryName= ce('div');
		 	 neighcountryName.className = 'neighborCountryFlag';
			 neighcountryName.innerHTML=neighTemp.countryName;
			 neighcountryName.style.textTransform="uppercase";
			 neighcountryName.style.top= (parseFloat((neighTemp.map).flagY) + 40)+ "px";
			 neighcountryName.style.left = (neighTemp.map).flagX + "px";
			 
			 document.getElementById('neighborMainMap').appendChild(neighcountryName);
			 neighcountryName.style.width= neighcountryName.offsetWidth +"px";
			 var neighX = parseFloat (neighcountryName.offsetWidth) -50;
			 if (neighX > 0) 
			  neighcountryName.style.left= parseFloat ((neighTemp.map).flagX) - Math.round(neighX/2)  + "px";
			  else
			  neighcountryName.style.left= parseFloat ((neighTemp.map).flagX) + (Math.round(neighX/2)* (-1))  + "px";

	  }
		 var flagDiv= ce('div');
		 	 flagDiv.className = 'neighborCountryFlag';
			 flagDiv.style.top=  (neighTemp.map).flagY + "px";
			 flagDiv.style.left = (neighTemp.map).flagX + "px";
			 document.getElementById('neighborMainMap').appendChild(flagDiv);
		     flagDiv.innerHTML='<img src="images/neighbors/flags/'+ (neighTemp.map).flagSRC  +'"  width="' + 50*parseFloat(neighborTargetMap.flagIconSizeRatio) +'px" height="'+34*parseFloat(neighborTargetMap.flagIconSizeRatio)+'px" hspace="0" vspace="0" border="0"/>';
			 flagDiv.innerHTML +='<img src="images/neighbors/barLine_1px.png" width="' + 50*parseFloat(neighborTargetMap.flagIconSizeRatio) +'px" height="1px" hspace="0" vspace="0" border="0" style="display:none" id=\"' + name+ "_barLine" + '\" />';
		     flagDiv.onmouseover= function(){
				
				                      this.style.cursor="pointer";
				                      document.getElementById(name+ "_barLine").style.display="block";
									  neighborConSVGArrayObjs[objName].attr({'fill': neighborCountries[name].map.mapRollOverCollor,'fill-opacity': 1});
			 					 };
		
			 flagDiv.onmouseout= function(){
				                       
				                        this.style.cursor="default";
				 						  document.getElementById(name+ "_barLine").style.display="none";
										 if (neighTemp.map.dropAlign != "none")
									            neighborConSVGArrayObjs[objName].attr({'fill': neighborConSVGArray[objName].fill,'fill-opacity': 1});
			 					 };
								 
							 
								 
			$( flagDiv ).click(function () { loadTargetInformationOnMap(name); });
		
			 
			  
}
function loadTargetInformationOnMap(name) {
    document.getElementById("neighborDivIconInfo").style.display= "none";
	document.getElementById("neighborDisplayLegend").style.display= "none";
	document.getElementById("neighborSVGMapDivTarget").innerHTML="";
	 document.getElementById('neighborInstrAnimateDiv').style.display="none";
	 var neighTemp= neighborCountries[name];
		 document.getElementById("neighborSVGMapDivTarget").style.display="block";
	     var neighborTargetImgWidth= ((440) *parseFloat((neighTemp.finalMap).numZoom)) +"px";
		 var neighborTargetImgHeight= ((320) *parseFloat((neighTemp.finalMap).numZoom)) +"px";
			var left, top;
		if (parseFloat((neighTemp.finalMap).finalMapX) >0)
			left = "-" + (parseFloat((neighTemp.finalMap).finalMapX)  *parseFloat((neighTemp.finalMap).numZoom)) +"px";
		else
		    left = (parseFloat((neighTemp.finalMap).finalMapX)  *parseFloat((neighTemp.finalMap).numZoom)) +"px";
			
		if (parseFloat((neighTemp.finalMap).finalMapY) >0)
			top = "-" + (parseFloat((neighTemp.finalMap).finalMapY)  *parseFloat((neighTemp.finalMap).numZoom)) +"px";
		else 
		    top = (parseFloat((neighTemp.finalMap).finalMapY)  *parseFloat((neighTemp.finalMap).numZoom)) +"px"; 
		
		var neighborTargetImage = ce('img');	
		neighborTargetImage.setAttribute('src', "images/neighbors/"+ neighborTargetMap.map);
		neighborTargetImage.setAttribute('id', "neighborTargetImage");
	    document.getElementById("neighborSVGMapDivTarget").appendChild(neighborTargetImage);
		
		var neighborDivSVG = ce('div');	
		neighborDivSVG.setAttribute('id', "neighborDivSVG");
		document.getElementById("neighborSVGMapDivTarget").appendChild(neighborDivSVG);
			if (parseFloat(neighborTargetImgWidth) < 440)
		        neighborTargetImgHeight="320px";
			
	$("#neighborTargetImage").css({'width': neighborTargetImgWidth,'height': neighborTargetImgHeight}); 
	drawSVGTargetMap(name);

$("#neighborSVGMapDivTarget").animate({'width': neighborTargetImgWidth,'height': neighborTargetImgHeight, 'left':left, 'top':top}, 1000, function() { 
	   
	   

	   loadLegendLogoICon(name);
	   loadNeighborIconInfo(name)
	   
	   
	   
	   ///alert(1);
	   
	});
	   
		
}

function loadLegendLogoICon(name) {
	     document.getElementById("neighborTargetHelp").style.display= "block";
         document.getElementById("neighborDisplayLegend").style.zIndex=1500;
		 document.getElementById("neighborLegend").style.zIndex=1500;
		document.getElementById("neighborLegend").style.display= "block";
		var string ="";
		var neighborDivHeight= 16;
		var neighborObj = neighborCountries[name];
		var neighLedendArray=neighborObj.legend
		 for(var i = 0; i < neighLedendArray.length; i++){
			string += '<div style="clear:both; margin:0px; padding:0px; width:160px; height:40px;"><div class="neighborIconImage"><img src="images/neighbors/icons/' +neighLedendArray[i].name;
			string += '.png" alt=\"'+ neighLedendArray[i].text+'\" title=\"'+ neighLedendArray[i].text+ '\" width="30px" height="30px" hspace="0" vspace="0" border="0"/></div>';
			string +='<div class="neighborIconInfoText">'+neighLedendArray[i].text +'</div></div>';
			neighborDivHeight += 40;
	
		 }
		 document.getElementById("neighborLegendsIcon").innerHTML= string;
		 document.getElementById("neighborLegendsIcon").style.height= neighborDivHeight +"px";
		 document.getElementById("neighborDisplayLegend").style.height= (neighborDivHeight) +"px";
		 document.getElementById("neighborDisplayLegend").style.top = (316 -(neighborDivHeight +18)) +"px";
		
		 //alert(document.getElementById("neighborDisplayLegend").innerHTML);
		document.getElementById("neighborLegend").onclick = function() {
					document.getElementById("neighborLegend").style.display= "none";
					document.getElementById("neighborDisplayLegend").style.zIndex=1500;
					document.getElementById("neighborDisplayLegend").style.display= "block";
					
					document.getElementById("neighborLegendCloseBtn").onclick = function() {
							document.getElementById("neighborLegend").style.display= "block";
							document.getElementById("neighborDisplayLegend").style.display= "none";
					
			
					};
			
		}; 
	
}

function loadNeighborIconInfo(name) {
	 document.getElementById("neighborLegend").style.zIndex=1500;
	document.getElementById("neighborDisplayLegend").style.zIndex=0;
		document.getElementById("neighborDivIconInfo").style.display= "block";
		document.getElementById("neighborDivIconInfo").innerHTML="";
		var string ="";
		var neighborDivTop= 0;
		var neighborDivLeft= 0;
		var neighborDivMax= 0;
		var neighborObj = neighborCountries[name];
		var neighInsetArray=neighborObj.inset
		 for(var i = 0; i < neighInsetArray.length; i++){
				 var divIcon = ce('div');
	             var imgIcon = ce('img');
				 var imgIconSRC= "images/neighbors/icons/"+neighInsetArray[i].name +".png";
					 imgIcon.setAttribute('id', name+ neighInsetArray[i].name);
					 imgIcon.setAttribute('src',imgIconSRC);
					 imgIcon.setAttribute('width', "30px");
					 imgIcon.setAttribute('height', "30px");
					var neighborInSetObj = new Object();
					    neighborInSetObj.name= name;
					 if(parseFloat((neighborObj.finalMap).numZoom) <1)
		                	neighborInSetObj.top= parseFloat(neighInsetArray[i].Y)*1;
					 else
						neighborInSetObj.top= parseFloat(neighInsetArray[i].Y)*parseFloat((neighborObj.finalMap).numZoom);
						neighborInSetObj.left= parseFloat(neighInsetArray[i].X)*parseFloat((neighborObj.finalMap).numZoom);
						neighborInSetObj.text = neighInsetArray[i].text;
				        neighborCountryInSet[name+ neighInsetArray[i].name]=neighborInSetObj;
					 imgIcon.onmouseover= function(){
						 this.style.cursor="pointer";
						var  name= neighborCountryInSet[this.id].name;
					    var top= neighborCountryInSet[this.id].top;
						var left= neighborCountryInSet[this.id].left;
						var text = neighborCountryInSet[this.id].text;
				                loadNeighborCommentBox(name, text , top, left) ;
				     };
			  	 imgIcon.onmouseout= function(){
					  this.style.cursor="default";
					document.getElementById("neighborCommentBox").style.display="none";
					 };
					
					 
					 
		             divIcon.style.position="absolute";
		             divIcon.style.left=(parseFloat(neighInsetArray[i].X)  *parseFloat((neighborObj.finalMap).numZoom)) +"px";
					 if(parseFloat((neighborObj.finalMap).numZoom) <1)
		                  divIcon.style.top=(parseFloat(neighInsetArray[i].Y)  *1) +"px";
					 else
					   divIcon.style.top=(parseFloat(neighInsetArray[i].Y)  *parseFloat((neighborObj.finalMap).numZoom)) +"px";
					 divIcon.style.width= "30px";
					 divIcon.style.height= "30px";
					 divIcon.appendChild(imgIcon);
					 document.getElementById("neighborDivIconInfo").appendChild(divIcon);
					
					 
					 
	
		 }
		 	
		   	var neighborDivName= ce('div');
			    neighborDivName.innerHTML= neighborObj.countryName;
				if (parseFloat((neighborObj.finalMap).width) >0)
				neighborDivName.style.width = (neighborObj.finalMap).width +"px";
				neighborDivName.className="neighborTargetCountryName";
				
		   		neighborDivName.style.left = (parseFloat((neighborObj.finalMap).namePosX)  *parseFloat((neighborObj.finalMap).numZoom)) +"px";
		        neighborDivName.style.top = (parseFloat((neighborObj.finalMap).namePosY)  *parseFloat((neighborObj.finalMap).numZoom)) +"px";
				if ((neighborObj.finalMap).nameDegree && ((neighborObj.finalMap).nameDegree !='null') && ((neighborObj.finalMap).nameDegree != ""))
			  		rotate(neighborDivName, parseFloat((neighborObj.finalMap).nameDegree));
				document.getElementById("neighborDivIconInfo").appendChild(neighborDivName);
				neighborDivName.style.height = parseFloat(neighborDivName.offsetHeight) +"px";
						
		if (((neighborObj.finalMap).regionNames) && ((neighborObj.finalMap).regionNames !="")) {
				var regionNames = (neighborObj.finalMap).regionNames.split(",");
				var regionNamesX = (neighborObj.finalMap).regionNames_X.split(",");
				var regionNamesY = (neighborObj.finalMap).regionNames_Y.split(",");
				var regionNamesWidth = (neighborObj.finalMap).regionNames_Width.split(",");
				var regionNamesDegrees = (neighborObj.finalMap).regionNames_Degree.split(",");
					for( var i = 0; i < regionNames.length; i++){
						 	var neighborDivName= ce('div');
							    neighborDivName.innerHTML= $.trim(regionNames[i]);
								if (parseFloat($.trim(regionNamesWidth[i])) >0)
		   						neighborDivName.style.width = parseFloat($.trim(regionNamesWidth[i])) +"px"; 
								neighborDivName.className="neighborTargetregionNames";
							if ($.trim(regionNamesDegrees[i]) && ($.trim(regionNamesDegrees[i]) != ""))
			  					 rotate(neighborDivName, parseFloat($.trim(regionNamesDegrees[i])));
								neighborDivName.style.left = (parseFloat($.trim(regionNamesX[i]))  *parseFloat((neighborObj.finalMap).numZoom)) +"px";
		        				neighborDivName.style.top = (parseFloat($.trim(regionNamesY[i])) *parseFloat((neighborObj.finalMap).numZoom)) +"px";
				                document.getElementById("neighborDivIconInfo").appendChild(neighborDivName);
								neighborDivName.style.height = parseFloat(neighborDivName.offsetHeight) +"px";
			 	
					} //end for loop inner
		}// END if
				
		var neighborTargetImgWidth= (parseFloat((440)) *parseFloat((neighborObj.finalMap).numZoom)) +"px";
		var neighborTargetImgHeight= (parseFloat((320)) *parseFloat((neighborObj.finalMap).numZoom)) +"px";
		var left, top;
	
			
			if (parseFloat((neighborObj.finalMap).finalMapX) >0)
			left = "-" + (parseFloat((neighborObj.finalMap).finalMapX)  *parseFloat((neighborObj.finalMap).numZoom)) +"px";
		else
		    left = (parseFloat((neighborObj.finalMap).finalMapX)  *parseFloat((neighborObj.finalMap).numZoom)) +"px";
			
		if (parseFloat((neighborObj.finalMap).finalMapY) >0)
			top = "-" + (parseFloat((neighborObj.finalMap).finalMapY)  *parseFloat((neighborObj.finalMap).numZoom)) +"px";
		else 
		    top = (parseFloat((neighborObj.finalMap).finalMapY)  *parseFloat((neighborObj.finalMap).numZoom)) +"px"; 
			
			if (parseFloat(neighborTargetImgWidth) < 440)
		        neighborTargetImgHeight="320px";
			
				$("#neighborDivIconInfo").css({'width': neighborTargetImgWidth,'height': neighborTargetImgHeight, 'left':left, 'top':top}); 
		
	
	
}
function loadNeighborCommentBox(name, text, top, left) {
	
		var neighborObj = neighborCountries[name];
	 document.getElementById("neighborDisplayLegend").style.display= "none";
	 document.getElementById("neighborLegend").style.display= "block";
	       var neighborCommentObj= document.getElementById("neighborCommentBox");
		     neighborCommentObj.style.display="block";
			 
			 var string = '<div id="neighborCommentBoxTarget"><div id="neighborCommentBoxTipTop"></div><div id="neighborCommentBoxTop"></div>';
             string +='<div id="neighborCommentBoxBody"></div><div id="neighborCommentBoxBottom"></div>';
			 string +='<div id="neighborCommentBoxTipBottom"></div></div>';
			 neighborCommentObj.innerHTML= string;
			 document.getElementById("neighborCommentBoxBody").innerHTML= text;
			
			 var neighborTarget= parseFloat(document.getElementById("neighborCommentBoxBody").offsetHeight)+ 60;
		//	 alert(parseFloat(top)+ " "+ neighborTarget);
			 document.getElementById("neighborCommentBoxTarget").style.height=neighborTarget +"px";
			var  neighborTargetPlusTop = neighborTarget + parseFloat(top);
		            document.getElementById("neighborCommentBoxTipTop").style.display="block";
			  		document.getElementById("neighborCommentBoxTipBottom").style.display="none";
					
					document.getElementById("neighborCommentBoxTarget").style.left=  (parseFloat((neighborObj.finalMap).finalMapX)*parseFloat((neighborObj.finalMap).numZoom)+8) +"px";
		     		document.getElementById("neighborCommentBoxTarget").style.top = (parseFloat(top)+30) +"px";
					var tipLeft = parseFloat(left) - (parseFloat((neighborObj.finalMap).finalMapX)*parseFloat((neighborObj.finalMap).numZoom)+2);
					if ( tipLeft > 0)
					document.getElementById("neighborCommentBoxTipTop").style.left=  tipLeft +"px";
		     		
					
		
			var neighborTargetImgWidth= (parseFloat((440)) *parseFloat((neighborObj.finalMap).numZoom)) +"px";
		var neighborTargetImgHeight= (parseFloat((320)) *parseFloat((neighborObj.finalMap).numZoom))+"px";
	
		
		 	if (parseFloat(neighborTargetImgWidth) < 440) {
				topTarget= neighborTargetImgHeight - parseFloat(top);
		        neighborTargetImgHeight="320px";
			}
				var topTarget= (top- (parseFloat((neighborObj.finalMap).finalMapY)*parseFloat((neighborObj.finalMap).numZoom))) + neighborTarget;
					 //alert((top- (parseFloat((neighborObj.finalMap).finalMapY)*parseFloat((neighborObj.finalMap).numZoom)))+ " "+ neighborTarget +"  "+topTarget);
	
		 if ( topTarget > 320) {
	
			 document.getElementById("neighborCommentBoxTipTop").style.display="none";
			  		document.getElementById("neighborCommentBoxTipBottom").style.display="block";
					document.getElementById("neighborCommentBoxTipBottom").style.left=  tipLeft +"px";
							 document.getElementById("neighborCommentBoxTarget").style.top = (parseFloat(top)- (neighborTarget-35)) +"px";
							 document.getElementById("neighborCommentBoxTarget").style.height=(neighborTarget-35) +"px";
		 }
		  if (isMobile()) {
				 var neighborCommentBoxCloseBtn= ce('div');
		   		 neighborCommentBoxCloseBtn.setAttribute('id', "neighborCommentBoxCloseBtn");
				 neighborCommentBoxCloseBtn.innerHTML='<img src="images/neighbors/mobileCloseBtn.png" height="12" width="11" hspace="0" vspace="0" border="0"/>';
				 neighborCommentObj.appendChild(neighborCommentBoxCloseBtn);
				 document.getElementById("neighborCommentBoxCloseBtn").style.display="block";
				// document.getElementById("neighborCommentBoxBody").style.paddingTop= "6px";
				 document.getElementById("neighborCommentBoxCloseBtn").style.left=  (parseFloat($("#neighborCommentBoxTarget").css('left')) +155) +"px";
				 document.getElementById("neighborCommentBoxCloseBtn").style.top = (parseFloat($("#neighborCommentBoxTarget").css('top'))-1) +"px";
				 if ( topTarget < neighborTarget)
				     document.getElementById("neighborCommentBoxCloseBtn").style.top = (parseFloat($("#neighborCommentBoxTarget").css('top'))) +"px";
				 document.getElementById("neighborCommentBoxCloseBtn").onclick= function(){
				 document.getElementById("neighborCommentBox").style.display="none";
				};
			
			 }
		var left, top;
			if (parseFloat((neighborObj.finalMap).finalMapX) >0)
			left = "-" + (parseFloat((neighborObj.finalMap).finalMapX)  *parseFloat((neighborObj.finalMap).numZoom)) +"px";
		else
		    left = (parseFloat((neighborObj.finalMap).finalMapX)  *parseFloat((neighborObj.finalMap).numZoom)) +"px";
			
		if (parseFloat((neighborObj.finalMap).finalMapY) >0)
			top = "-" + (parseFloat((neighborObj.finalMap).finalMapY)  *parseFloat((neighborObj.finalMap).numZoom)) +"px";
		else 
		    top = (parseFloat((neighborObj.finalMap).finalMapY)  *parseFloat((neighborObj.finalMap).numZoom)) +"px"; 
			
		$("#neighborCommentBox").css({'width': neighborTargetImgWidth,'height': neighborTargetImgHeight, 'left':left, 'top':top});
			
		
}
function isMobile(){

			//var mobile = (/safari|iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));  
	
			var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));   
    if (mobile)   
	  		return true;
	 else
	  		return false;
	  
}
	function browserDetection() {
var browser =  navigator.userAgent.toLowerCase();
if (browser.indexOf("iphone") != -1)
	browser =  "iphone";
if (browser.indexOf("ipod") != -1)
	browser = "ipod";
if (browser.indexOf("ipad") != -1)
	browser = "ipad";
if (browser.indexOf("android") != -1)
	browser =  "android";
else if (browser.indexOf("opera") != -1)
	browser = "opera";
else if (browser.indexOf("firefox") != -1)
	browser = "firefox";
else if (browser.indexOf("msie") != -1)
	browser = "msie";
else if (browser.indexOf("netscape") != -1)
	browser = "netscape";
else if (browser.indexOf("safari") != -1)
	browser= "safari";
else if (browser.indexOf("chrome") != -1)
	browser= "chrome";
	
return browser;

} 

function rotateDropBox(lineID, circleID, buttonID, divID, boxWidth, boxHeight, lineWidth, degree, x_pos, y_pos) {
	lineID= "#" + lineID;
	circleID = "#" + circleID;
	buttonID ="#" + buttonID;
	divID ="#" + divID;
	x_pos = x_pos;
	y_pos = y_pos;
	//$(divID).css ({'position': 'relative'});
	$(buttonID).css ({'width': boxWidth+'px', 'height': boxHeight+'px'});
	var start_x = (parseFloat($(lineID).position().left));
	var start_y = parseFloat($(lineID).position().top);
	var tempX;
	var tempY;
	if (degree >=360)
    	degree= 0;

$(lineID).css ({'width': lineWidth+'px', 'height': '2px'});
	$(lineID).rotate(degree);
		var end_y = parseFloat($(lineID).position().top);
		var end_x = (parseFloat($(lineID).position().left));
	
 var y =( start_y + (start_y -end_y));
if ( degree <= 90 && degree >=0 ){
	if(degree ==0) {
				tempX = (end_x-boxWidth) +'px';
				tempY = (end_y-(boxHeight/2)) +'px';
				
			$(buttonID).css ({'left': tempX, 'top':tempY, 'text-align':'left'});
	} 
	else if(degree == 90) {
				tempX = (end_x-(boxWidth/2)) +'px';
				tempY = end_y +'px';
			$(buttonID).css ({'left': tempX, 'top':tempY, 'text-align':'center'});
	} else {
				tempX = (end_x-boxWidth) +'px';
				tempY = (end_y-(boxHeight)) +'px';
			$(buttonID).css ({'left': tempX, 'top':tempY, 'text-align':'left'});
	}
     var x = (((lineWidth+start_x) - end_x)-3);
}
else  if ( degree > 90 && degree <= 180 ){
	if(degree ==180) {
			tempX = (end_x+lineWidth) +'px';
			tempY = (end_y-(boxHeight/2)) +'px';
			$(buttonID).css ({'left': tempX, 'top':tempY, 'text-align':'left'});
	} else {
	        tempX = (((lineWidth+start_x) - end_x)-3) +"px";
			tempY = (end_y-(boxHeight)) +'px';
			$(buttonID).css ({'left': tempX, 'top':tempY, 'text-align':'left'});
	}
    var x = (end_x -3);
	 
}
else if ( degree > 180 && degree <=270 ) {
	   var x = (end_x -3);
	 y = ((start_y - (start_y -end_y)) -3);
	if(degree ==270) {
			tempX = (end_x-(boxWidth/2)) +'px';
			tempY = (end_y+(lineWidth)) +'px';
			$(buttonID).css ({'left': tempX, 'top':tempY, 'text-align':'center'});
	} else {
	        tempX = (((lineWidth+start_x) - end_x)-3) +"px";
			tempY = (start_y + (start_y -end_y)) +"px";
			$(buttonID).css ({'left': tempX, 'top':tempY, 'text-align':'left'});
	}
 
}
else  if ( degree > 270 && degree <=360 ) {
       var x = (((lineWidth+start_x) - end_x)-3);
	   y = ((start_y - (start_y -end_y)) -3);
	     tempX = (end_x-boxWidth) +'px';
			tempY = (start_y + (start_y -end_y)) +"px";
			$(buttonID).css ({'left': tempX, 'top':tempY, 'text-align':'left'});
	
}
 $(circleID).css ({'left':x, 'top':y});
	var y_pos1 = y_pos-(y);
	var x_pos1 = x_pos-(x);
$(divID).css ({'left':x_pos1, 'top':y_pos1});
	
}


 function rotate(elem, degree) {  
		$(elem).css({ 'msTransform': 'rotate(' + degree + 'deg)'});
		$(elem).css( '-moz-transform', 'rotate(' + degree + 'deg)');    
        $(elem).css( '-ms-transform', 'rotate(' + degree + 'deg)'); 
		$(elem).css({ '-webkit-transform': 'rotate(' + degree + 'deg)'}); 
		

  }


