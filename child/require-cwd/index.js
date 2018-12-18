const {join} = require('path');

/**
 * Require from consumer's node_modules directory
 * @param  {String} name Module name
 * @return {Any}
 */
module.exports = (name) => require(
    require.resolve(
        name,
        {
            paths: [join(process.cwd(), 'node_modules')]
        }
    )
);
