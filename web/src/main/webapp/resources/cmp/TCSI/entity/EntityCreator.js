Ext.require([ 'Ext.Date', 'Ext.form.field.Text', 'Ext.button.Button', 'Ext.form.Panel',
		'Ext.form.field.File', 'Ext.data.Store', 'Ext.grid.Panel', 'Ext.form.field.Display', 'TCSI.entity.EntityFieldPanelFactory']);

Ext.define('TCSI.entity.EntityCreator', {
	extend : 'Ext.panel.Panel',
	title : 'Create Entity',
	width : 600,
	bodyPadding : 10,
	initComponent : function() {
		this.callParent();

		var me = this;

		var formPanel = Ext.create("Ext.form.Panel", {

		});
		me.add(formPanel);

		// var idField = Ext.create("Ext.form.field.Text", {
		// fieldLabel : 'ID',
		// name : 'id',
		// value : ''
		// });
		// formPanel.add(idField);

		var nameField = Ext.create("Ext.form.field.Text", {
			fieldLabel : 'Name',
			name : 'name',
			value : ''
		});
		formPanel.add(nameField);
		me.nameField = nameField;

		var longNameField = Ext.create("Ext.form.field.Text", {
			fieldLabel : 'Long Name',
			name : 'longName',
			value : ''
		});
		formPanel.add(longNameField);
		me.longNameField = longNameField;		
		
		var validFromField = Ext.create("Ext.form.field.Date", {
			fieldLabel : 'Valid From',
			name : 'validFrom',
			value : ''
		});
		formPanel.add(validFromField);
		me.validFromField = validFromField;
		
		var validToField = Ext.create("Ext.form.field.Date", {
			fieldLabel : 'Valid To',
			name : 'validTo',
			value : ''
		});
		formPanel.add(validToField);
		me.validToField = validToField;
				
		var fieldPanel = Ext.create("Ext.panel.Panel", {
			title : 'Fields'
		});
		formPanel.add(fieldPanel);
		me.fieldPanel = fieldPanel;

		// TODO Hide Title bar explicitly
		var buttonPanel = Ext.create('Ext.panel.Panel', {
			layout : "hbox"
		});
		formPanel.add(buttonPanel);

		
		var button = Ext.create("Ext.button.Button", {
			text : 'Create',
			margin : 5,
			handler : function() {
				// TODO Extract serialized version from field panels
				
				// TODO Get date without time without substring
				var startDate = validFromField.getValue();
				var startDateText = "";
				
				if (startDate != null) {
					startDateText = Ext.Date.format(startDate, 'Y-m-d');
				}
				var endDateText = ""; 
				var endDate = validToField.getValue();
				
				if (endDate != null) {
					endDateText = Ext.Date.format(endDate, 'Y-m-d');
				}
				
				var fieldDatas = [];
				var arrayLength = me.fieldEditors.length;
				for (var i = 0; i < arrayLength; i++) {
				    var fieldData = me.fieldEditors[i].createData();
				    fieldDatas.push(fieldData);
				}
				
				Ext.Ajax.request({
					url : basePath + '/entity', // where you wanna post
					success : function(fp, o) {
						var responseText = fp.responseText;
						me.handleAjaxSuccess(me, responseText);
						// var responseData = JSON.parse(responseText);
						// TODO Show transaction reference.
						// Ext.Msg.alert('Success', 'Entity created with
						// transaction ref [' + responseData.ref + ']');
					}, // function called on success
					failure : function(fp, o) {
						// TODO Show cause
						Ext.Msg.alert('Error', 'Unable to create entity');
					},
					//params
					jsonData : {
						name : nameField.getValue(),
						longName : longNameField.getValue(),
						startDate : startDateText,
						endDate : endDateText,
						fields : fieldDatas
					}
				// your json data
				});

			}
		});
		buttonPanel.add(button);

		var addFieldButton = Ext.create("Ext.button.Button", {
			text : 'Add Field',
			margin : 5,
			creatorPanel : me,
			
			handler : function() {
				me.handleAddField();
			}
		});
		buttonPanel.add(addFieldButton);

		
	},
	reset : function() {
		this.fieldCount = null;
		this.fieldEditors = [];
		this.fieldPanel.removeAll();
		this.nameField.setValue("");
		this.longNameField.setValue("");
		this.validFromField.setValue(new Date());
		this.validToField.setValue(null);
		
	},
	handleAjaxSuccess : function(self, responseText) {
		console.log("Successful response: " + responseText);
		self.entityPanel.handleCreate();
	},
	handleAddField : function() {
		if (this.fieldCount == null) {
			this.fieldCount = 1;
			this.fieldEditors = [];
		} else {
			this.fieldCount++;
		}
		
		console.log("add field clickled - todo implement code");
		// TODO Inject this once.
		var fieldCreator = Ext.create("TCSI.entity.EntityFieldPanelFactory");
		
		var fieldEditor = fieldCreator.buildField({fieldId: this.fieldCount});
		this.fieldEditors.push(fieldEditor);
		
		this.fieldPanel.add(fieldEditor);
		
	}
//	initializeFieldPanel : function() {
//		//this.fieldPanel.removeAll();
//
//		var fieldCreator = Ext.create("TCSI.entity.EntityFieldPanelFactory");
//		
//		for (var i = 1; i < 10; i++) {
//			var display = fieldCreator.buildField({fieldId: i});
//			this.fieldPanel.add(display);
//			console.log("i = " + i);
//		}
//		this.fieldPanel.updateLayout();
//	}
});