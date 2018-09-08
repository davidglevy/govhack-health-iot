Ext.require([ 'Ext.form.field.Text', 'Ext.button.Button', 'Ext.form.Panel', 'Ext.form.field.File' ]);

Ext.define('TCSI.ProviderCreator', {
	extend : 'Ext.panel.Panel',
	title : 'Create Provider',
	width : 600,
	bodyPadding : 10,
	initComponent : function() {
		this.callParent();

		var me = this;

		var formPanel = Ext.create("Ext.form.Panel", {
			
		});
		me.add(formPanel);

		var idField = Ext.create("Ext.form.field.Text", {
			fieldLabel : 'ID',
			name : 'id',
			value : ''
		});
		formPanel.add(idField);
		
		var nameField = Ext.create("Ext.form.field.Text", {
			fieldLabel : 'Name',
			name : 'name',
			value : ''
		});
		formPanel.add(nameField);

		var abnField = Ext.create("Ext.form.field.Text", {
			fieldLabel : 'ABN',
			name : 'abn',
			value : ''
		});
		formPanel.add(abnField);
		
		

		
		var button = Ext.create("Ext.button.Button", {
			text : 'Create',
			handler : function() {
				Ext.Ajax.request({
					   url: basePath + '/provider',    // where you wanna post
					   success: function(fp, o) {
						   var responseText = fp.responseText;
						   me.handleAjaxSuccess(me, responseText);
						   //var responseData = JSON.parse(responseText);
							// TODO Show transaction reference.
							//Ext.Msg.alert('Success', 'Provider created with transaction ref [' + responseData.ref + ']');
						},   // function called on success
					   failure: function(fp, o) {
							// TODO Show cause
							Ext.Msg.alert('Error', 'Unable to create provider');
						},
					   params: { id: idField.getValue(), name: nameField.getValue(), abn : abnField.getValue() }  // your json data
					});
				
			}
		});
		formPanel.add(button);
	},
	handleAjaxSuccess : function(self, responseText) {
		console.log("Successful response: " + responseText);
		self.providerPanel.handleCreate();
	}
});