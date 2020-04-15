import './TextInput.scss';

export default class TextInput {
    $textInput = null;

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

    setState(status) {
        if(status === 0) {
            this.$textInput.classList.add('disabled');
        } else if(status === 2) {
            this.$textInput.classList.remove('disabled');
            this.$textInput.focus();
        }
    }

    render() {
        return this.$textInput;
    }
}