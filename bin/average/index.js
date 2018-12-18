/**
 * Measure an operation n times and return the divided average
 * @param  {Function} options.measure
 * @param  {Number}   [options.times=50]
 * @return {Number}
 */
module.exports = async function average({measure, clean = () => null, times = 50}) {
    const sums = [];
    const promises = new Array(times).fill(measure);
    while (promises.length) {
        sums.push(await promises.pop()());
        await clean();
    }
    return sums.map(Number).reduce((a, b) => a + b) / times;
};
