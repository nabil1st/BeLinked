var ImmediateFamilyView = {
	vgap: 50,
	tooltipHeight: 40,
	tooltipGap: 5,	
	self: {},
	spouce: null,
	children: [],
	parents: [],
	siblings: [],
	shapeIdToDataMap: {},
	loadedImages: 0,
	numImages: 0,
	mainFrame: null,
	
	
	processPerson: function (collection, item, callback) {	
		var person = new Image();			
		person.id = item.id;
		person.relationship = item.relationship;
		person.relationship_detail = item.relationship_detail;
		person.name = item.name;
		person.sex = item.sex;
		
		person.onload = function() {
			if(++ImmediateFamilyView.loadedImages >= ImmediateFamilyView.numImages) {
				
			  callback();
			}
		};
		
		if (collection != null) {
			collection.push(person);
		}
		
		//person.src = item.source;
		person.src = "http://localhost:8080/BeLinked/PhotoMakerServlet?imageid=" + item.source;
				
		if (collection == null) {
			return person;
		}
	
	},
			
	loadImages: function (sources, callback) {		
		// get num of sources
		
		ImmediateFamilyView.numImages = sources.length;
		console.log("numImages = " + ImmediateFamilyView.numImages);
				
		for(var p=0; p<sources.length; p++) {
		  if (sources[p].relationship == "self") {
			ImmediateFamilyView.self = ImmediateFamilyView.processPerson(null, sources[p], callback);
		  } else if (sources[p].relationship == "spouce") {
			ImmediateFamilyView.spouce = ImmediateFamilyView.processPerson(null, sources[p], callback);
		  } else if (sources[p].relationship == "child") {
			  ImmediateFamilyView.processPerson(ImmediateFamilyView.children, sources[p], callback);
		  } else if (sources[p].relationship == "parent") {
			  ImmediateFamilyView.processPerson(ImmediateFamilyView.parents, sources[p], callback);
		  } else if (sources[p].relationship == "sibling") {
			  ImmediateFamilyView.processPerson(ImmediateFamilyView.siblings, sources[p], callback);
		  }
		}
	  },
      

	  createFrame: function (node, layer, shapeIdToDataMap, borderColor) {	
	
		var strokeWidth = 3;
		if (node.relationship === 'self') {
			strokeWidth = 5;
		}
		
		var frame = new Kinetic.Rect({	
			fillPatternImage: node,
			fillPatternRepeat: "no-repeat",
			//fillPatternOffset: [50, 50],
			x: node.xCo,
			y: node.yCo,
			width: GLOBAL_VALUES.FRAME_WIDTH,
			height: GLOBAL_VALUES.FRAME_HEIGHT,
			stroke: borderColor,
			strokeWidth: strokeWidth,
			opacity: 1,
			listening: true
		});
		
		var tooltip;
		
		shapeIdToDataMap[frame._id] = node;
		
		frame.on('mousedown touchstart', function() {
			console.log("frame clicked retriev tree for " + node.id);
			GLOBAL_VALUES.selectedPersonId = node.id;
			ImmediateFamilyView.paintTree();
		});
		
		frame.on('mouseover', function(evt) {				
			this.setStroke("000000");
			
			// tooltip
			tooltip = new Kinetic.Label({
				x: node.xCo,
				y: node.yCo,
				opacity: 1
			});
	
			tooltip.add(new Kinetic.Tag({
				fill: '8B0000',
				pointerDirection: 'down',
				pointerWidth: 10,
				pointerHeight: 10,
				lineJoin: 'round',
				shadowColor: 'CD0000',
				shadowBlur: 0,
				shadowOffset: 0,
				shadowOpacity: 0.5
			}));
			  
			var tooltipText = node.name;
			if (node.relationship != "self") {
				tooltipText += " (" + node.relationship_detail + ")";
			}
			tooltip.add(new Kinetic.Text({
				text: tooltipText,
				fontFamily: 'Calibri',
				fontSize: 18,
				padding: 5,
				fill: 'white'
			}));
			  
			layer.add(tooltip);				
			layer.draw();				
		});
		frame.on('mouseout', function(evt) {
			//console.log("mouseout");
			this.setStroke(borderColor);
			if (tooltip != null) {
				tooltip.remove();
				tooltip = null;
				layer.draw();
			}
		});
		
		return frame;
	},        
		
	drawTree: function () {	
		var cont = $("#container")[0];
		
		console.log($("#container")[0].clientWidth);
		console.log($("#container")[0].clientHeight);
		console.log(cont);
		
		console.log(cont.style);
		if (GLOBAL_VALUES.STAGE_WIDTH <= 0) {
			GLOBAL_VALUES.STAGE_WIDTH = cont.clientWidth;
			GLOBAL_VALUES.viewControlsCenterX = GLOBAL_VALUES.STAGE_WIDTH - 100;
		}
		
		if (GLOBAL_VALUES.STAGE_HEIGHT <= 0) {
			GLOBAL_VALUES.STAGE_HEIGHT = cont.clientHeight;
		}
		
		console.log("stageWidth = " + GLOBAL_VALUES.STAGE_WIDTH);
		console.log("stageHeight = " + GLOBAL_VALUES.STAGE_HEIGHT);
		
		var frameHalfWidth = GLOBAL_VALUES.FRAME_WIDTH / 2;
		var frameHalfHeight = GLOBAL_VALUES.FRAME_HEIGHT / 2;
		
		console.log(cont);
		
		if (GLOBAL_VALUES.STAGE != null) {
			console.log("stage already created- clearing the layer");
			GLOBAL_VALUES.LAYER2.removeChildren();
			GLOBAL_VALUES.LAYER2.setX(0);
			GLOBAL_VALUES.LAYER2.setY(0);
		} else {					
			console.log("create new stage");
			GLOBAL_VALUES.STAGE = new Kinetic.Stage({
				container: 'container',
				width: GLOBAL_VALUES.STAGE_WIDTH,
				height: GLOBAL_VALUES.STAGE_HEIGHT
			});
			
			GLOBAL_VALUES.LAYER2 = new Kinetic.Layer();
			GLOBAL_VALUES.STAGE.add(GLOBAL_VALUES.LAYER2);
		}
		
		
	
		var selfCenterX = GLOBAL_VALUES.STAGE_WIDTH / 2;
		var selfCenterY = GLOBAL_VALUES.STAGE_HEIGHT / 2;
		var selfX = selfCenterX - frameHalfWidth;
		var selfY = selfCenterY - frameHalfHeight;
	
		console.log("selfX = " + selfX);
		console.log("selfY = " + selfY);
		
		// Draw self
		ImmediateFamilyView.self.xCo = selfX;
		ImmediateFamilyView.self.yCo = selfY;
						
		console.log("Adding self");
		ImmediateFamilyView.mainFrame = ImmediateFamilyView.createFrame(ImmediateFamilyView.self, GLOBAL_VALUES.LAYER2, ImmediateFamilyView.shapeIdToDataMap, 'CDBE70');
		GLOBAL_VALUES.LAYER2.add(ImmediateFamilyView.mainFrame);
		
		// Draw Spouce
		if (ImmediateFamilyView.spouce != null)
		{
			console.log("Adding spouce");
			// Draw Spouce Label				
			var stooltip = new Kinetic.Label({
				x: ImmediateFamilyView.self.xCo - ImmediateFamilyView.tooltipHeight - ImmediateFamilyView.tooltipGap,
				y: ImmediateFamilyView.self.yCo + frameHalfWidth,
				width: GLOBAL_VALUES.FRAME_HEIGHT,
				height: ImmediateFamilyView.tooltipHeight,
				opacity: 0.75
			});
	
			stooltip.add(new Kinetic.Tag({
				fill: 'black',
				pointerDirection: 'up',
				pointerWidth: GLOBAL_VALUES.FRAME_HEIGHT,
				pointerHeight: 10,
				lineJoin: 'round',
				shadowColor: 'black',
				shadowBlur: 0,
				shadowOffset: 0,
				shadowOpacity: 0.5
			}));
			  
			stooltip.add(new Kinetic.Text({
				text: 'Spouce',
				fontFamily: 'Calibri',
				fontSize: 18,
				padding: 5,
				width: GLOBAL_VALUES.FRAME_HEIGHT,
				align: 'center',
				fill: 'white'
			}));
			
			stooltip.rotateDeg(-90);				
			GLOBAL_VALUES.LAYER2.add(stooltip);	
			
			var spouceX = selfCenterX - GLOBAL_VALUES.FRAME_WIDTH - frameHalfWidth - ImmediateFamilyView.tooltipHeight - ImmediateFamilyView.tooltipGap - ImmediateFamilyView.tooltipGap;
			var spouceY = selfY;
			
			
			ImmediateFamilyView.spouce.xCo = spouceX;
			ImmediateFamilyView.spouce.yCo = spouceY;
			
			var spouceFrame = ImmediateFamilyView.createFrame(ImmediateFamilyView.spouce, GLOBAL_VALUES.LAYER2, ImmediateFamilyView.shapeIdToDataMap, 'DAA520');
			GLOBAL_VALUES.LAYER2.add(spouceFrame);
		}
		
		var childrenY = selfCenterY + frameHalfHeight + ImmediateFamilyView.vgap;
		var childrenAxisWidth = ((ImmediateFamilyView.children.length * GLOBAL_VALUES.FRAME_WIDTH) + ((ImmediateFamilyView.children.length - 1) * GLOBAL_VALUES.HGAP));
		var childrenStartX = selfCenterX - childrenAxisWidth / 2;
		
		if (ImmediateFamilyView.children.length > 0) {
			
			console.log(ImmediateFamilyView.children.length);
			
			// Draw parent's label
			var ctooltip = new Kinetic.Label({
				x: ImmediateFamilyView.self.xCo + frameHalfWidth,
				y: childrenY - 5,
				width: GLOBAL_VALUES.FRAME_WIDTH,
				opacity: 0.75
			});
	
			ctooltip.add(new Kinetic.Tag({
				fill: 'black',
				pointerDirection: 'down',
				pointerWidth: GLOBAL_VALUES.FRAME_WIDTH,
				pointerHeight: 10,
				lineJoin: 'round',
				shadowColor: 'black',
				shadowBlur: 0,
				shadowOffset: 0,
				shadowOpacity: 0.5
			}));
			  
			ctooltip.add(new Kinetic.Text({
				text: 'Children',
				fontFamily: 'Calibri',
				fontSize: 18,
				padding: 5,
				width: GLOBAL_VALUES.FRAME_WIDTH,
				align: 'center',
				fill: 'white'
			}));
			  
			GLOBAL_VALUES.LAYER2.add(ctooltip);	
			
			for (var i=0; i<ImmediateFamilyView.children.length; i++)
			{	
				var child = ImmediateFamilyView.children[i];
				var childX = childrenStartX + (i * GLOBAL_VALUES.HGAP) + (i * GLOBAL_VALUES.FRAME_WIDTH);
				
				child.xCo = childX;
				child.yCo = childrenY;
				
				var childFrame = ImmediateFamilyView.createFrame(child, GLOBAL_VALUES.LAYER2, ImmediateFamilyView.shapeIdToDataMap, child.sex === "m"?'1E90FF':'FFB6C1');				
				GLOBAL_VALUES.LAYER2.add(childFrame);
				
			}
		}
		
		var parentsY = selfCenterY - frameHalfHeight - GLOBAL_VALUES.FRAME_HEIGHT - ImmediateFamilyView.vgap;
		var parentsAxisWidth = ((ImmediateFamilyView.parents.length * GLOBAL_VALUES.FRAME_WIDTH) + ((ImmediateFamilyView.parents.length - 1) * GLOBAL_VALUES.HGAP));
		var parentsStartX = selfCenterX - parentsAxisWidth / 2;
		
		if (ImmediateFamilyView.parents.length > 0) {
			// Draw parent's label
			var ptooltip = new Kinetic.Label({
				x: ImmediateFamilyView.self.xCo + frameHalfWidth,
				y: parentsY + GLOBAL_VALUES.FRAME_HEIGHT + 5,
				width: GLOBAL_VALUES.FRAME_WIDTH,
				opacity: 0.75
			});
	
			ptooltip.add(new Kinetic.Tag({
				fill: 'black',
				pointerDirection: 'up',
				pointerWidth: GLOBAL_VALUES.FRAME_WIDTH,
				pointerHeight: 10,
				lineJoin: 'round',
				shadowColor: 'black',
				shadowBlur: 0,
				shadowOffset: 0,
				shadowOpacity: 0.5
			}));
			  
			ptooltip.add(new Kinetic.Text({
				text: 'Parents',
				fontFamily: 'Calibri',
				fontSize: 18,
				padding: 5,
				width: GLOBAL_VALUES.FRAME_WIDTH,
				align: 'center',
				fill: 'white'
			}));
			  
			GLOBAL_VALUES.LAYER2.add(ptooltip);	
			
			for (var i=0; i<ImmediateFamilyView.parents.length; i++)
			{
				var parent = ImmediateFamilyView.parents[i];
				var parentX = parentsStartX + (i * GLOBAL_VALUES.HGAP) + (i * GLOBAL_VALUES.FRAME_WIDTH);
				
				parent.xCo = parentX;
				parent.yCo = parentsY;
								
				var parentFrame = ImmediateFamilyView.createFrame(parent, GLOBAL_VALUES.LAYER2, ImmediateFamilyView.shapeIdToDataMap, '555555');				
				GLOBAL_VALUES.LAYER2.add(parentFrame);
				
			}
		}
		
		var siblingsStartX = selfCenterX + frameHalfWidth + ImmediateFamilyView.tooltipHeight + ImmediateFamilyView.tooltipGap + ImmediateFamilyView.tooltipGap;
		var siblingsY = selfY;
		
		if (ImmediateFamilyView.siblings.length > 0)
		{
			var sbtooltip = new Kinetic.Label({
				x: ImmediateFamilyView.self.xCo + GLOBAL_VALUES.FRAME_WIDTH + ImmediateFamilyView.tooltipHeight + ImmediateFamilyView.tooltipGap,
				y: ImmediateFamilyView.self.yCo + frameHalfWidth,
				width: GLOBAL_VALUES.FRAME_HEIGHT,
				height: ImmediateFamilyView.tooltipHeight,
				opacity: 0.75
			});
	
			sbtooltip.add(new Kinetic.Tag({
				fill: 'black',
				pointerDirection: 'up',
				pointerWidth: GLOBAL_VALUES.FRAME_HEIGHT,
				pointerHeight: 10,
				lineJoin: 'round',
				shadowColor: 'black',
				shadowBlur: 0,
				shadowOffset: 0,
				shadowOpacity: 0.5
			}));
			  
			sbtooltip.add(new Kinetic.Text({
				text: 'Siblings',
				fontFamily: 'Calibri',
				fontSize: 18,
				padding: 5,
				width: GLOBAL_VALUES.FRAME_HEIGHT,
				align: 'center',
				fill: 'white'
			}));
			
			sbtooltip.rotateDeg(90);				
			GLOBAL_VALUES.LAYER2.add(sbtooltip);	
			
			for (var i=0; i<ImmediateFamilyView.siblings.length; i++)
			{
				var sibling = ImmediateFamilyView.siblings[i];
				var siblingX = siblingsStartX + (i * GLOBAL_VALUES.HGAP) + (i * GLOBAL_VALUES.FRAME_WIDTH);
				
				sibling.xCo = siblingX;
				sibling.yCo = siblingsY;
								
				var siblingFrame = ImmediateFamilyView.createFrame(sibling, GLOBAL_VALUES.LAYER2, ImmediateFamilyView.shapeIdToDataMap, '555555');				
				GLOBAL_VALUES.LAYER2.add(siblingFrame);
				
			}
		}			
		
		// Create navigation panel
		GLOBAL_VALUES.createNavigationPanel();
		GLOBAL_VALUES.LAYER2.draw();
		
	},

	paintTree: function () {
		console.log("paintTree()");
		ImmediateFamilyView.spouce = null;
		ImmediateFamilyView.children = [];
		ImmediateFamilyView.parents = [];
		ImmediateFamilyView.siblings = [];
	
		ImmediateFamilyView.shapeIdToDataMap = {};
		
		ImmediateFamilyView.loadedImages = 0;
		ImmediateFamilyView.numImages = 0;
		
		$.ajax({
	        url: "http://localhost:8080/BeLinked/userTree/" + GLOBAL_VALUES.selectedPersonId,
	        type: "GET",
	
	        contentType: 'application/json; charset=utf-8',
	        success: function(resultData) {
	            console.log(resultData);
	            ImmediateFamilyView.loadImages(resultData, function() {
	            	ImmediateFamilyView.drawTree();
	          });
	
	        },
	        error : function(jqXHR, textStatus, errorThrown) {
	        },
	
	        timeout: 120000,
	    });
	}
}

		
		
		
		
	
	
		