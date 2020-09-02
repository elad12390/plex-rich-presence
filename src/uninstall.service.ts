var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
    name:'Plex Rich Presence',
    description: 'Discord rich presence for plex v0.01',
    script: `${__dirname}/../build/index.js`
});

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall',function(){
    console.log('Uninstall complete.');
    console.log('The service exists: ',svc.exists);
});

// Uninstall the service.
svc.uninstall();
