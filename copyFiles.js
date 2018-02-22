const fs = require('fs');
const fsExtra = require('fs-extra');

fsExtra.mkdirsSync('dist/assets/layouts/thumbnails', function(err){
	if (err) {
		console.log("cannot make directory dist/assets/layouts/thumbnails: " + err);
	} else {
		console.log("successfully made dist/assets/layouts/thumbnails");
	}
});

// fsExtra.mkdirsSync('dist/assets/oob-spa/locales', function(err){
// 	if (err) {
// 		console.log("cannot make directory dist/assets/oob-spa/locales: " + err);
// 	} else {
// 		console.log("successfully made dist/assets/oob-spa/locales");
// 	}
// });

var copyFiles = [
	// {src: 'src/build.js', dest: 'dist/assets/build.js'},
	// {src: 'src/locales', dest: 'dist/assets/oob-spa/locales'},
	// {src: 'src/favicon.ico', dest: 'dist/assets/favicon.ico'},
	{src: 'dist/assets/main.bundle.js', dest: 'dist/assets/main_original.bundle.js'},
	{src: 'src/wchLayouts/layout-mappings', dest: 'dist/layout-mappings'},
	{src: 'src/wchLayouts/layouts', dest: 'dist/layouts'},
	{src: 'src/wchLayouts/assets/layouts/thumbnails', dest: 'dist/assets/layouts/thumbnails'},
	{src: 'src/wchLayouts/types', dest: 'dist/types'}



];
copyFiles.forEach(function (file) {
  fsExtra.copy(file.src, file.dest, function (err) {
	if (err) {
	  console.error(' cannot copy "' + file.src + '": ' + err);
	} else {
	  console.log(' successfully copied "' + file.src + '" to "' + file.dest + '"');
	}
  });
});