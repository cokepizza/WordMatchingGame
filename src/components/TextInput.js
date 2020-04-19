import './TextInput.scss';

export default class TextInput {
    $textInput= null;
    children= [];

    constructor({ onSubmit }) {
        this.$textInput = document.createElement('input');
        this.$textInput.className = 'textInput';
        this.onSubmit = onSubmit;
        
        const onKeyUp = e => {
            if(e.keyCode === 13) {
                onSubmit(e.target.value);
                e.target.value = '';
            }
        }

        this.$textInput.addEventListener('keyup', onKeyUp);
    }

    setState = async state => {
        //  Spread the changed state to children
        this.children.forEach(child => child.setState(state));

        //  Check if there is a handler for the changed state 
        const keys = Object.keys(state);
        for(const key of keys) {
            if(this[`${key}_handler`]) {
                await this[`${key}_handler`](state[key]);
            }
        };
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