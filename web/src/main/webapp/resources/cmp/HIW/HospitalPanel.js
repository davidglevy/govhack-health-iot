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
				height : 600, // default: 600
				antialias : true, // default: false
				transparent : false, // default: false
				resolution : 1
			// default: 1
			});
			this.pixiApp = app;

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

			
			var xSum = 0;
			var ySum = 0;
			
			for (var j = 0; j < room.corners.length; j++) {
				var point = room.corners[j];

				path.push(point.x / scale);
				path.push(point.y / scale);

				
			}
			
			var buttonText = new PIXI.Text(room.name, {
				fontFamily : 'Arial',
				fontSize : 10,
				fill : "white"
				//align : 'right'
			});
			//buttonText.anchor.set(0.5, 0.5);
			buttonText.position.set(room.center.x / scale, room.center.y / scale);
			
			var graphics = new PIXI.Graphics();
			graphics.lineStyle(2, 0xFFFFFF, 1);
			graphics.beginFill(0xaaaaaa, 1);
			graphics.drawPolygon(path);
			graphics.endFill();
			graphics.interactive = true;
			graphics.roomId = room.id;
			graphics.click = function(ev) {
				console.log("Clicked " + ev.target.roomId);
			};

			this.pixiApp.stage.addChild(graphics);
			this.pixiApp.stage.addChild(buttonText);
			//graphics.addChild(buttonText);
		}

	}
});