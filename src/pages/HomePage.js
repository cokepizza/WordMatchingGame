import TextInput from '../components/TextInput';

export default class HomePage {
    $homePage = null;
    status = 0;

    constructor($target) {
        this.$homePage = $target;

        this.textInput = new TextInput({
            $target,
            onSubmit: text => {
                this.setState(text);
            }
        });

    }

    setState() {

    }
}