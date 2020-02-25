/*global app*/
class Settings{
	static get(){
		return {
		"baseUrl": "../../../../../api",
		"productName": "Business Process Automation",
		"supportEmail": "support@prestigeframework.com",
		"enableSaaS": true,
		"openRegistration": true,
		"legacyMode": false,
		"theme": {
			background: "orange",
			color: "white",
			alternate: "dodgerblue",
			contrast: "black"            
		},
		"menu": "expand", //expand or overlap,
		"autoMasters": false,
		"showMastersMenu": true,
		"defaultPermissions": {
				view: ['user', 'admin'],
				add: ['admin'],
				edit: ['admin'],
				remove: ['admin'],
				extract: ['admin']				
		}
		}
	}
}
app.service('S', function() {
	return Settings.get();
});
