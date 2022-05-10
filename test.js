const toto = require('./dist/index.js');

toto.title('Hello !', 'font-bold gradient-vice');
toto.link('Click me !', 'https://google.com', 'font-cyan ml-10');
toto.table([
  { route: '/', name: 'index' },
  { route: '/home', name: 'home' },
  { route: '/profile', name: 'profile' },
  { route: '/login', name: 'login' },

], 'gradient-rainbow');
