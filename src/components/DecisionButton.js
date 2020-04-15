import './DecisionButton.scss';

export default class DecisionButton {
    $decisionButton = null;
    
    constructor({ mention, onClick }) {
        this.$decisionButton = document.createElement('button');
        this.$decisionButton.className = 'decisionButton';
        this.mention = mention;
        
        this.$decisionButton.innerText = this.mention[0];
        this.$decisionButton.addEventListener('click', onClick);
    }

    render() {
        return this.$decisionButton;
    }

    setState(status) {
        this.$decisionButton.innerText = this.mention[status];
    }
}