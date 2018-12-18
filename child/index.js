#!/usr/bin/env node

process.on('unhandledRejection', (error) => {
    console.error(error);
    process.exit(1);
});

const {argv} = require('yargs');

const measure = require('./measure');

if (argv.globals) {
    require(argv.globals);
}

/**
 * node child/index.js --component /workspace/project/dist/module.js --stub /workspace/project/stubs/module.json --globals /workspace/project/stubs/globals.js
 * @param  {String} args.component A compiled React component
 * @param  {String} args.stub      Stub data (props)
 * @param  {String} args.globals   A module to require usually includes runtime polyfills like global.window = window
 * @return {Number} console.log to STDOUT
 */
(async() => {
    const component = require(argv.component).default;
    const data = require(argv.stub);

    console.log(measure(component, data));
})();
