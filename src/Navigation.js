import Home from './pages/Home';
import Result from './pages/Result';

const routerInform = {
    '/' : Home,
    '/result' : Result,
}

export default class Navigation {
    constructor({ $root, defaultUrl }) {
        window.addEventListener('popstate', e => {
            console.log('[popstate]', e.state);
        });

        console.dir($root);
        this.$root = $root;

        this.navigate(defaultUrl);
    }

    navigate(url) {
        this.$root.innerHTML = '';
        history.pushState({path : url}, null, url);
        console.log(history);
        console.log('pushState')
        if(routerInform[url]) {
            this.$root.appendChild(new routerInform[url]({ navigation: this }).render());
        } else {
            // $root.innerHTML = 404 Page
        }
    }

}