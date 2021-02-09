<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="../../assets/ico/favicon.png">

    <title>Family Tree - Define your family tree</title>
    
    <link href="<%=request.getContextPath()%>/css/jquery.mobile.structure-1.3.2.min.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/css/jquery.mobile.theme-1.3.2.min.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/css/jquery.mobile-1.3.2.min.css" rel="stylesheet">
	<link href="<%=request.getContextPath()%>/css/main.css" rel="stylesheet">
	<link rel="stylesheet" href="<%=request.getContextPath()%>/css/jquery.Jcrop.css" type="text/css" />
	
			

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="../../assets/js/html5shiv.js"></script>
      <script src="../../assets/js/respond.min.js"></script>
    <![endif]-->
	
	<style type="text/css">

		/* Apply these styles only when #preview-pane has
		   been placed within the Jcrop widget */
		.jcrop-holder #preview-pane {
		  display: block;
		  position: absolute;
		  z-index: 2000;
		  top: 10px;
		  right: -280px;
		  padding: 6px;
		  border: 1px rgba(0,0,0,.4) solid;
		  background-color: white;

		  -webkit-border-radius: 6px;
		  -moz-border-radius: 6px;
		  border-radius: 6px;

		  -webkit-box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.2);
		  -moz-box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.2);
		  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.2);
		}
	</style>
  </head>

  <body>    
<!--   	<div data-role="page" id="loginPage"> -->
  		
<!--   	</div>	 -->
  	<div data-role="page" id="mainPage">
  		<div data-role="header">
			<div class="ui-grid-a">
				<div class="ui-block-a">
					<h3>Family Tree</h3>
				</div>
  				<div class="ui-block-b">
  					<div style="float:left;width:30%">
  						<input id="loginEmail" type="text" placeholder="Email" class="form-control" name="loginEmail" class="emailField">
  					</div>
  					<div style="float:left;width:30%">
  						<input id="loginPassword" type="password" placeholder="Password" class="form-control" name="loginPassword" class="passwordField">
  					</div>   		
  					<div style="float:left;width:20%">
  						<input class="submit" type="submit" value="Login"/>
  					</div>
  					<div style="float:left;width:20%">
  						<a href="#registrationPage" data-role="button" data-theme="a" onclick="">Register</a>
  					</div>			
  				</div>  				
  			</div>  			
  		</div>	
  		
  		<div data-role="content" class="mainContainer">
  			<div class="ui-grid-a">
  				<div class="ui-block-a" id="leftSideBlock">
  					<div class="ui-grid-a">
  						<div class="ui-block-a"  id="mainCanvasControlsBlock">
  							<a href="#addTreeNodePage" data-role="button" data-inline="true" data-rel="page"  
	   							data-transition="fade">Add a Relative</a> 
  						</div>
  						<div class="ui-block-b" id="mainCanvasBlock">
  							<div id="container" class="canvasSection"></div>
  						</div>
  					</div> 
  					
  				</div>
  				<div class="ui-block-b" id="rightSideBlock">
  					<p>Add Content Here</p>
  				</div>
  			</div>
  			
  			
