import './DecisionButton.scss';
import spinner from '../assets/spinner.svg';

export default class DecisionButton {
    $decisionButton = null;
    children = [];
    
    constructor({ mention, onClick }) {
        this.$decisionButton = document.createElement('button');
        this.$decisionButton.className = 'decisionButton';
        
        this.mention = mention;

        this.$image = document.createElement('img');
        this.$image.className = 'image';
        this.$image.src = spinner;
        
        this.$text = document.createElement('p');
        this.$text.className = 'text';

        this.$decisionButton.appendChild(this.$image);
        this.$decisionButton.appendChild(this.$text);

        this.$decisionButton.addEventListener('click', onClick);
    }

    render() {
        return this.$decisionButton;
    }

    setState = state => {
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
        if(status === 1) {
            this.$text.innerHTML = '';
            this.$image.classList.add('visible');
            this.$text.classList.remove('visible');
        } else {
            this.$text.innerHTML = this.mention[status];
            this.$text.classList.add('visible');
            this.$image.classList.remove('visible');
        }
    }
}