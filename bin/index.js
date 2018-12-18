#!/usr/bin/env node

process.on('unhandledRejection', (error) => {
    console.error(error);
    process.exit(1);
});

const {argv} = require('yargs');
const {join} = require('path');
const reduce = require('await-reduce');
const gather = require('./gather');
const bench = require('./bench');

/**
 * Benchmark React components with stubs
 * @param  {String} options.components Folder containing React components (compiled)
 * @param  {String} options.stubs      Folder containing stubs
 * @param  {String} options.globals    A module to require usually includes runtime polyfills like global.window = window
 * logs AVG timings
 */
(async() => {
    const {
        components = 'dist',
        stubs = 'stubs',
        times = 25
    } = argv;

    const base = process.cwd();
    const stubsDir = join(base, stubs);
    const componentsDir = join(base, components);
    const globals = argv.globals ? join(base, argv.globals) : undefined;

    const files = await gather(stubsDir, componentsDir, (file) => file.startsWith(__dirname));

    const results = await reduce(
        files,
        async(accumulator, file) => Object.assign(
            accumulator,
            {[file]: await bench({
                componentsDir,
                stubsDir,
                file,
                globals,
                times: Number(times)
            })}
        ),
        {}
    );

    console.log('-------');
    console.log(Object.entries(results).map(([name, ms]) => `${name}: ${ms}ms (avg of ${times} runs)`).join('\n'));
    console.log('-------');
})();
