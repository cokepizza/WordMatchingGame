import './index.scss';
import Navigation from './Navigation';
import CreateStore from './components/CreateStore';

const $root = document.querySelector('body');
const defaultUrl = '/';
// const store = new CreateStore();

//  서버상에서 index.html을 보낸 후에 client쪽에서 pathname을 체크해서
//  적절한 위치로 라우팅해주는 방식이 필요할 듯
// console.log(window.location.pathname);

new Navigation({ $root, defaultUrl });