<!--   			<div id="leftSection" class="leftSection hasBorder"> -->
<!--   				<div id="container" class="canvasSection"></div> -->
<!--   			</div> -->
<!--   			<div class="rightSection"> -->
<!--   				<a href="#addTreeNodePage" data-role="button" data-inline="true" data-rel="page"  -->
<!--   					data-transition="fade">Add a Tree Leaf</a>				 -->
<!-- 			</div> -->
		</div>
	</div>
	
	
	<div data-role="page" id="addTreeNodePage">
		<div data-role="header">
			<h1>Family Tree - New Relative</h1>
  		</div>		
		<div data-role="content" id="newLeafDialog">
		
			<div class="ui-grid-a">
				<div class="ui-block-a" id="newLeafLeft">
					<div class="myformdiv">
						<form class="form" id="newMemberForm" novalidate="novalidate" action="" method="post">
							<div>
								<div style="float:left;">
									<a href="#photoSelectorPage" data-role="button" data-theme="a" onclick="newRelativePage.setPhotoSelectorTarget()">Select Profile Photo</a>
								</div>
								<div id="newRelativePhotoPreviewDiv" style="float:right;border:solid;margin:5px;">
							  		<canvas id="newRelativePhotoPreview" width="94" height="94" style="margin:3px;"></canvas>
								</div>
							</div>
							
							<ul data-role="listview" id="picturetooloptions">
								<li data-role="fieldcontain">
						        	<input id="fName" type="text" placeholder="First Name *" class="form-control" name="fName">
								</li>
								<li data-role="fieldcontain">
						        	<input id="lName" type="text" placeholder="Last Name *" class="form-control" name="lName">
								</li>
								<li>			
									<fieldset data-role="controlgroup">
									<legend>Date of Birth:</legend>						
									<input type="date" placeholder="Date Of Birth" name="date" id="dateOfBirth" value="" name="dateOfBirth">
									</fieldset>
								</li>
								<li class="ui-icon-nodisc">
									<fieldset data-role="fieldcontain" data-mini="true"> 
										<select id="relationship" name="relationship">
											<option value="">Select a Relationship</option>
											<option value="Father">Father</option>
											<option value="Mother">Mother</option>
											<option value="Husband">Husband</option>
											<option value="Wife">Wife</option>
											<option value="Son">Son</option>
											<option value="Daughter">Daughter</option>
											<option value="Brother">Brother</option>
											<option value="Sister">Sister</option>
										</select>
									</fieldset>
								</li>
								<li data-role="fieldcontain">
						        	<input id="email" type="email" placeholder="Email Address" class="form-control" name="email">	
								</li>
								<li data-role="fieldcontain" id="sexLi">
						        	<select name="sexOption" id="sexOption" data-role="slider" data-mini="true">
									    <option value="m" selected="">Male</option>
									    <option value="f">Femal</option>
									</select>
								</li>
								<li data-role="fieldcontain" id="sendEmailLi">
									<select name="sendEmailOption" id="sendEmailOption" data-role="slider">
									    <option value="off" selected="">Do Not Send Envite</option>
									    <option value="on">Send Envite</option>
									</select>
								</li>			
							</ul>
							<ul data-role="listview" id="relationship_confirms">
							</ul>
							<ul data-role="listview">					
								<li class="ui-body ui-body-b">
									<div class="ui-grid-a">
										<div class="ui-block-a">
											<a href="#mainPage" data-role="button" data-theme="a" onclick="newRelativePage.reset()">Cancel</a>											
										</div>
										<div class="ui-block-b">
											<input class="submit" type="submit" value="Submit"/>
<!-- 											<a href="#mainPage" data-role="button" data-theme="b" onclick="savePictureAndClose()">Save</a> -->
<!-- 												<input class="submit" type="submit" value="Submit" onclick="savePictureAndClose()"/> -->
										</div>
