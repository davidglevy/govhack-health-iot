Ext.require([ 'Ext.form.field.Date', 'Ext.form.field.Text', 'Ext.button.Button', 'Ext.form.Panel', 'Ext.form.field.File' ]);

Ext.define('TCSI.SearchPanel', {
	extend : 'Ext.panel.Panel',
	title : 'Search',
	width : 500,
	bodyPadding : 10,
	initComponent : function() {
		this.callParent();

		var me = this;

		var formPanel = Ext.create("Ext.form.Panel", {
			
		});
		me.add(formPanel);

		var investigationField = Ext.create("Ext.form.field.Text", {
			fieldLabel : 'Investigation',
			name : 'investigation',
			value : 'Case of the WereRabbit'
		});
		formPanel.add(investigationField);

		var whoField = Ext.create("Ext.form.field.Text", {
			fieldLabel : 'Who',
			name : 'who',
			value : 'shaggy01'
		});
		formPanel.add(whoField);
		
		var fromField = Ext.create("Ext.form.field.Date", {
			fieldLabel : 'From',
			name : 'from',
			value : new Date()
		});
		formPanel.add(fromField);
		
		var toField = Ext.create("Ext.form.field.Date", {
			fieldLabel : 'To',
			name : 'to',
			value : new Date()
		});
		formPanel.add(toField);
		
		var button = Ext.create("Ext.button.Button", {
			text : 'Search',
			handler : function() {
				var form = this.up('form').getForm();
				if (form.isValid()) {
					form.submit({
						url : endPointHost + '/image-ui/search.do',
						waitMsg : 'Uploading your photo...',
						success : function(fp, o) {
							Ext.Msg.alert('Success', 'Your photo "'
									+ o.result.file + '" has been uploaded.');
						}
					});
				}
			}
		});
		formPanel.add(button);
	}
});