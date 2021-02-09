<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="../../assets/ico/favicon.png">

    <title>BeLinked - Define your family tree</title>

    <!-- Bootstrap core CSS -->
    <link href="<%=request.getContextPath()%>/css/bootstrap.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="<%=request.getContextPath()%>/css/jumbotron.css" rel="stylesheet">
	<link href="<%=request.getContextPath()%>/css/main.css" rel="stylesheet">
	<link rel="stylesheet" href="<%=request.getContextPath()%>/css/jquery.Jcrop.css" type="text/css" />
		
	<script src="<%=request.getContextPath()%>/js/jquery.min.js"></script>
	<script src="<%=request.getContextPath()%>/js/jquery.Jcrop.js"></script>
	
	<script src="<%=request.getContextPath()%>/js/main.js"></script>
	<script src="<%=request.getContextPath()%>/js/picturetool.js"></script>
	

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

    <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Project name</a>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li class="divider"></li>
                <li class="dropdown-header">Nav header</li>
                <li><a href="#">Separated link</a></li>
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li>
          </ul>
          <form class="navbar-form navbar-right">
            <div class="form-group">
              <input type="text" placeholder="Email" class="form-control">
            </div>
            <div class="form-group">
              <input type="password" placeholder="Password" class="form-control">
            </div>
            <button type="submit" class="btn btn-success">Sign in</button>
          </form>
        </div><!--/.navbar-collapse -->
      </div>
    </div>

    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">
      <div class="container">
        <h1>Hello, world!</h1>
        <p>This is a template for a simple marketing or informational website. It includes a large callout called the hero unit and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
        <p><a class="btn btn-primary btn-lg">Learn more &raquo;</a></p>
      </div>
    </div>

    <div class="container">
      <!-- Example row of columns -->
      <div class="row">
        <div class="col-lg-4">
          <h2>Heading</h2>
          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
          <p><a class="btn btn-default" href="#">View details &raquo;</a></p>
        </div>
        <div class="col-lg-8">			
			<div id="container" class="hasborder"/>
		</div>
      </div>
	  
	  <div class="row">
        <div class="col-lg-4">          
        </div>
        <div class="col-lg-8">			
			<div class="btn-group">
			  <a href="#addNode">Add a member</a>			  
			</div>
		</div>
      </div>

	  
      <hr>

      <footer>
        <p>&copy; Company 2013</p>
      </footer>
    </div> <!-- /container -->
	
	<div id="addNode" class="modalDialog">
		<div>
			<a href="#close" title="Close" class="close" onclick="closePictureToolWithoutSaving()">X</a>
			<h1>Select a picture</h1>
			
			<div id="main" >
				  <div id="filesInfo" style="">
					<!--<img id="target" src="" alt="[Jcrop Example]" />-->
				  </div>

				<div id="rightSideDiv">
					<div id="previewDiv">
				  		<canvas id="mypreview" width="94" height="94"></canvas>
					</div>
					
					<div class="myformdiv">
						<form class="form">
				            <div class="form-group">
				              <input id="fName" type="text" placeholder="First Name" class="form-control">
				            </div>
				            <div class="form-group">
				              <input id="lName" type="text" placeholder="Last Name" class="form-control">
				            </div>
				            <div class="form-group">
				              <input type="text" placeholder="Last Name" class="form-control">
				            </div>
				            <button type="submit" class="btn btn-success" onclick="window.location.href='#close'; savePictureAndClose()">Save</button>
				        </form>
			        </div>
					
							
				</div>		
				  
			</div>
			<div>  
				<div id="controls">
					<input type="file" class="btn btn-success" id="files" name="files[]"/>
				</div>
			</div>
		</div>
	</div>


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="<%=request.getContextPath()%>/js/bootstrap.min.js"></script>
	
	<script src="http://d3lp1msu2r81bx.cloudfront.net/kjs/js/lib/kinetic-v4.7.2.min.js"></script>
    
	
	<script>
	  
	  jQuery(function($){		
		
		document.getElementById('files').addEventListener('change', handleFileSelect, false);
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
	  
	  $.ajax({
          url: "http://localhost:8080/BeLinked/userTree/1",
          type: "GET",

          contentType: 'application/json; charset=utf-8',
          success: function(resultData) {
              console.log(resultData);
            loadImages(resultData, [], function() {
                drawTree();
            });

          },
          error : function(jqXHR, textStatus, errorThrown) {
          },

          timeout: 120000,
      });

      
	});
    </script>
  </body>
</html>
