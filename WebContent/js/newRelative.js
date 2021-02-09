var newRelativePage = {
		clearPreview: function() {
			var canvas = $("#newRelativePhotoPreview")[0];
			var context = canvas.getContext("2d");
			context.clearRect(0, 0, canvas.width, canvas.height);
		},
		
		getPreviewImageData: function() {
			var canvas = $("#newRelativePhotoPreview")[0];
			return canvas.toDataURL();
		},
		
		savePictureAndClose: function() {
			//var imageData = photoSelector.getPreviewImageData();
			var imageData = newRelativePage.getPreviewImageData();
			console.log(imageData);
			
			/*var xmlhttp;
		    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		        xmlhttp = new XMLHttpRequest();
		    } else {// code for IE6, IE5
		        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		    }
		    xmlhttp.onreadystatechange = function() {
		        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		        	//hideNewLeafSection();
		        	newRelativePage.reset();
		        	newRelativePage.navigateToMain();
		        	ImmediateFamilyView.paintTree();
		        }
		    }*/
		    
		              
		    var params = "?fName=" + $("#fName").val() + "&lName=" + $("#lName").val() + "&dob=" + $("#dateOfBirth").val() + 
		    	"&relationship=" + $("#relationship option:selected").val() + "&sex=" + $("#sexOption").val() +
		    	"&sendEnvite=" + $("#sendEmailOption").val() + "&GLOBAL_VALUES.selectedPersonId=" + GLOBAL_VALUES.selectedPersonId + "&email=" + $("#email").val();
		    
		    // add a parameter for the list of confirms, the value will be a comma separated list if IDs. Each id will contain
		    // the personId and the relationship to the main person separated by _
		    var confirmsVal = "";
		    for (var i=0; i<listOfConfirms.length; i++) {
		    	var cbSelector = "#" + listOfConfirms[i];
		    	console.log($(cbSelector).prop("checked"));
		    	if ($(cbSelector).prop("checked")) {
		    		if (confirmsVal != "") {
		    			confirmsVal += ",";
		    		}
		    		confirmsVal += listOfConfirms[i];    		
		    	}
		    }
		    
		    if (confirmsVal != "") {
		    	params += "&confirms=" + confirmsVal;
		    }
		    
		    console.log(params);
		        
		    var myurl = "http://localhost:8080/BeLinked/PhotoMakerServlet" + params;
		    
		    $.ajax({
		        url: myurl,
		        type: "POST",
		        data: imageData,
		
		        contentType: 'application/json; charset=utf-8',
		        success: function(resultData) {
		        	newRelativePage.reset();
		        	newRelativePage.navigateToMain();
		        },
		        error : function(jqXHR, textStatus, errorThrown) {
		        },
		
		        timeout: 120000,
		    });
		    
		    //console.log(uint8ArrayData);
		          
		    //xmlhttp.open("GET", url, true);
		    //xmlhttp.send();
		    
		    /*xmlhttp.open("POST", url, false);
		    xmlhttp.send(imageData);*/			
			
			
		},
	
	 
		reset: function() {
			newRelativePage.clearPreview();
			 photoSelector.reset();			 
			 $("#fName").val(""); 
			 $("#lName").val(""); 
			 $("#dateOfBirth").val(""); 
			 
			 $("#relationship").val("");
			 $("#relationship").selectmenu('refresh', true);   
			 
			 $("#email").val("");
		 	  	 
		 	// Grab a select field
		 	var elSex = $('#sexOption');
		
		 	// Select the relevant option, de-select any others
		 	elSex.val('male').attr('selected', true).siblings('option').removeAttr('selected');
		 	
		 	// jQM refresh
		 	elSex.slider('refresh');
		 	
		 	
		 	// Grab a select field
		 	var elSendEmail = $('#sendEmailOption');
		
		 	// Select the relevant option, de-select any others
		 	elSendEmail.val('off').attr('selected', true).siblings('option').removeAttr('selected');
		
		 	// jQM refresh
		 	elSendEmail.slider('refresh');
		 },
	 
		 navigateToMain: function() {
			 //window.history.back();
			 $.mobile.changePage("#mainPage");
		 },
	 
		 setPhotoSelectorTarget: function() {
			 var canvas = $("#newRelativePhotoPreview")[0];		
			 photoSelector.targetCanvas = canvas;
		 }
}