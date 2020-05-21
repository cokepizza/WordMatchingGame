import './index.scss';
import Navigation from './Navigation';
import CreateStore from './components/CreateStore';

const $root = document.querySelector('body');
const defaultUrl = '/';
const store = new CreateStore();

new Navigation({ $root, defaultUrl });