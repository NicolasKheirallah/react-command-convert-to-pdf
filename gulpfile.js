'use strict';

const gulp = require('gulp');
const path = require('path');
const build = require('@microsoft/sp-build-web');

const bundleAnalyzer = require('webpack-bundle-analyzer');
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);
build.addSuppression(
    `Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`
  );
  build.addSuppression(/error semicolon: Unnecessary semicolon$/);
  build.addSuppression(/error semicolon: Missing semicolon$/);
  build.addSuppression(/filename should end with module.sass or module.scss$/);
  build.addSuppression(/Warning/gi);
  
build.configureWebpack.mergeConfig({
    additionalConfiguration: (generatedConfiguration) => {
        const lastDirName = path.basename(__dirname);
        const dropPath = path.join(__dirname, 'temp', 'stats');
        generatedConfiguration.plugins.push(new bundleAnalyzer.BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: 'static',
            reportFilename: path.join(dropPath, `${lastDirName}.stats.html`),
            generateStatsFile: false,
            logLevel: 'error'
        }));

        return generatedConfiguration;
    }
});


build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};


require("./spfx-versioning")(build);
build.tslintCmd.enabled = false;
build.initialize(require("gulp"));