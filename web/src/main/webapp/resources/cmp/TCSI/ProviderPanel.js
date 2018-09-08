Ext.define('TCSI.ProviderPanel', {
	extend : 'Ext.panel.Panel',
	requires : [ 'TCSI.ProviderSearch', 'TCSI.ProviderCreator' ],
	header: {
        // if you want your button positioned on the right hand side add
        // titlePosition: 0,
        items: [{
            xtype: 'splitbutton',
            text: 'test'
        }]
    },
    header : true,
	initComponent : function() {
		this.callParent();

		var me = this;

		var searchPanel = Ext.create("TCSI.ProviderSearch", {
			width : 800
		// ,
		// title: 'Ingest'
		});
		me.add(searchPanel);
		searchPanel.hide();
		me.searchPanel = searchPanel;

		var providerCreatorPanel = Ext.create("TCSI.ProviderCreator", {
			width : 800,
			handleSuccess : function() {
				me.creatorPanel.hide();
				me.searchPanel.show();
				me.searchPanel.refreshStore();
			},
			providerPanel : me
		// title: 'Ingest'
		});
		me.add(providerCreatorPanel);
		me.creatorPanel = providerCreatorPanel;

		//var button = Ext.create("Ext.button.Button", {
		//	text : 'Refresh',
		//	handler : function() {
		//		searchPanel.refreshStore();
		//	}
		//});
		//var header = searchPanel.getHeader();
		//header.add(button);

	},
	handleCreate : function() {
		console.log("here in provider panel");
		this.somethingElse();
	},
	somethingElse : function() {
		console.log("doing something else");
		this.creatorPanel.hide();
		this.searchPanel.show();
	}
});