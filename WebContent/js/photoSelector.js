var photoSelector = {
		imageObj: null,
		imageData: null,
		targetCanvas: null,
		targetPage: "",
		getPreviewImageData: function() {
			var canvas = $("#mypreview")[0];
			return canvas.toDataURL();
		},
	
		updatePreview: function(c) {
			if(parseInt(c.w) > 0) {
				photoSelector.imageData = c;
				// Show image preview
				photoSelector.imageObj = $("#target")[0];
				console.log(photoSelector.imageObj);
				var canvas = $("#mypreview")[0];
				var context = canvas.getContext("2d");
				console.log("c.x = " + c.x);
				console.log("c.y = " + c.y);
				console.log("c.w = " + c.w);
				console.log("c.h = " + c.h);
				console.log("canvas.width = " + canvas.width);
				console.log("canvas.height = " + canvas.height);
				context.drawImage(photoSelector.imageObj, c.x, c.y, c.w, c.h, 0, 0, canvas.width, canvas.height);
			}
		},
	
		clearPreview: function() {
			var canvas = $("#mypreview")[0];
			var context = canvas.getContext("2d");
			context.clearRect(0, 0, canvas.width, canvas.height);
		},
	
		removeCurrentPicture: function() {
			var el = document.getElementById('filesInfo');
			while( el.hasChildNodes() ){
				el.removeChild(el.lastChild);
			}
		},
			
		closeWithoutSaving: function() {
			reset();
		},
	
		handleFileSelect: function(evt) {
			console.log(evt);
			var files = evt.target.files; // FileList object
		
			// Loop through the FileList and render image files as thumbnails.
			for (var i = 0, f; f = files[i]; i++) {
		
			  // Only process image files.
			  if (!f.type.match('image.*')) {
				continue;
			  }
		
			  var reader = new FileReader();
			  
			  console.log(f);
		
			  // Closure to capture the file information.
			  reader.onload = (function(theFile) {
				return function(e) {
				 
					photoSelector.removeCurrentPicture();
				  
					var div = document.createElement('div');
					console.log(e.target.result);
					div.innerHTML = '<img id="target" src="' + e.target.result + '" />';
					document.getElementById('filesInfo').appendChild(div);
					
					photoSelector.clearPreview();
					
					$('#target').Jcrop({
						onChange : photoSelector.updatePreview,
						onSelect : photoSelector.updatePreview,
						aspectRatio : 1,
						boxWidth:window.innerWidth - 100
					});
					
				};
			  })(f);
		
			  // Read in the image file as a data URL.
			  reader.readAsDataURL(f);
			}
		 },
	 
		 reset: function() {
			 photoSelector.clearPreview();
			 photoSelector.removeCurrentPicture();			 
		 },
	 
		 navigateToMain: function() {
			 window.history.back();
		 },
		 
		 navigateBack: function() {
			 window.history.back();
		 },
		 
		 saveSelection: function() {
			if (photoSelector.targetCanvas != null) {
				var targetContext = photoSelector.targetCanvas.getContext("2d");
				targetContext.drawImage(photoSelector.imageObj, photoSelector.imageData.x, photoSelector.imageData.y, photoSelector.imageData.w, photoSelector.imageData.h, 0, 0, photoSelector.targetCanvas.width, photoSelector.targetCanvas.height);
			}
			
			photoSelector.reset();
			photoSelector.navigateBack();			 
		 }
}