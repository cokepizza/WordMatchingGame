import './TextInput.scss';

export default class TextInput {
    $textInput= null;
    children= [];

    constructor({ onSubmit }) {
        this.$textInput = document.createElement('input');
        this.$textInput.className = 'textInput';

        const onKeyUp = e => {
            if(e.keyCode === 13) {
                onSubmit(e.target.value);
                e.target.value = '';
            }
        }

        this.$textInput.addEventListener('keyup', onKeyUp);
    }

    setState(state) {
        //  Check if there is a handler for the changed state 
        Object.keys(state).forEach(key => {
            if(this[`${key}_handler`]) {
                this[`${key}_handler`](state[key]);
            }
        });

        //  Spread the changed state to children
        this.children.forEach(child => child.setState(state));
    }

    status_handler(status) {
        if(status === 0) {
            this.$textInput.classList.add('disabled');
            this.$textInput.value = '';
        } else if(status === 2) {
            this.$textInput.classList.remove('disabled');
            this.$textInput.focus();
        }
    }

    render() {
        return this.$textInput;
    }
}