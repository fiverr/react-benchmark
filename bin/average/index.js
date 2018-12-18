/**
 * Measure an operation n times and return the divided average
 * @param  {Function} options.measure
 * @param  {Number}   [options.times=50]
 * @return {Number}
 */
module.exports = async function average({measure, times = 50}) {
    const sums = await Promise.all(new Array(times).fill(measure).map((m) => m()));
    return sums.map(Number).reduce((a, b) => a + b) / times;
};
