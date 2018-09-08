Ext.require([ 'Ext.form.field.Text', 'Ext.button.Button', 'Ext.form.Panel', 'Ext.form.field.File' ]);

Ext.define('TCSI.FileUploadPanel', {
	extend : 'Ext.panel.Panel',
	title : 'Ingest',
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
		
		
		var fileField = Ext.create("Ext.form.field.File", {
			fieldLabel : 'File',
			name : 'file',
			text : 'File'
			
		});
		formPanel.add(fileField);
		
		var button = Ext.create("Ext.button.Button", {
			text : 'Upload',
			handler : function() {
				var form = this.up('form').getForm();
				if (form.isValid()) {
					form.submit({
						url : endPointHost + '/image-ui/upload.do',
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