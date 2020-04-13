const rootDiv = document.querySelector('root');

window.onpopstate = () => {
    rootDiv.innerHTML = window.location.pathname;
    // rootDiv.innerHTML = routes[window.location.pathname];
}