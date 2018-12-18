const { join } = require('path');
const sleep = require('@lets/sleep');
const execute = require('async-execute');
const average = require('../average');

module.exports = async function bench({
    componentsDir,
    stubsDir,
    globals,
    file,
    times
}) {
    const [component, stub] = [
        join(componentsDir, [file, 'js'].join('.')),
        join(stubsDir, [file, 'json'].join('.'))
    ];

    const args = [
        '--component',
        component,
        '--stub',
        stub
    ];

    globals && args.push('--globals', globals);

    return await average({
        clean: function() {

            // Clear garbage collector before starting
            global.gc && global.gc();

            // Clean modules from cache
            [component, stub].forEach((module) => {
                delete require.cache[require.resolve(module)];
            });

            // sleep between tests
            sleep(25);
        },
        measure: async function() {
            const result = await execute([
                join(__dirname, '../../', 'child/index.js'),
                ...args
            ].join(' '));

            return result;
        },
        times
    });
};
