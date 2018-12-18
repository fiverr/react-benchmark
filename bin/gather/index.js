const { join } = require('path');
const recursive = require('util').promisify(require('recursive-readdir'));
const exist = require('@does/exist');
const rmext = require('rmext');

/**
 * Find files with matching stubs
 * @param  {String} stubsDir
 * @param  {String} componentsDir
 * @return {String[]}
 */
module.exports = async function(stubsDir, componentsDir) {
    const files = (await recursive(stubsDir))
        .map((file) => file.replace(stubsDir, ''))
        .map((file) => rmext(file));

    const conditions = await Promise.all(
        files.map(async(file) => {
            const component = join(componentsDir, [file, 'js'].join('.'));

            return await exist(component);
        })
    );

    return files.filter((_, index) => conditions[index]);
};

