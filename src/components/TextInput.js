import StatePropagation from '../components/StatePropagtion';
import './TextInput.scss';

export default class TextInput extends StatePropagation {
    $self= null;
    children= [];

    constructor(props) {
        super(props);
        const { onSubmit } = props;
        this.$self = document.createElement('input');
        this.$self.className = 'textInput';
        this.$self.setAttribute('spellcheck','false')
        this.onSubmit = onSubmit;
        
        const onKeyUp = e => {
            if(e.keyCode === 13) {
                onSubmit(e.target.value);
                e.target.value = '';
            }
        }

        this.$self.addEventListener('keyup', onKeyUp);
    }

    status_handler(status) {
        this.status = status;
        if(status === 0) {
            this.$self.classList.add('disabled');
            this.$self.value = '';
        } else if(status === 2) {
            this.$self.classList.remove('disabled');
            this.$self.focus();
        }
    }
}