<!-- 											<div class="ui-block-a"><button type="submit" data-theme="d" onclick="closePictureToolWithoutSaving()">Cancel</button></div> -->
<!-- 											<div class="ui-block-b"><button type="submit" data-theme="a" onclick="savePictureAndClose()">Submit</button></div> -->
								    </div>
								</li>
							</ul>
				        </form>
			        </div>					
				</div>				
			</div>
			<!-- <a href="#close" title="Close" class="close" onclick="closePictureToolWithoutSaving()">X</a>-->		
				
						       
		</div>
	</div>
	
	
	<div data-role="page" id="registrationPage">
		<div data-role="header">
  			<h1>Family Tree - Register</h1>
  		</div>		
		<div data-role="content">		
			<div class="ui-grid-a">
				<div class="ui-block-a" id="newLeafLeft">
					<div class="myformdiv">
						<form class="form" id="registrationForm" novalidate="novalidate" action="" method="post">
							<div>
								<div style="float:left;">
									<a href="#photoSelectorPage" data-role="button" data-theme="a" onclick="newMemberPage.setPhotoSelectorTarget()">Select Profile Photo</a>
								</div>
								<div id="newMemberPhotoPreviewDiv" style="float:right;border:solid;;margin:5px;">
							  		<canvas id="newMemberPhotoPreview" width="94" height="94" style="margin:3px;"></canvas>
								</div>
							</div>
							<ul data-role="listview" id="registrationFormOptions">								
								<li data-role="fieldcontain">
						        	<input id="regFName" type="text" placeholder="First Name *" class="form-control" name="regFName">
								</li>
								<li data-role="fieldcontain">
						        	<input id="regLName" type="text" placeholder="Last Name *" class="form-control" name="regLName">
								</li>
								<li>			
									<fieldset data-role="controlgroup">
									<legend>Date of Birth:</legend>						
									<input type="date" placeholder="Date Of Birth" name="date" id="regDateOfBirth" value="" name="regDateOfBirth">
									</fieldset>
								</li>								
								<li data-role="fieldcontain">
						        	<input id="regEmail" type="email" placeholder="Email Address" class="form-control" name="email">	
								</li>
								<li data-role="fieldcontain" id="sexLi">
						        	<select name="regSexOption" id="regSexOption" data-role="slider" data-mini="true">
									    <option value="m" selected="">Male</option>
									    <option value="f">Femal</option>
									</select>
								</li>											
							</ul>							
							<ul data-role="listview">					
								<li class="ui-body ui-body-b">
									<div class="ui-grid-a">
										<div class="ui-block-a">
											<a href="#mainPage" data-role="button" data-theme="a" onclick="newMemberPage.reset()">Cancel</a>											
										</div>
										<div class="ui-block-b">
											<input class="submit" type="submit" value="Submit"/>
										</div>
								    </div>
								</li>
							</ul>
				        </form>
			        </div>					
				</div>
				<div class="ui-block-b" id="newLeafRight">
					<div id="regFilesInfo">						
					</div>
				</div>
			</div>
			<!-- <a href="#close" title="Close" class="close" onclick="closePictureToolWithoutSaving()">X</a>-->		
				
						       
		</div>
	</div>
	
	
	<div data-role="page" id="photoSelectorPage">
		<div data-role="header">
  			<h1>Family Tree - Select a Photo</h1>
  		</div>		
		<div data-role="content">
			<div style="height:110px">
				<div id="previewDiv" style="float:left;width:100px; height:100px; border:solid;display:inline-block;">
		  			<canvas id="mypreview" width="94" height="94" style="margin:3px;"></canvas>
				</div>	
				<div style="float:left;width:70%;display: inline-block;margin:5px;">
					<input type="file" id="files" name="files[]"/>
				</div>
			</div>
			<div>
				<div id="filesInfo" style="float:left;">
				</div>
			</div>
			
			
			<div class="ui-grid-a" style="width:100%;">
				<div class="ui-block-a">
					<a data-role="button" data-theme="a" style="width:150px" onclick="photoSelector.reset(); photoSelector.navigateBack()">Cancel</a>											
				</div>
				<div class="ui-block-b">
					<a data-role="button" data-theme="a" style="width:150px" onclick="photoSelector.saveSelection()">Submit</a>
				</div>
		    </div>
		</div>
	</div>


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    	
	<script src="http://d3lp1msu2r81bx.cloudfront.net/kjs/js/lib/kinetic-v4.7.2.min.js"></script>
    <script src="<%=request.getContextPath()%>/js/jquery.min.js"></script>
    <script src="<%=request.getContextPath()%>/js/jquery.validate.min.js"></script>
	<script src="<%=request.getContextPath()%>/js/jquery.mobile-1.3.2.min.js"></script>
	<script src="<%=request.getContextPath()%>/js/jquery.Jcrop.js"></script>
	
	<script src="<%=request.getContextPath()%>/js/global.js"></script>
	<script src="<%=request.getContextPath()%>/js/photoSelector.js"></script>
	<script src="<%=request.getContextPath()%>/js/validation.js"></script>
	<script src="<%=request.getContextPath()%>/js/main.js"></script>
	<script src="<%=request.getContextPath()%>/js/hierarchy.js"></script>	
	<script src="<%=request.getContextPath()%>/js/newRelative.js"></script>
	<script src="<%=request.getContextPath()%>/js/newMember.js"></script>
	
	<script>
	
	/*$( document ).on( "pageinit", "#mainPage", function( event ) {
	  	console.log("initialized");
	    ImmediateFamilyView.paintTree();
  	});*/	
	
	$( document ).on( "pageshow", "#mainPage", function( event ) {
	  	console.log("showing page");
	    ImmediateFamilyView.paintTree();
  	});
	  
	  jQuery(function($){		
		
		  FORM_VALIDATOR.NEW_RELATIVE_VALIDATOR.setupFormValidation();
		  FORM_VALIDATOR.NEW_MEMBER_VALIDATOR.setupFormValidation();
		document.getElementById('files').addEventListener('change', photoSelector.handleFileSelect, false);
		//document.getElementById('upload').addEventListener('click', handleFileUpload, false);
		
		/*var sources = [
        {id:"1", source: 'images/BugsBunny.jpg', name:"Bugs Bunny", relationship:"self", relationship_detail:"Me", sex:"m"},
		{id:"2", source: 'images/Barney.jpg', name:"Barney", relationship:"spouce", relationship_detail:"Wife", sex:"f"},
        {id:"3", source: 'images/Tweety.jpg', name:"Tweety", relationship:"child", relationship_detail:"Daughter", sex:"f"},
		{id:"4", source: 'images/MickeyMouse.jpg', name:"Micky Mouse", relationship:"child", relationship_detail:"Son", sex:"m"},
		{id:"5", source: 'images/WinnieThePooh.jpg', name:"Winnie The Pooh", relationship:"child", relationship_detail:"Son", sex:"m"},
		{id:"6", source: 'images/Tom.jpg', name:"Tom", relationship:"parent", relationship_detail:"Father", sex:"m"},
		{id:"7", source: 'images/Jerry.jpg', name:"Jerry", relationship:"parent", relationship_detail:"Mother", sex:"f"},
		{id:"8", source: 'images/Raphael.jpg', name:"Raphael", relationship:"sibling", relationship_detail:"Brother", sex:"m"},
		{id:"9", source: 'images/Spiderman.jpg', name:"Spiderman", relationship:"sibling", relationship_detail:"Brother", sex:"m"},
		{id:"10", source: 'images/Shredder.jpg', name:"Shredder", relationship:"sibling", relationship_detail:"Brother", sex:"m"}
      ];
	  
	  var frames = [
		{id:"1", source: 'images/frame1.jpg', type: "frame"},
		{id:"2", source: 'images/frame3.jpg', type: "frame"}
	  ];*/
	  
	  
	  
	  //paintHierarchicalTree();
	  
	  $("#relationship").change(function(e) {
		  listOfConfirms = [];
		  console.log("relationship selection event");
		  console.log(e);
		  var selectedRelationship = this.value;
		  $('#relationship_confirms > li').remove();
		  $("#relationship_confirms").listview('refresh');	
		  $.ajax({
		        url: "http://localhost:8080/BeLinked/userTree/" + selectedPersonId + "/" + selectedRelationship,
		        type: "GET",

		        contentType: 'application/json; charset=utf-8',
		        success: function(resultData) {
		            console.log(resultData);
		            //if (selectedRelationship === "Father" || selectedRelationship === "Mother") {
			            for(var p=0; p<resultData.length; p++) {
			          	  //if (resultData[p].relationship == "sibling") {
			          		  var idForCheckBox = resultData[p].relationship + "_" + resultData[p].id; 
			      		  	  $("#relationship_confirms").append("<li data-role='fieldcontain' class='ui-icon-nodisc'><div class='paddedDivForList'><input type='checkbox' name='" + idForCheckBox + "' id='" + idForCheckBox + "' class='custom'/><img src='http://localhost:8080/BeLinked/PhotoMakerServlet?imageid=" + resultData[p].source + "' style='width: 50px; height: 50px'/><label for='checkbox-1'>" + resultData[p].name  + " is also the " + resultData[p].relationshipToOther + " of the same " + selectedRelationship + "</label></div></li>");
			      		  	  $("#relationship_confirms").listview('refresh');
			      		  	  listOfConfirms.push(idForCheckBox);
			          	  //} 
			          	}
		            //}

		        },
		        error : function(jqXHR, textStatus, errorThrown) {
		        },

		        timeout: 120000,
		    });
	  });
	  
	  
	  $("#mainPage").bind('pageinit', function() {
		  console.log("initialized");
		    ImmediateFamilyView.paintTree();
		});
	  
	  
	  

      
	});
    </script>
  </body>
</html>
