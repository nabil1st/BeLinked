var newMemberPage = {
		clearPreview: function() {
			var canvas = $("#newMemberPhotoPreview")[0];
			var context = canvas.getContext("2d");
			context.clearRect(0, 0, canvas.width, canvas.height);
		},
		
		getPreviewImageData: function() {
			var canvas = $("#newMemberPhotoPreview")[0];
			return canvas.toDataURL();
		},
		
		savePictureAndClose: function() {
			//var imageData = photoSelector.getPreviewImageData();
			var imageData = newMemberPage.getPreviewImageData();
			console.log(imageData);
			
			/*var xmlhttp;
		    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		        xmlhttp = new XMLHttpRequest();
		    } else {// code for IE6, IE5
		        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		    }
		    xmlhttp.onreadystatechange = function() {
		        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		        	console.log("resultData");
		            console.log(resultData);
		            console.log(xmlhttp);
		            GLOBAL_VALUES.selectedPersonId = xmlhttp.response;
		        	newMemberPage.reset();
		        	newMemberPage.navigateToMain();
		        	ImmediateFamilyView.paintTree();
		        }
		    }*/
		    
		              
		    var params = "?fName=" + $("#regFName").val() + "&lName=" + $("#regLName").val() + "&dob=" + $("#regDateOfBirth").val() + 
		    	"&sex=" + $("#regSexOption").val() +
		    	"&email=" + $("#regEmail").val() + "&newMember=true";
		    
		    console.log(params);
		        
		    var myurl = "http://localhost:8080/BeLinked/PhotoMakerServlet" + params;
		    
		    /*xmlhttp.open("POST", myurl, false);
		    xmlhttp.send(imageData);*/
		    
		    $.ajax({
		        url: myurl,
		        type: "POST",
		        data: imageData,
		
		        contentType: 'application/json; charset=utf-8',
		        success: function(resultData) {
		        	console.log("resultData");
		            console.log(resultData);
		            GLOBAL_VALUES.selectedPersonId = resultData;
		            newMemberPage.reset();
		        	newMemberPage.navigateToMain();
		        },
		        error : function(jqXHR, textStatus, errorThrown) {
		        },
		
		        timeout: 120000,
		    });
		},
	
	 
		reset: function() {
			 photoSelector.reset();			
			 newMemberPage.clearPreview();
			 $("#regFName").val(""); 
			 $("#regLName").val(""); 
			 $("#regDateOfBirth").val(""); 
			   
			 
			 $("#regEmail").val("");
		 	  	 
		 	// Grab a select field
		 	var elSex = $('#regSexOption');
		
		 	// Select the relevant option, de-select any others
		 	elSex.val('male').attr('selected', true).siblings('option').removeAttr('selected');
		 	
		 	// jQM refresh
		 	elSex.slider('refresh');
		 	
		 },
	 
		 navigateToMain: function() {
			 //window.history.back();
			 $.mobile.changePage("#mainPage");
		 },
	 
		 setPhotoSelectorTarget: function() {
			 var canvas = $("#newMemberPhotoPreview")[0];		
			 photoSelector.targetCanvas = canvas;
		 }
}