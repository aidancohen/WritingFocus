const fs = require('fs');
const ejs = require('ejs');

//let alcDeaths_info = fs.readFileSync('data/countryAlcDeaths(1).json', 'utf8');
let login_template = fs.readFileSync('login.ejs', 'utf8');
let about_template = fs.readFileSync('about.ejs', 'utf8');

let login_html = ejs.render(login_template, {
  filename: __dirname + 'index.ejs',
});

fs.writeFileSync('login.html', login_html, 'utf8');

let about_html = ejs.render(about_template, {
  filename: __dirname + 'about.ejs',
});

fs.writeFileSync('about.html', about_html, 'utf8');



//render about
//render index
//render micropages
