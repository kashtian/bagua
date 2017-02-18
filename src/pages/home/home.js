import * as all from '../../components';

export default {
    name: 'Home',
    
    route: {
        path: '/',
        title: '首页'
    }, 

    mounted() {
        let script = document.createElement('script');
        script.src = '/js/lizi.js';
        document.body.appendChild(script);
    },

    components: all
}