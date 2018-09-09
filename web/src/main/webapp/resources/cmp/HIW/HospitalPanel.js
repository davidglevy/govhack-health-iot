Ext.define('HIW.HospitalPanel', {
	extend : 'Ext.panel.Panel',
	// requires : [ 'TCSI.ProviderSearch', 'TCSI.ProviderCreator' ],
	header : {},
	header : true,
	html : '<div id="pixi"></div>',
	initComponent : function() {
		this.callParent();

		this.firstTabChange = true;

		var me = this;
	},
	somethingElse : function() {
		console.log("doing something else");
		this.creatorPanel.hide();
		this.searchPanel.show();
	},
	doTabChange : function() {
		if (this.firstTabChange) {
			var me = this;

			console.log("First tab change in hospital tab");
			this.firstTabChange = false;

			// var DomEl = this.getEl();
			// get Id
			// var DomElId = DomEl.id;

			let app = new PIXI.Application({
				width : 600, // default: 800
				height : 400, // default: 600
				antialias : true, // default: false
				transparent : false, // default: false
				resolution : 1
			// default: 1
			});
			this.pixiApp = app;

			let line = new PIXI.Graphics();
			line.lineStyle(2, 0xFFFFFF, 1);
			line.moveTo(0, 0);
			line.lineTo(80, 50);
			line.x = 32;
			line.y = 400;
			app.stage.addChild(line);

			Ext.Ajax.request({
				url : basePath + '/floor/aaa_0',
				withCredentials : false,
				useDefaultXhrHeader : false,
				method : 'GET',
				// params: params,
				callback : function(options, success, response) {
					console.log("Received: " + response);

					var jsonData = Ext.util.JSON.decode(response.responseText);

					me.drawCorners(jsonData);

				}
			});

			// document.body.appendChild(app.view);

			var element = document.getElementById("pixi");
			element.appendChild(app.view);
			this.updateLayout();

		}
	},
	drawCorners : function(jsonData) {
		var lastPoint = null;

		var scale = 2.5;
		
		var path = [];

		for (var i = 0; i < jsonData.corners.length; i++) {
			var point = jsonData.corners[i];

			path.push(point.x / scale);
			path.push(point.y / scale);

		}
		
		var graphics = new PIXI.Graphics();
		graphics.lineStyle(2, 0xFFFFFF, 1);
		graphics.beginFill(0x0000ff, 1);
		graphics.drawPolygon(path);
		graphics.endFill();
		this.pixiApp.stage.addChild(graphics);

		for (var i = 0; i < jsonData.rooms.length; i++) {
			path = [];
			
			var room = jsonData.rooms[i];
			for (var j = 0; j < room.corners.length; j++) {
				var point = room.corners[j];
				
				path.push(point.x / scale);
				path.push(point.y / scale);
				
			}
			
			var graphics = new PIXI.Graphics();
			graphics.lineStyle(2, 0xFFFFFF, 1);
			graphics.beginFill(0xaaaaaa, 1);
			graphics.drawPolygon(path);
			graphics.endFill();
			this.pixiApp.stage.addChild(graphics);
		}
		
	}
});