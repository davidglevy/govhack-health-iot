Ext.require([ 'Ext.form.field.Text', 'Ext.panel.Panel', "Ext.form.field.ComboBox", "Ext.form.field.Checkbox",
		'Ext.form.field.Display' ]);

Ext.define('TCSI.entity.EntityFieldDefinitionPanel', {
	extend : 'Ext.panel.Panel',
	width : 750,
	initComponent : function() {
		this.callParent();

		var me = this;
		
		var firstRow = Ext.create("Ext.panel.Panel", {
			width : 700,
			layout: 'hbox',
			bodyPadding : 5
		    //title: 'Field ' + context.fieldId
		});
		me.add(firstRow);

		var secondRow = Ext.create("Ext.panel.Panel", {
			width : 700,
			layout: 'hbox',
			bodyPadding : 5
		    //title: 'Field ' + context.fieldId
		});
		me.add(secondRow);		
		
		var fieldName = Ext.create("Ext.form.field.Text", {
			fieldLabel : 'Name',
			
		});
		firstRow.add(fieldName);
		me.nameField = fieldName;
		
		var fieldType = Ext.create("Ext.form.field.ComboBox", {
			padding : '5 5 5 5',
			fieldLabel: 'Choose Type',
		    store: this.fieldTypes,
		    queryMode: 'local',
		    displayField: 'display',
		    valueField: 'type',
		});
		firstRow.add(fieldType);
		me.typeField = fieldType;
		
		
		var mandatory = Ext.create("Ext.form.field.Checkbox", {
			fieldLabel : "Mandatory",
		});
		firstRow.add(mandatory);
		me.mandatoryField = mandatory;
		
		var fieldCode = Ext.create("Ext.form.field.Text", {
			fieldLabel : 'Code',
			
		});
		secondRow.add(fieldCode);
		me.codeField = fieldCode;
		
	},
	setData : function(fieldData) {
		this.nameField.setValue(fieldData.name);
		this.codeField.setValue(fieldData.code);
		if (fieldData.allowBlank) {
			this.mandatoryField.setValue(false);			
		} else {
			this.mandatoryField.setValue(true);
		}
		this.typeField.setValue(fieldData.type);
		
	},
	createData : function() {
		var result = {};
		result.name = this.nameField.getValue();
		result.code = this.codeField.getValue();
		result.allowBlank = !this.mandatoryField.checked;
		result.type = this.typeField.getValue();
		
		return result;
		
//		private String longName;
//		private String type;
//		private String fieldCode;
//		private String description;
//		private Boolean allowBlank = Boolean.TRUE;
//		private Integer length;
//		private Integer minLength;
//		private Integer maxLength;
//		private String after;
//		private String afterExclusive;
//		private String before;
//		private String beforeInclusive;
//		private List<String> allowableValues;
//		private String reference;
//		private Integer startPosition;
//		private Integer endPosition;
//		private Integer columnPosition;
	}
}); // Boop.