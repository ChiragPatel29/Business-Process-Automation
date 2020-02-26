function RegisterMenuItems(){
    return [
        {
            header: '',
            showHeader: false,
            showSeparator: false,
            items: [
        	    {action: '', icon: 'home', color: 'blue', text: 'Home'}
	        ],
	        allowedRoles: ['user', 'admin', 'superadmin']
        },
        {
            header: '',
            showHeader: false,
            showSeparator: false,
            items: [
        	    {action: 'tasks', icon: 'assignment_turned_in', color: 'green', text: 'Tasks'},
        	    {action: 'profiles', icon: 'person', color: 'green', text: 'Profile'},
                {action: 'leaves', icon: 'note_add', color: 'green', text: 'Leaves'},
                {action: 'timesheets', icon: 'timeline', color: 'green', text: 'Timesheet'},
                {action: 'bugs', icon: 'bug_report', color: 'brown', text: 'Bugs'},
                {action: 'projects', icon: 'assignment', color: 'brown', text: 'Project'},
        	    {action: 'user_stories', icon: 'list', color: 'brown', text: 'User_stories'},
        	    //{action: 'departments', icon: 'portrait', color: 'orange', text: 'Department'},
                {action: 'milestones', icon: 'flag', color: 'black', text: 'Milestones'},
                //{action: 'designations', icon: 'assignment', color: 'blue', text: 'Designation'},
                {action: 'reports', icon: 'pie_chart', color: 'purple', text: 'Reports',
        	    	items: [
        	    			{action: 'reports/1', icon: 'pie_chart', color: 'red', text: 'Sample Report #1'},
        	    			{action: 'reports/2', icon: 'pie_chart', color: 'green', text: 'Sample Report #2'},
        	    		]
        	    },
        	    {action: 'alerts', icon: 'alarm', color: 'red', text: 'Alerts'}
	        ],
	        allowedRoles: ['user', 'admin']
        },
        {
            header: 'Administration',
            showHeader: true,
            showSeparator: true,
            items: [
        	    {action: 'settings', icon: 'settings', color: '', text: 'Settings'},
        	    {action: 'categories', icon: 'list', color: 'orange', text: 'Categories'},
        	    {action: 'users', icon: 'person', color: 'blue', text: 'Users'},
                {action: 'groups', icon: 'group', color: 'green', text: 'Groups'}
                
	        ],
	        allowedRoles: ['admin']
        },
        {
            header: 'Customer Management',
            showHeader: false,
            showSeparator: false,
            items: [
        	    {action: 'organizations', icon: 'people_outline', color: '', text: 'Organizations'}
	        ],
	        allowedRoles: ['superadmin']
        }
    ];
}
