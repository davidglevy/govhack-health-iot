Ext.define('TCSI.entity.EntityFieldPanelFactory', {
	extend : 'Ext.Base',
	requires : [ "TCSI.entity.EntityFieldDefinitionPanel", "Ext.data.Store" ],
	constructor : function() {
		this.fieldTypes = Ext.create('Ext.data.Store', {
		    fields: ['type', 'display'],
		    data : [
		        {"type":"string", "display":"String"},
		        {"type":"integer", "display":"Integer"},
		        {"type":"date", "display":"Date"}
		    ]
		});	
	},
	buildField : function(context) {

		var wrapper = Ext.create("TCSI.entity.EntityFieldDefinitionPanel", {
			fieldTypes : this.fieldTypes
		});
		if (context.fieldData != null) {
			wrapper.setData(context.fieldData);
		}
		return wrapper;
		
	}	
});