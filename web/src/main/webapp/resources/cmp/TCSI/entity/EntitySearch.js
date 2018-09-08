Ext.require([ 'Ext.form.field.Text', 'Ext.button.Button', 'Ext.form.Panel',
		'Ext.form.field.File' ]);

Ext.define('TCSI.entity.EntitySearch', {
	extend : 'Ext.panel.Panel',
	title : 'Search Entity',
	width : 600,
	bodyPadding : 10,
	initComponent : function() {
		this.callParent();

		var me = this;

		var testSearch = Ext.create('Ext.form.Panel', {
			// title: "Search",
			items : [ {
				xtype : 'fieldset',
				title : 'Enter Filter Criteria',
				items : [ {
					xtype : 'textfield',
					// label: 'First Name',
					// fieldLabel: 'First Name',
					name : 'filter'
				}
				// ,
				// {
				// xtype: 'textfield',
				// fieldLabel: 'Last Name',
				// name: 'lastName'
				// }
				]
			} ]
		});
		me.add(testSearch);

		var store = Ext.create('Ext.data.Store', {
			fields : [ 'name', 'currentVersion', 'latestVersion' ],

			autoLoad : true,
			pageSize : 100,

			proxy : {
				type : 'ajax',
				url : basePath + '/entitySummaries',
				noCache : true,
				reader : {
					type : 'json',
					rootProperty : 'data',
					totalProperty : 'total'
				}
			// extraParams: {
			// name: name,
			// total: total
			// }
			}
		});
		this.entityStore = store;

		var tabPanel = Ext.create({
			xtype : 'tabpanel',
			items : [ {
				title : 'Entities',
				xtype : 'grid',
				iconCls : 'x-fa fa-users',

				store : store,
				columns : [ {
					text : 'Name',
					dataIndex : 'name',
					flex : 1
				}, {
					text : 'Current Version',
					dataIndex : 'currentVersion',
					flex : 1
				}, {
					text : 'Latest Version',
					dataIndex : 'latestVersion',
					flex : 1
				} ],
				itemclick : function(view, rec, node, index, e, options) {
					console.log("clicked item");
				},
				listeners : {
					select : function(a, b, c, d, e) {
						me.selectEntity(b.data.name);
					}
				}
			} ]
		});
		me.add(tabPanel);
		me.tabPanel = tabPanel;

		// var searchField = Ext.create('Ext.field.Search', {
		// fieldLabel : 'Search Entities',
		// name : 'search'
		// })
		// searchPanel.add(searchField);

		var createButton = Ext.create('Ext.button.Button', {
			text : "Create",
			handler : function() {
				me.handleCreate();
			}
		});
		me.add(createButton);
		me.createButton = createButton;

	},
	refreshStore : function() {
		this.entityStore.reload();
		// this.tabPanel.getView().refresh();
	},
	handleCreate : function() {
		console.log("boop");
	},
	selectEntity : function() {
		console.log("Override this");
	}
});