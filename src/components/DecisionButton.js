import './DecisionButton.scss';

export default class DecisionButton {
    $decisionButton = null;
    
    constructor({ mention, onClick }) {
        this.$decisionButton = document.createElement('button');
        this.$decisionButton.className = 'decisionButton';
        this.mention = mention;
        
        this.$decisionButton.addEventListener('click', onClick);
    }

    render() {
        return this.$decisionButton;
    }

    setState(status) {
        if(this.mention[status] === 'loading') {
            this.$decisionButton.innerHTML = 'aaa';
        } else {
            this.$decisionButton.innerHTML = this.mention[status];
        }
        
    }
}