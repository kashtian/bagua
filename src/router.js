import Vue from 'vue';
import Router from 'vue-router';
import pages from './pages';

Vue.use(Router);

export default new Router({
    mode: 'history',
    ...traverseRoute(pages)
});

function traverseRoute(pages) {
    let routes = [];
    for (let key in pages) {
        routes.push({
            path: pages[key].route.path,
            component: pages[key]
        });
    }
    return {
        routes: routes
    }
}