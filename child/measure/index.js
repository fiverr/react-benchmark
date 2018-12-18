const requireCWD = require('../require-cwd');

const { createElement } = requireCWD('react');
const { renderToString } = requireCWD('react-dom/server');

/**
 * Measure React create component and render it to string in milliseconds
 * @param  {ReactComponent} component
 * @param  {Object}         data
 * @param  {Number}         [start]   timestamp
 * @return {Number}
 */
module.exports = function measure(component, data = {}, start = Date.now()) {
    renderToString(createElement(component, data));
    return Date.now() - start;
};
