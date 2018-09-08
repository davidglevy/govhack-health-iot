Ext.require([ 'Ext.form.field.Text', 'Ext.button.Button', 'Ext.form.Panel', 'Ext.form.field.File' ]);

Ext.define('TCSI.ProviderSearch', {
	extend : 'Ext.panel.Panel',
	title : 'Search Provider',
	width : 600,
	bodyPadding : 10,
	initComponent : function() {
		this.callParent();
		
		var me = this;
		
		var testSearch = Ext.create('Ext.form.Panel', {
			//title: "Search",
		    items: [
		        {
		        	xtype: 'fieldset',
		            title: 'Enter Filter Criteria',
		            items: [
		                {
		                    xtype: 'textfield',
		                    //label: 'First Name',
		                    //fieldLabel: 'First Name',
		                    name: 'filter'
		                }
//		                ,
//		                {
//		                    xtype: 'textfield',
//		                    fieldLabel: 'Last Name',
//		                    name: 'lastName'
//		                }
		            ]
		        }
		    ]
		});
		me.add(testSearch);
		
		
		var store = Ext.create('Ext.data.Store', {
	        fields: ['id', 'name', 'abn'],

	        autoLoad: true,
	        pageSize: 100,

	        proxy: {
	            type: 'ajax',
	            url: basePath + '/providers',
	            reader: {
	                type: 'json',
	                rootProperty: 'data',
	                totalProperty: 'total'
	            }
	            //extraParams: {
	                //name: name,
	                //total: total
	            //}
	        }
	    });
		this.providerStore = store;
		
		var tabPanel = Ext.create({
		    xtype: 'tabpanel',
		    items: [{
		        title: 'Providers',
		        xtype: 'grid',
		        iconCls: 'x-fa fa-users',
		        
		        store: store,
		        columns: [{
		            text: 'ID',
		            dataIndex: 'id',
		            flex: 1
		        }, {
		            text: 'Name',
		            dataIndex: 'name',
		            flex: 1
		        }, {
		            text: 'ABN',
		            dataIndex: 'abn',
		            flex: 1
		        }]
		    }]
		});
		me.add(tabPanel);
		
//		var searchField = Ext.create('Ext.field.Search', {
//			fieldLabel : 'Search Providers',
//			name : 'search'
//		})
//		searchPanel.add(searchField);
		
	},
	refreshStore : function() {
		this.store.reload();
	}
});