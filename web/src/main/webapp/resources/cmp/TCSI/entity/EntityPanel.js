Ext.define('TCSI.entity.EntityPanel', {
	extend : 'Ext.panel.Panel',
	requires : [ 'TCSI.entity.EntitySearch', 'TCSI.entity.EntityCreator', 'TCSI.entity.EntityDetails' ],
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

		var searchPanel = Ext.create("TCSI.entity.EntitySearch", {
			width : 800,
		    title: 'Search',
		    	handleCreate : function() {
		    		console.log("Here we are");
		    		me.handleClickCreate();
		    	},
		    	selectEntity : function(name) {
		    		me.selectEntity(name);
		    	}
		});
		me.add(searchPanel);
		//searchPanel.hide();
		me.searchPanel = searchPanel;
		
		var entityCreatorPanel = Ext.create("TCSI.entity.EntityCreator", {
			width : 800,
			handleSuccess : function() {
				me.creatorPanel.hide();
				me.searchPanel.show();
				me.searchPanel.refreshStore();
			},
			entityPanel : me,
		    title: 'Create'
		});
		me.add(entityCreatorPanel);
		entityCreatorPanel.hide();
		me.creatorPanel = entityCreatorPanel;
		
		var entityDetailsPanel = Ext.create("TCSI.entity.EntityDetails", {
			width : 800,			
			entityPanel : me,
		    title: 'Detail'
		});
		me.add(entityDetailsPanel);
		entityDetailsPanel.hide();
		me.detailsPanel = entityDetailsPanel;
		
		
		
		//me.creatorPanel.initializeFieldPanel();
		
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
		console.log("here in entity panel");
		this.creatorPanel.hide();
		this.searchPanel.show();
		this.searchPanel.refreshStore();
},
	handleClickCreate : function() {
		console.log("Clicked Create button in search panel");
		this.searchPanel.hide();		
		this.creatorPanel.show();
		this.creatorPanel.reset();
	},
	somethingElse : function() {
		console.log("doing something else");
	},
	selectEntity : function(name) {
		console.log("selecting [" + name + "]");
		var me = this;
		this.detailsPanel.load(name, function() {
			console.log("Showing detail panel");
			me.searchPanel.hide();
			me.detailsPanel.show();			
		});
	}
});