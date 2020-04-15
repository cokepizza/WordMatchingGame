export default class Navigation {
    constructor({ $root, router }) {
        // router.forEach(route => {
        //     route
        // })
        // console.log(router);
        const HomeBlock = new router[0].page().render();
        $root.appendChild(HomeBlock);
    }
}