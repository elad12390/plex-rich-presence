var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
    name:'Plex Rich Presence',
    description: 'Discord rich presence for plex v0.01',
    script: `${__dirname}/../build/index.js`
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
    svc.start();
});

svc.install();
