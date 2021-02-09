var GLOBAL_VALUES = {
	selectedPersonId: -1,
	FRAME_WIDTH: 124,
	FRAME_HEIGHT: 124,
	HGAP: 10,
	STAGE: null,
	LAYER2: null,
	LAYER1: null,
	STAGE_WIDTH: 0,
	STAGE_HEIGHT: 0,
	CURRENT_VIEW: 1,
	viewControlsCenterY: 50,
	viewControlsCenterX: 0,
	
	changeView: function () {
		if (GLOBAL_VALUES.CURRENT_VIEW === 1) {
			GLOBAL_VALUES.CURRENT_VIEW = 2;
			HierarchyView.paintHierarchicalTree();
		} else {
			GLOBAL_VALUES.CURRENT_VIEW = 1;
			ImmediateFamilyView.paintTree();
		}		
	},
	
	createNavigationPanel: function () {
		
		if (GLOBAL_VALUES.LAYER1 != null) {
			return;
		}
		
		GLOBAL_VALUES.LAYER1 = new Kinetic.Layer();
		GLOBAL_VALUES.STAGE.add(GLOBAL_VALUES.LAYER1);
		
		var navCenterX = 50;
		var navCenterY = 50;
		
		// Draw navigation controls
		var navCircle = new Kinetic.Circle({	
			fill: 'FFE7BA',
			x: navCenterX,
			y: navCenterY,
			radius: 30,
			stroke: 'FFE7BA',
			strokeWidth: 1,
			opacity: 1
		});
		GLOBAL_VALUES.LAYER1.add(navCircle);
		
		var centerCircle = new Kinetic.Circle({	
			fill: '9C661F',
			x: navCenterX,
			y: navCenterY,
			radius: 5,
			stroke: '9C661F',
			strokeWidth: 1,
			opacity: 1
		});
		
		centerCircle.on('mousedown touchstart', function() {
			GLOBAL_VALUES.LAYER2.setX(0);
			GLOBAL_VALUES.LAYER2.setY(0);
			GLOBAL_VALUES.LAYER2.draw();
		});
		
		GLOBAL_VALUES.LAYER1.add(centerCircle);
		
		
		console.log("ViewControls center x = " + GLOBAL_VALUES.viewControlsCenterX);
		var changeViewCircle = new Kinetic.Circle({	
			fill: '9C661F',
			x: GLOBAL_VALUES.viewControlsCenterX,
			y: GLOBAL_VALUES.viewControlsCenterY,
			radius: 10,
			stroke: '9C661F',
			strokeWidth: 1,
			opacity: 1
		});
		
		changeViewCircle.on('mousedown touchstart', function() {
			GLOBAL_VALUES.changeView();
		});
		
		GLOBAL_VALUES.LAYER1.add(changeViewCircle);
		
		
		var arrowDistanceFromCenter = 14;
		var arrowWidth = 4;
		var arrowStretch = 10;
		var arrowHeight = 10;
		
		var movementStepSize = 20;
		
		var rightArrow = new Kinetic.Polygon({
			points: [navCenterX + arrowDistanceFromCenter, navCenterY - arrowHeight, 
				navCenterX + arrowDistanceFromCenter, navCenterY - arrowHeight, 
				navCenterX + arrowDistanceFromCenter + arrowWidth, navCenterY - arrowHeight, 
				navCenterX + arrowDistanceFromCenter + arrowStretch, navCenterY, 
				navCenterX + arrowDistanceFromCenter + arrowWidth, navCenterY + arrowHeight, 
				navCenterX + arrowDistanceFromCenter, navCenterY + arrowHeight],
			fill: '#9C661F',
			stroke: '9C661F',
			strokeWidth: 1,
			listening: true
		});
		
		rightArrow.on('mousedown touchstart', function() {
			GLOBAL_VALUES.LAYER2.move(-movementStepSize , 0);
			GLOBAL_VALUES.LAYER2.draw();
		});
			
		GLOBAL_VALUES.LAYER1.add(rightArrow);
		
		
		var leftArrow = new Kinetic.Polygon({
			points: [navCenterX - arrowDistanceFromCenter, navCenterY - arrowHeight, 
				navCenterX - arrowDistanceFromCenter, navCenterY - arrowHeight, 
				navCenterX - arrowDistanceFromCenter - arrowWidth, navCenterY - arrowHeight, 
				navCenterX - arrowDistanceFromCenter - arrowStretch, navCenterY, 
				navCenterX - arrowDistanceFromCenter - arrowWidth, navCenterY + arrowHeight, 
				navCenterX - arrowDistanceFromCenter, navCenterY + arrowHeight],
			fill: '#9C661F',
			stroke: '9C661F',
			strokeWidth: 1
		});
		
		leftArrow.on('mousedown touchstart', function() {
			GLOBAL_VALUES.LAYER2.move(movementStepSize , 0);
			GLOBAL_VALUES.LAYER2.draw();
		});
			
		GLOBAL_VALUES.LAYER1.add(leftArrow);
		
		
		var topArrow = new Kinetic.Polygon({
			points: [navCenterX - arrowHeight, navCenterY - arrowDistanceFromCenter, 
				navCenterX - arrowHeight, navCenterY - arrowDistanceFromCenter, 
				navCenterX - arrowHeight, navCenterY - arrowDistanceFromCenter - arrowWidth, 
				navCenterX, navCenterY - arrowDistanceFromCenter - arrowStretch, 
				navCenterX + arrowHeight, navCenterY - arrowDistanceFromCenter - arrowWidth, 
				navCenterX + arrowHeight, navCenterY - arrowDistanceFromCenter],
			fill: '#9C661F',
			stroke: '9C661F',
			strokeWidth: 1
		});
		
		topArrow.on('mousedown touchstart', function() {
			GLOBAL_VALUES.LAYER2.move(0 , movementStepSize);				
			GLOBAL_VALUES.LAYER2.draw();
		});
			
		GLOBAL_VALUES.LAYER1.add(topArrow);
		
		var bottomArrow = new Kinetic.Polygon({
			points: [navCenterX - arrowHeight, navCenterY + arrowDistanceFromCenter, 
				navCenterX - arrowHeight, navCenterY + arrowDistanceFromCenter, 
				navCenterX - arrowHeight, navCenterY + arrowDistanceFromCenter + arrowWidth, 
				navCenterX, navCenterY + arrowDistanceFromCenter + arrowStretch, 
				navCenterX + arrowHeight, navCenterY + arrowDistanceFromCenter + arrowWidth, 
				navCenterX + arrowHeight, navCenterY + arrowDistanceFromCenter],
			fill: '#9C661F',
			stroke: '9C661F',
			strokeWidth: 1
		});
			
		bottomArrow.on('mousedown touchstart', function() {
			GLOBAL_VALUES.LAYER2.move(0 , -movementStepSize);
			GLOBAL_VALUES.LAYER2.draw();
		});
		
		GLOBAL_VALUES.LAYER1.add(bottomArrow);
		GLOBAL_VALUES.LAYER1.draw();
	},
}
