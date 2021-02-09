var HierarchyView = {
		numHierImages: 0,
		numLoadedHierImages: 0,
		nodesInLevel: {},
		currLevel: 0,
		highestLevel: 0,
		levelWithMaxNodes: 0,
		maxNumberOfNodes: 0,

		rootCenterXForHier: 0,
		rootCenterYForHier: 0,
		frameHalfWidth: 0,
		frameHalfHeight: 0,
		rootXForHier: 0,
		rootYForHier: 0,
		theRootNode: 0,


		startX: 0,
		totalWidth: 0,
		movingX: 0,

		nodeArray: [],

		vgap: 20,
		indexer: 0,

		allLines: [],
		allFrames: [],
			

		createLinkLines: function (x1, y1, x2, y2) {
			var greenLine = new Kinetic.Line({
		        points: [x1, y1, x1, y1 + (y2 - y1)/2, x2, y1 + (y2 - y1)/2, x2, y2], 
		        stroke: 'black',
		        strokeWidth: 2,
		        lineJoin: 'round'        
		      });
			
			return HierarchyView.allLines.push(greenLine);
		},

		createFrameForHierarchy: function (node, borderColor, layer) {
			//console.log(self.x);
			//console.log(self.y);
			//console.dir(self);
			
			var strokeWidth = 3;
				
			var frame = new Kinetic.Rect({	
				fillPatternImage: node.image,
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
				
			//frame.on('mousedown touchstart', function() {
			//	console.log("frame clicked retriev tree for " + node.id);
			//	GLOBAL_VALUES.selectedPersonId = node.id;
			//	paintTree();
			//});
			
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
				  
				var tooltipText = node.info.name;
				
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

		renderAllNodes: function () {
			HierarchyView.nodeArray.sort(function(a, b) {
				if (a.leve === b.level) {
					if (a.index > b.index) {
						return 1;
					} else if (a.index < b.index) {
						return -1;
					} else {
						return 0;
					}			
				} else {
					if (a.level > b.level) {
						return 1;
					} else if (a.level < b.level) {
						return -1;
					} else {
						return 0;
					}			
				}
			});	
			
			HierarchyView.nodeArray[0].xCo = HierarchyView.rootXForHier;
			HierarchyView.nodeArray[0].yCo = HierarchyView.rootYForHier;
			
			HierarchyView.allFrames.push(HierarchyView.createFrameForHierarchy(
					HierarchyView.nodeArray[0], 'CDBE70', GLOBAL_VALUES.LAYER2));
			
			for (var i=0; i<HierarchyView.nodeArray.length; i++) {
				var node = HierarchyView.nodeArray[i];
								
				
				// Calculate the x and y coordinates of the node based on info about parent and children
				// What width is needed for this node, this width should be enough to encompass all children underneath
				var branchWidth = GLOBAL_VALUES.FRAME_WIDTH;
				if (node.maxChildCount > 0) {
					branchWidth = (node.maxChildCount * GLOBAL_VALUES.FRAME_WIDTH) + 
						((node.maxChildCount - 1) * GLOBAL_VALUES.HGAP);
				}
				
				// Render the node's children
				var branchCenterX = node.xCo;		
				var xmarker = branchCenterX - (branchWidth / 2);
				
				
				for (var c=0; c<node.children.length; c++) {			
					var childNode = node.children[c];			
					var childBranchWidth = GLOBAL_VALUES.FRAME_WIDTH;
					if (childNode.maxChildCount > 0) {
						childBranchWidth = (childNode.maxChildCount * GLOBAL_VALUES.FRAME_WIDTH) + ((childNode.maxChildCount - 1) * GLOBAL_VALUES.HGAP);
					}
					
								
					var childCenterX = xmarker + (childBranchWidth / 2);
					childNode.xCo = childCenterX;
					console.log("rootYForHier = " + HierarchyView.rootYForHier);
					childNode.yCo = (HierarchyView.rootYForHier + childNode.level * (GLOBAL_VALUES.FRAME_HEIGHT + HierarchyView.vgap));
					console.log("----****---- childNode.level = " + childNode.level + " yCo = " + childNode.yCo);
					childNode.rendered = true;
					
					/*HierarchyView.allLines.push(createLine(node.xCo + frameHalfWidth, 
							node.yCo + frameHalfHeight, 
							childNode.xCo + frameHalfWidth, 
							childNode.yCo + frameHalfHeight));*/
					
					HierarchyView.createLinkLines(node.xCo + HierarchyView.frameHalfWidth, 
							node.yCo + HierarchyView.frameHalfHeight, 
							childNode.xCo + HierarchyView.frameHalfWidth, 
							childNode.yCo + HierarchyView.frameHalfHeight);
					
					HierarchyView.allFrames.push(HierarchyView.createFrameForHierarchy(childNode, 'CDBE70', GLOBAL_VALUES.LAYER2));
					
					xmarker += childBranchWidth + GLOBAL_VALUES.HGAP;
					
				}
			}
			
			for (var l=0; l<HierarchyView.allLines.length; l++) {
				GLOBAL_VALUES.LAYER2.add(HierarchyView.allLines[l]);
			}
			
			for (var f=0; f<HierarchyView.allFrames.length; f++) {
				GLOBAL_VALUES.LAYER2.add(HierarchyView.allFrames[f]);
			}
			GLOBAL_VALUES.LAYER2.draw();
			
			GLOBAL_VALUES.createNavigationPanel();
			
		},

		renderNode: function (node, parentNode) {
			console.log("Drawing node " + node.info.id);
			
			node.yCo = HierarchyView.rootYForHier + node.level * (frameHeight + HierarchyView.vgap);
			
			console.log("y = " + node.yCo);
			
			
			if (node.level > HierarchyView.currLevel) {		
				HierarchyView.currLevel = node.level;
				HierarchyView.movingX = HierarchyView.startX;
				console.log("Detecting new level. movingX = " + HierarchyView.movingX);
			}
				
			var widthForNode = (node.maxChildCount * frameWidth) + ((node.maxChildCount - 1) * hgap);
			console.log("widthForNode = " + widthForNode);
			if (HierarchyView.movingX > HierarchyView.startX) {
				HierarchyView.movingX += hgap;
			}
			
			HierarchyView.movingX += (widthForNode / 2);
			node.xCo = HierarchyView.movingX;
			HierarchyView.movingX += (widthForNode / 2);
			
			console.log("x = " + node.xCo);
			
			HierarchyView.createFrameForHierarchy(node, 'CDBE70', layer2);
			
			for (var i=0; i<node.children.length; i++) {
				HierarchyView.renderNode(node.children[i], node);
			}
			
		},

		drawHierarchicalTree: function (rootNode) {
			console.log("All images have been loaded....");
			
			var cont = $("#container")[0];	
			
			if (GLOBAL_VALUES.STAGE_WIDTH <= 0) {
				GLOBAL_VALUES.STAGE_WIDTH = cont.clientWidth;
			}
			
			if (GLOBAL_VALUES.STAGEHeight <= 0) {
				GLOBAL_VALUES.STAGEHeight = cont.clientHeight;
			}
			
			console.log("stageWidth = " + GLOBAL_VALUES.STAGE_WIDTH);
			console.log("stageHeight = " + GLOBAL_VALUES.STAGEHeight);
			
			HierarchyView.frameHalfWidth = GLOBAL_VALUES.FRAME_WIDTH / 2;
			HierarchyView.frameHalfHeight = GLOBAL_VALUES.FRAME_HEIGHT / 2;
			
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
					width: stageWidth,
					height: stageHeight
				});
				
				GLOBAL_VALUES.LAYER2 = new Kinetic.Layer();
				GLOBAL_VALUES.STAGE.add(GLOBAL_VALUES.LAYER2);
			}
			
			var rootCenterXForHier = GLOBAL_VALUES.STAGE_WIDTH / 2;
			var rootCenterYForHier = GLOBAL_VALUES.FRAME_HEIGHT / 2; //stageHeight / 2;
			HierarchyView.frameHalfWidth = GLOBAL_VALUES.FRAME_WIDTH / 2;
			HierarchyView.frameHalfHeight = GLOBAL_VALUES.FRAME_HEIGHT / 2;
			HierarchyView.rootXForHier = rootCenterXForHier - HierarchyView.frameHalfWidth;
			HierarchyView.rootYForHier = rootCenterYForHier - HierarchyView.frameHalfHeight;
			
			HierarchyView.totalWidth = (HierarchyView.maxNumberOfNodes * GLOBAL_VALUES.FRAME_WIDTH) + ((HierarchyView.maxNumberOfNodes - 1) * GLOBAL_VALUES.HGAP);
			console.log("Totalwidth = " + HierarchyView.totalWidth);
			console.log("rootXForHier = " + HierarchyView.rootXForHier);
			HierarchyView.startX = HierarchyView.rootXForHier -  (HierarchyView.totalWidth / 2);
			console.log("startx = " + HierarchyView.startX);
			HierarchyView.movingX = HierarchyView.startX;
			HierarchyView.currLevel = -1;
			
			
			HierarchyView.renderAllNodes();
		},

		countNodesInTree: function (node) {
			HierarchyView.nodeArray.push(node);
			
			console.log("counting");
			node.maxChildCount = node.children.length;
			
			if (HierarchyView.nodesInLevel[HierarchyView.currLevel] == null) {
				HierarchyView.nodesInLevel[HierarchyView.currLevel] = 1;
			} else {
				HierarchyView.nodesInLevel[HierarchyView.currLevel] = HierarchyView.nodesInLevel[HierarchyView.currLevel] + 1;
			}
			
			node.level = HierarchyView.currLevel;
			
			HierarchyView.numHierImages++;
			
			if (node.children.length > 0) {
				HierarchyView.currLevel++;
				if (HierarchyView.currLevel > HierarchyView.highestLevel) {
					HierarchyView.highestLevel = HierarchyView.currLevel;
				}
			}
			
			var childCount = 0;	
			for (var i=0; i<node.children.length; i++) {
				node.children[i].parent = node;
				node.children[i].index = ++HierarchyView.indexer;
				childCount += HierarchyView.countNodesInTree(node.children[i]);		
			}
			
			if (childCount > node.maxChildCount) {
				node.maxChildCount = childCount;
			}
			
			if (node.children.length > 0) {
				HierarchyView.currLevel--;
			}
			
			if (node.maxChildCount > node.children.length) {
				return node.maxChildCount;
			} else {
				// each node will claim at least 1 child so space is allocated properly in the tree
				return node.children.length > 0?node.children.length:1;
			}
			
		},

		processChildren: function (node, callback) {
			console.log("ProcessChildren....")
			node.image = new Image();	
			
			node.image.onload = function() {
				if(++HierarchyView.numLoadedHierImages >= HierarchyView.numHierImages) {			
				  callback();
				}
			};
			
			node.image.src = "http://localhost:8080/BeLinked/PhotoMakerServlet?imageid=" + node.info.source;
			
			for (var i=0; i<node.children.length; i++) {
				HierarchyView.processChildren(node.children[i], callback);
			}
			
			
			console.log("Done processing children " + node.info.id);
			console.log("Node level = " + node.level);
			
		},

		printInfo:function (node) {
			console.log("max child count for node " + node.info.id + " at level " + node.level + " = " + node.maxChildCount);
			for (var i=0; i<node.children.length; i++) {
				HierarchyView.printInfo(node.children[i]);
			}
			
			
			console.log("Done processing children " + node.info.id);
			console.log("Node level = " + node.level);
			
		},

		processResults: function (rootNode, callback) {		
			// get num of sources
			HierarchyView.theRootNode = rootNode;
			
			HierarchyView.numHierImages = 0;
			HierarchyView.numLoadedHierImages = 0;
			rootNode.index = ++HierarchyView.indexer;
			HierarchyView.countNodesInTree(rootNode);
			console.log("Number of nodes in tree = " + HierarchyView.numHierImages);
			console.log("--------");
			HierarchyView.printInfo(rootNode);
			console.log("--------");
			HierarchyView.processChildren(rootNode, callback);
			
			console.log("Highest level = " + HierarchyView.highestLevel);
			console.log("Number of nodes in level 0 " + HierarchyView.nodesInLevel[0]);
			console.log("Number of nodes in level 1 " + HierarchyView.nodesInLevel[1]);
			console.log("Number of nodes in level  2 " + HierarchyView.nodesInLevel[2]); 
			
			for (var i=0; i<=HierarchyView.highestLevel; i++) {
				if (HierarchyView.nodesInLevel[i] > HierarchyView.maxNumberOfNodes) {
					HierarchyView.levelWithMaxNodes = i;
					HierarchyView.maxNumberOfNodes = HierarchyView.nodesInLevel[i]; 
				}
			}
			
			console.log("Max number of nodes = " + HierarchyView.maxNumberOfNodes);
			console.log("Level with max nodes = " + HierarchyView.levelWithMaxNodes);
		 },

		 paintHierarchicalTree: function () {
			console.log("paintHierarchicalTree()");
			spouce = null;
			HierarchyView.nodeArray = [];
			HierarchyView.allLines = [];
			HierarchyView.allFrames = [];			
			HierarchyView.currLevel = 0;
			
			HierarchyView.numLoadedHierImages = 0;
			
			HierarchyView.indexer = 0;
					
			$.ajax({
		        url: "http://localhost:8080/BeLinked/userHierarchy/" + GLOBAL_VALUES.selectedPersonId,
		        type: "GET",
		
		        contentType: 'application/json; charset=utf-8',
		        success: function(resultData) {
		            console.log(resultData);
		          HierarchyView.processResults(resultData, function() {
		              HierarchyView.drawHierarchicalTree();
		          });
		
		        },
		        error : function(jqXHR, textStatus, errorThrown) {
		        },
		
		        timeout: 120000,
		    });
		}
}
