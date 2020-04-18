import Home from './pages/Home';
import Result from './pages/Result';

const routerInform = {
    '/' : Home,
    '/result' : Result,
}

export default class Navigation {
    constructor({ $root, defaultUrl }) {
        window.addEventListener('popstate', e => {
            // console.log('[popstate]', e.state);
            // alert('back buttn');
        });

        // console.dir($root);
        this.$root = $root;

        this.navigate(defaultUrl);
        // this.navigate('/result');
    }

    navigate(url, props) {
        this.$root.innerHTML = '';
        history.pushState({path : url}, null, url);
        // console.log(history);
        // console.log('pushState')
        if(routerInform[url]) {
            this.$root.appendChild(
                new routerInform[url]({
                    navigation: this,
                    ...props,
                }).render()
            );
        } else {
            // $root.innerHTML = 404 Page
        }
    }

    goBack() {
        history.back();
    }

}