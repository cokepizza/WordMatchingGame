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

    render() {
        return this.$textInput;
    }
}