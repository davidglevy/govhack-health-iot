Ext.define('TCSI.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    requires: ['TCSI.entity.EntityPanel', 'TCSI.ProviderPanel'],
    
    onLoginClick: function() {

    	
    var me = this;
        // This would be the ideal location to verify the user's credentials via
        // a server-side lookup. We'll just move forward for the sake of this example.

        // Set the localStorage value to true
        localStorage.setItem("TutorialLoggedIn", true);

        // Remove Login Window
        this.getView().destroy();

        // Add the main view to the viewport
        //Ext.create({
        //    xtype: 'app-main'
        //});

    	var tabPanel = Ext.create('Ext.tab.Panel', {
	    width: 800,
	    renderTo: "application",
	    items: [],
	    listeners: {
	    		tabchange: function(tabPanel, newTab, oldTab, index){
                me.doTabChange(newTab.title);
            }
        }
	});

	var providerPanel = Ext.create("TCSI.ProviderPanel", {
		width : 800,
	    title: 'Provider'
	});
	tabPanel.add(providerPanel);

	var entityPanel = Ext.create("TCSI.entity.EntityPanel", {
		width : 800,
	    title: 'Entity'
	});
	tabPanel.add(entityPanel);
	
	var hospitalPanel = Ext.create("HIW.HospitalPanel", {
		width : 800,
		title : 'Hospital'
	});
	tabPanel.add(hospitalPanel);
	
	this.hospitalPanel = hospitalPanel;
	
    },
    /**
     * Updates this container with the new active item.
     * @param {Object} tabBar 
     * @param {Object} newTab 
     * @return {Boolean}
     */
    doTabChange: function (title) {
    		if (title == 'Hospital') {
    			this.hospitalPanel.doTabChange();
    		}
    },
});