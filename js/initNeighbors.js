// Copyright (c) 2012 Thomas Tran 
// Date: 06/05/2012

var neighborConSVGArrayObjs = new Array();
var neighborConSVGArray = new Array();
function initMaps() {	
	   
 var file="xml/cip_" + projCode + "_neighborsMap.xml"
		 var xmlObj = new load_XML(file);
		var index =0;
		var neighborCountryName;
		 var g_elements = xmlObj.tagNameElement("g");
			for(var i=0; i < g_elements.length; i++){
				  
				var id = g_elements[i].getAttribute('id');
			
				if (id && id != "null") {
					//alert(id)
				for(var j=0; j < neighborCountryNames.length; j++){
					
					if (id.toLowerCase().indexOf(neighborCountryNames[j].replace(/[" "]/g, "_").toLowerCase()) != -1) {
						 var obj = new Object();
					     obj.name= id;
						 //alert("T "+id);
						index++;
					    neighborCountryName ="neighbor" + neighborCountryNames[j].replace(/[" "]/g, "and") + "_1"; 
					
					     //  var paths = xmlObj.tagNameElement("path",g_elements[i]);
						
		                   var string ="";
						   var itemChilds = g_elements[i].childNodes;
						    for(var x=0; x< itemChilds.length; x++){
								var xmlNode = itemChilds[x];
						        switch (xmlNode.nodeName){
									case 'path':
										string+= xmlNode.getAttribute('d') + " ";
								        obj.fill = xmlNode.getAttribute('fill');
										obj.stroke = xmlNode.getAttribute('stroke');
										obj.strokeWidth = xmlNode.getAttribute('stroke-width');
										obj.strokeLinecap = xmlNode.getAttribute('stroke-linecap');
										obj.strokeLinejoin = xmlNode.getAttribute('stroke-linejoin');
									break; 
									case 'polygon':
										string+= "M" + xmlNode.getAttribute('points').replace(/^\s+|\s+$/g,"") + "Z ";
								         obj.fill = xmlNode.getAttribute('fill');
										obj.stroke = xmlNode.getAttribute('stroke');
										obj.strokeWidth = xmlNode.getAttribute('stroke-width');
										obj.strokeLinecap = xmlNode.getAttribute('stroke-linecap');
										obj.strokeLinejoin = xmlNode.getAttribute('stroke-linejoin');
									break;
									case 'polyline':
										string+= "M" + xmlNode.getAttribute('points').replace(/^\s+|\s+$/g,"") + " ";
								        obj.fill = xmlNode.getAttribute('fill');
										obj.stroke = xmlNode.getAttribute('stroke');
										obj.strokeWidth = xmlNode.getAttribute('stroke-width');
										obj.strokeLinecap = xmlNode.getAttribute('stroke-linecap');
										obj.strokeLinejoin = xmlNode.getAttribute('stroke-linejoin');
									break;
								}//end switch
					    }//end for
						   
						   
						   
						   
						   
						   
						   
						   
						   
						   
		   				
					//	alert(" T" + neighborCountryName +" "+string);
						  obj.path= string;
				          neighborConSVGArray[neighborCountryName] = obj;
					}//end if 
				} // end for
				}
			}// end for
		
		 

$(function(){
	
		workspace = Raphael('neighborSVGMap', 440, 320),
		arr = new Array();

	for (var reg in neighborConSVGArray) {
	    // alert(regionMaps[reg].path);
		var obj = workspace.path(neighborConSVGArray[reg].path);
		//alert(reg);
		obj.id=reg;
		//alert(reg);
		var attributes = {
            fill: neighborConSVGArray[reg].fill,
           stroke: '#FFFFFF',
            'stroke-width': 1,
           'stroke-linejoin': 'bevel',
           'stroke-linecap': 'butt',
			'y':0,
			'x':0,
			//'cursor':'pointer',
			//class:'drop'
        }
		obj.attr(attributes);
		obj.scale(1,1,0,0);
	//	alert(reg);
		neighborConSVGArrayObjs[reg]= obj;	
	}  
	neighborDropArea();	
			
});
}

function drawSVGTargetMap(idName) {
	
	var neighTemp= neighborCountries[idName];
	var neighborTargetWidth= (440) *parseFloat((neighTemp.finalMap).numZoom);
	var neighborTargetHeight= (320) *parseFloat((neighTemp.finalMap).numZoom);
	if (parseFloat(neighborTargetHeight) < 440)
		        neighborTargetHeight="320";
	var zoom = parseFloat((neighTemp.finalMap).numZoom);  
		 
$(function(){
 var targetWorkSpace = Raphael('neighborDivSVG', neighborTargetWidth, neighborTargetHeight);
 
	for (var reg in neighborConSVGArray) {
	    // alert(regionMaps[reg].path);
		var objTarget = targetWorkSpace.path(neighborConSVGArray[reg].path);
		//alert(reg);
		objTarget.id=reg + "_SVGTarget";
		
		if (reg == (idName +"_1")) 
			var attributes = {
				'fill-opacity':1,
           		 fill: neighborCountries[idName].map.mapRollOverCollor,
           		 stroke: '#FFFFFF',
           		 'stroke-width': 1,
            	'stroke-linejoin': 'bevel',
            	'stroke-linecap': 'butt',
				'y':0,
				'x':0
			
        	}
		else
		    var attributes = {
           		 fill: "#cbd4c3",
           		 stroke: '#FFFFFF',
           		 'stroke-width': 1,
            	'stroke-linejoin': 'bevel',
            	'stroke-linecap': 'butt',
				'y':0,
				'x':0
        	}
	
if (parseFloat(neighborTargetWidth) < 440) {
		
	    objTarget.scale(zoom,1,0,0);
	 }
 else
		 objTarget.scale(zoom,zoom,0,0);
	   // objTarget.scale(zoom,zoom,0,0);
		objTarget.attr(attributes);
		
	
	}  //end for loop
	
			
}); 

$("#neighborSVGMapDivTarget").css({'width': '440px','height': '320px', 'left':'0px', 'top':'0px'});
}//end drawSVGTargetMap()

