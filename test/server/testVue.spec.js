import should from 'should';

describe('vue', () => {
    describe('vue observe', () => {
        it('return newVal', () => {
            let data = {name: 'tianshi'};
            observe(data);
            data.name = 'kash';
            return data.name.should.equal('kash');
        })
    });
})

function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    Object.keys(data).forEach(key => {
        defineReactive(data, key, data[key]);
    });
}

function defineReactive(data, key, val) {
    observe(val);
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get: function() {
            return val;
        },
        set: function(newVal) {
            console.log(`${key} change: ${val} ==> ${newVal}`);
            val = newVal;
        }
    })
}

