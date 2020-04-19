import './DecisionButton.scss';
import spinner from '../assets/spinner.svg';

export default class DecisionButton {
    $decisionButton = null;
    children = [];
    
    constructor({ mention, onClick }) {
        this.$decisionButton = document.createElement('button');
        this.$decisionButton.className = 'decisionButton';
        
        this.mention = mention;
        this.onClick = onClick;

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
        this.status = status;
        if(status === 1) {
            this.nextText = '';
            this.$text.innerHTML = this.nextText;
            this.$image.classList.add('visible');
            this.$text.classList.remove('visible');
        } else {
            this.nextText = this.mention[status];
            this.$text.innerHTML = this.nextText;
            this.$text.classList.add('visible');
            this.$image.classList.remove('visible');
        }
    }
}