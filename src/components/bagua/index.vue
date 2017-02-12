<template src="./bagua.html"></template>

<style lang="less" src="./bagua.less"></style>

<script>
    import * as yin from '../yin';
    import * as yang from '../yang';
    export default {
        name: 'bagua',
        data() {
            return {
                taijiArr: [
                    {name: 'Sky', desc: '天乾'},
                    {name: 'Wind', desc: '风巽'},
                    {name: 'Water', desc: '水坎'},
                    {name: 'Hill', desc: '山艮'},
                    {name: 'Land', desc: '地坤'},
                    {name: 'Thunder', desc: '雷震'},
                    {name: 'Fire', desc: '火离'},
                    {name: 'Lake', desc: '泽兑'}
                ]
            }
        },
        components: Object.assign({}, yin, yang)
    }

    function borderW(pw) {
        return pw * Math.sqrt(2) / (2 + 2*Math.sqrt(2));
    }

    function leftWidth(pw) {
        return borderW(pw) * 2 / Math.sqrt(2);
    }
</script>