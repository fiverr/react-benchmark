const sleep = require('@lets/sleep');

describe('child/measure', () => {
    const React = require('react');
    const ReactDOM = require('react-dom/server');
    const stubs = {
        createElement: () => null,
        renderToString: () => null
    };
    let measure;

    beforeAll(() => {
        delete require.cache[require.resolve('.')];
        React.createElement = (...args) => stubs.createElement(...args);
        ReactDOM.renderToString = (...args) => stubs.renderToString(...args);
        measure = require('.');
    });
    afterAll(() => {
        delete require.cache[require.resolve('react')];
        delete require.cache[require.resolve('react-dom/server')];
        delete require.cache[require.resolve('.')];
    });

    it('Should measure renderToString,createElement operations', async() => {
        const called = {};
        stubs.createElement = () => {
            called.createElement = true;
            sleep(10);
        };

        stubs.renderToString = () => {
            called.renderToString = true;
            sleep(10);
        };

        const time = measure();
        const about20ms = time >= 20 && time <= 22;
        expect(called.createElement).toBeTruthy();
        expect(called.renderToString).toBeTruthy();
        expect(about20ms).toBeTruthy();
    });
});
