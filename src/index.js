import Navigation from './Navigation';
import Home from './pages/Home';
import Result from './pages/Result';

const $root = document.querySelector('#root');

new Navigation({
    $root,
    router: [
        {
            uri: '/',
            page: Home
        },
        {
            uri: '/result',
            page: Result
        },
    ]
});