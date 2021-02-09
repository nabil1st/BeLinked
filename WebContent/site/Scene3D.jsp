<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!doctype html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Sample Three.js</title>
		<style>
			#container {
				background: #000;
				width: 1000px;
				height: 800px;
			}
		</style>
	</head>
	<body>

		<div id="container">
		</div>
		
		<input type="button" value="Click" onclick="renderer.render(scene, camera);"/>
		
	<script src="<%=request.getContextPath()%>/js/jquery.min.js"></script>	
	<script src="<%=request.getContextPath()%>/js/three.min.js"></script>

	<script type="text/javascript">
	
	var renderer;
	var scene;
	var camera;
	
	jQuery(function($){		

		console.log("Start");
		// set the scene size
		var WIDTH = 1000,
			HEIGHT = 800;

		// set some camera attributes
		var VIEW_ANGLE = 75,
			ASPECT = WIDTH / HEIGHT,
			NEAR = 0.1,
			FAR = 10000;

		// get the DOM element to attach to
		// - assume we've got jQuery to hand
		var $container = $('#container');

		// create a WebGL renderer, camera
		// and a scene
		renderer = new THREE.WebGLRenderer();
		camera = new THREE.PerspectiveCamera(  VIEW_ANGLE,
										ASPECT,
										NEAR,
										FAR  );
		scene = new THREE.Scene();

		// the camera starts at 0,0,0 so pull it back
		camera.position.z = 600;

		// start the renderer
		renderer.setSize(WIDTH, HEIGHT);

		// attach the render-supplied DOM element
		$container.append(renderer.domElement);

		// create the sphere's material
		var sphereMaterial = new THREE.MeshPhongMaterial(
		{
			color: 0xCC0000
		});

		// set up the sphere vars
		var radius = 100, segments = 16, rings = 16;

		// create a new mesh with sphere geometry -
		// we will cover the sphereMaterial next!
		var sphere = new THREE.Mesh(
		   new THREE.SphereGeometry(radius, segments, rings),
		   sphereMaterial);
		   
		sphere.position.x = 0;
		sphere.position.y = 0;
		
		console.log(sphere.position.x);
		console.log(sphere.position.y);

		// add the sphere to the scene
		//scene.add(sphere);
		
		var sphere2 = new THREE.Mesh(
		   new THREE.SphereGeometry(radius, segments, rings),
		   sphereMaterial);
		   
		sphere2.position.x = -20;
		sphere2.position.y = 0;
		sphere2.position.z = -50;
		
		//scene.add(sphere2);
		
		console.log("Loading image");
		var planeMaterial = new THREE.MeshLambertMaterial({
	        map: THREE.ImageUtils.loadTexture("http://localhost:8080/BeLinked/PhotoMakerServlet?imageid=10.png") 
	      });
		
		planeMaterial.map.needsUpdate = true; 
		
		/*var plane = new THREE.Mesh(new THREE.PlaneGeometry(125, 125), planeMaterial);
		plane.overdraw = true;
		plane.position.x = 0;
		plane.position.y = -50;
		plane.position.z = 0;
		scene.add(plane);*/
		
		var cube = new THREE.Mesh(new THREE.CubeGeometry(125, 125, 125), planeMaterial);
	      cube.overdraw = true;
	      cube.position.x = 0;
	      cube.position.y = 0;
	      cube.position.z = -100;
	      cube.rotation.x = Math.PI * 0.1;
	      //scene.add(cube);
	      
	      
	      var sphere3 = new THREE.Mesh(
	   		   new THREE.SphereGeometry(radius, segments, rings),
	   		planeMaterial);
	      scene.add(sphere3);

		// and the camera
		scene.add(camera);

		// create a point light
		var pointLight = new THREE.PointLight( 0xFFFFFF );

		// set its position
		pointLight.position.x = 10;
		pointLight.position.y = 50;
		pointLight.position.z = 230;

		// add to the scene
		scene.add(pointLight);

		// draw!
		renderer.render(scene, camera);
		
		console.log("Done");
	});
	</script>

	</body>
	
</html>
