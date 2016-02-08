// Running this requires installing flightplan (https://github.com/pstadler/flightplan).
// Then use commands like:
//   fly install:production
//   fly deploy:production
//   fly upgrade:production
var plan = require('flightplan');

plan.target('production', [
  {
    host: '162.243.71.31',
    username: 'root',
    agent: process.env.SSH_AUTH_SOCK
  }
]);

var tmpDir = 'fkow-api-' + new Date().getTime();

// Install software on the server necessary to run this application.
// Then ensure that Apache is properly configured to serve the
// application.
plan.remote('install', function (remote) {
  remote.sudo('apt-get update');
  remote.sudo('apt-get -y install apache2 emacs23 git unzip');
});

plan.local('install', function (local) {
  local.echo("We couldn't copy this file earlier because there isn't a spot for it until after Apache is installed.");
  local.transfer('paperquik.conf', '/etc/apache2/sites-available/');
});

plan.remote('install', function (remote) {
  remote.sudo('a2enmod expires headers rewrite proxy_http');

  remote.sudo('a2dissite 000-default');

  remote.sudo('a2ensite paperquik mdm');

  remote.sudo('service apache2 reload');
});

// Deploy the application.
plan.local('deploy', function(local) {
  local.log('Deploy the current build of PaperQuik.com.');
  local.log('Run build');
  local.exec('grunt build');

  local.log('Copy files to remote hosts');
  local.with('cd dist', function() {
    var filesToCopy = local.exec('find .');

    // rsync files to all the target's remote hosts
    local.transfer(filesToCopy, '/tmp/' + tmpDir);
  });
});

plan.remote('deploy', function(remote) {
  remote.log('Move folder to web root');
  remote.sudo('cp -R /tmp/' + tmpDir + '/*' + ' /var/www/paperquik');
  remote.rm('-rf /tmp/' + tmpDir);
});

// Upgrade Ubuntu to the latest.
plan.remote('upgrade', function (remote) {
  remote.log('Fetches the list of available Ubuntu upgrades.');
  remote.sudo('apt-get update');

  // And then actually does them.
  remote.sudo('apt-get -y dist-upgrade');
});
