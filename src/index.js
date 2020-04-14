import Navigation from './Navigation';
import HomePage from './pages/HomePage';
import ResultPage from './pages/ResultPage';

const root = document.querySelector('#root');
alert('hahaha');

new Navigation({
    root,
    router: [
        {'/': HomePage},
        {'/result': ResultPage},
    ]
});