import StatePropagation from '../components/StatePropagtion';
import './DecisionButton.scss';
import spinner from '../assets/spinner.svg';

export default class DecisionButton extends StatePropagation{
    $self = null;
    children = [];
    
    constructor(props) {
        super(props);
        const { mention, onClick } = props;
        this.$self = document.createElement('button');
        this.$self.className = 'decisionButton';
        
        this.mention = mention;
        this.onClick = onClick;

        this.$image = document.createElement('img');
        this.$image.className = 'image';
        this.$image.src = spinner;
        
        this.$text = document.createElement('p');
        this.$text.className = 'text';

        this.$self.appendChild(this.$image);
        this.$self.appendChild(this.$text);

        this.$self.addEventListener('click', onClick);
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