const average = require('.');
const times = 7;
const called = {};

describe('bin/bench/average', async() => {
    beforeEach(() => {
        Object.keys(called).forEach((key) => { delete called[key]; });
    });
    it('Should call on measure and clean functions n times', async() => {
        await average({
            times,
            measure: async function() {
                called.measure = called.measure || 0;
                called.measure++;
                return 2;
            }
        });

        expect(called.measure).toEqual(times);
    });
});
