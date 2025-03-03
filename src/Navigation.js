import Home from './pages/Home';
import Result from './pages/Result';

const routerInform = {
    '/' : Home,
    '/result' : Result,
}

export default class Navigation {
    constructor({ $root, defaultUrl }) {
        window.addEventListener('popstate', e => {
            if(e.state) {
                this.route(e.state.path);
            } else {
                this.route('/');
            }
        });

        this.$root = $root;
        this.route(defaultUrl);
    }
    
    navigate(url, props) {
        history.pushState({path : url}, null, url);
        this.route(url, props);
    }

    route(url, props) {
        this.$root.innerHTML = '';
        if(routerInform[url]) {
            this.$root.appendChild(
                new routerInform[url]({
                    navigation: this,
                    ...props,
                }).render()
            );
        } else {
            // 404 Page
        }
    }

    goBack() {
        history.go(-1);
    }

}