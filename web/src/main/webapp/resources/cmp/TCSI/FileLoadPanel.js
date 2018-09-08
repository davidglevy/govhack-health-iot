Ext.require([ 'Ext.grid.*', 'Ext.data.*', 'Ext.selection.CheckboxModel' ]);

Ext.define('FileLoad', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'fileName'
	}, {
		name : 'date_ingest',
		type : 'date',
		dateFormat : 'Y-m-d H:i:s'
	}, {
		name : 'fileCount',
		type : 'int'
	}, {
		name : 'fileSize',
		type : 'int'
	}, {
		name : 'date_completed',
		type : 'date',
		dateFormat : 'Y-m-d H:i:s'
	}, {
		name : 'investigation'
	}, {
		name : 'progress',
		type : 'int'
	}, {
		name : 'id'
	}, {
		name : 'last_modified',
		type : 'date',
		dateFormat : 'Y-m-d H:i:s'
	}, {
		name : 'status'
	}, {
		name : '_version_',
		type : 'int'
	} ]
});

Ext.define('TCSI.FileLoadPanel', {
    extend: 'Ext.panel.Panel',
    initComponent: function () {
        this.callParent();
        
        var me = this;
        var button = Ext.create("Ext.button.Button", {
        		text: 'Refresh',
            handler: function() {
                me.search();
            }
        });

        me.add(button);
    },
    search: function() {
    	var me = this;
    	
    	Ext.Ajax.request({
    		url : endPointHost + "/image-ui/file-load.do",
    		success : function(result, request) {
    			var jsonData = Ext.util.JSON.decode(result.responseText);
    			// var resultMessage = jsonData.data.result;
    			console.log("worked");
    			var resultsArray = [];

    			Ext.Array.forEach(jsonData, function(resultObj) {
    				var resultArray = [];
    				resultArray.push(resultObj.fileName);
    				resultArray.push(resultObj["date_ingest"]);
    				resultArray.push(resultObj.fileCount);
    				resultArray.push(resultObj.fileSize);
    				resultArray.push(resultObj["date_completed"]);
    				resultArray.push(resultObj.investigation);
    				resultArray.push(resultObj.progress);
    				resultArray.push(resultObj.id);
    				resultArray.push(resultObj["last_modified"]);
    				resultArray.push(resultObj.status);
    				resultArray.push(resultObj["_version_"]);

    				// Add the new result array to the results
    				resultsArray.push(resultArray);

    			});

    			console.log("Length of results [" + resultsArray.length + "]");

    			tempStore = Ext.create('Ext.data.ArrayStore', {
    				model : 'FileLoad',
    				data : resultsArray
    			});

    			
    			var existing = me.getComponent('grid');
    			if (existing != null) {
    				wrapper.remove(existing);
    				//wrapper.doLayout();
    			}

    			
    			var grid1 = Ext.create('Ext.grid.Panel', {
    				itemId : 'grid',
    				store : tempStore,
    				columns : [ {
    					text : "File Name",
    					flex : 1,
    					dataIndex : 'fileName'
    				}, {
    					text : "File Count",
    					dataIndex : 'fileCount'
    				}, {
    					text : "Date Ingested",
    					renderer : Ext.util.Format.dateRenderer('d/M/Y H:i:s'),
    					dataIndex : 'date_ingest'
    				} ],
    				columnLines : true,
    				enableLocking : true,
    				width : 600,
    				height : 300,
    				// inline buttons
    				collapsible : true,
    				animCollapse : false,
    				title : 'Files Found',
    				iconCls : 'icon-grid',
    				margin : '0 0 20 0'
    				
    			});

    			me.add(grid1);
    		},
    		failure : function(result, request) {
    			var jsonData = Ext.util.JSON.decode(result.responseText);
    			// var resultMessage = jsonData.data.result;
    			console.log("didn't work");
    		}

    	});
    }

    	
    }
);