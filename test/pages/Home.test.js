import Home from '../../src/pages/Home';
import Navigation from '../../src/Navigation';

let home;
let navigation;

beforeAll(() => {
    const $root = document.querySelector('body');
    const defaultUrl = '/';
    navigation = new Navigation({ $root, defaultUrl });
    home = new Home({navigation});
    
    expect(home.status).toBe(0);
})

test('This is a sample', () => {
    expect(true).toBe(true);
});