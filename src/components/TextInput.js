import './TextInput.scss';

export default class TextInput {
    $textInput = null;

    constructor({ $target, ...rest }) {
        const textInput = document.createElement('input');
        this.$textInput = textInput;
        
        $target.append(this.$textInput);
    }

    render() {
        this.$textInput.innerHtml = 'hahaha';
    }
}