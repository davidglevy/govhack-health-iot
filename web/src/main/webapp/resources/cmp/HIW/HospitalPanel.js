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

			Ext.Ajax.request({
				url : basePath + '/floor/aaa_0',
				withCredentials : false,
				useDefaultXhrHeader : false,
				method : 'GET',
				// params: params,
				callback : function(options, success, response) {
					console.log("Received: " + response);

					var jsonData = Ext.util.JSON.decode(response.responseText);
					var resultMessage = jsonData.data.result;

					var lastPoint = null;
					
					for (i = 0; i < resultMessage.corners.length; i++) {
						if (lastPoint == null) {
							lastPoint = resultMessage.corners[i];
							continue;
						} else {
							let line = new PIXI.Graphics();
							line.lineStyle(2, 0xFFFFFF, 1);
							line.moveTo(0, 0);
							line.lineTo(80, 50);
							line.x = 32;
							line.y = 400;
							app.stage.addChild(line);
							break;
						}

					}

				}
			});

			// document.body.appendChild(app.view);

			var element = document.getElementById("pixi");
			element.appendChild(app.view);
			this.updateLayout();

		}
	}
});