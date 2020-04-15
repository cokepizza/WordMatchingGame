import TextInput from '../components/TextInput';
import DecisionButton from '../components/DecisionButton';

import './Home.scss';

export default class Home {
    $home = null;
    status = 0;

    constructor() {
        this.$home = document.createDocumentFragment();

        this.$headerFrame = document.createElement('div');
        this.$headerFrame.className = 'headerFrame';
        this.$bodyFrame = document.createElement('div');
        this.$bodyFrame.className = 'bodyFrame';
        this.$footerFrame = document.createElement('div');
        this.$footerFrame.className = 'footerFrame';

        this.textInput = new TextInput({
            onSubmit: text => {
                this.setState(text);
            }
        });
        this.$textInput = this.textInput.render();

        this.decisionButton = new DecisionButton({
            mention: ['시작', '초기화'],
            onClick: () => {
                this.status = (this.status + 1) % 2;
                this.statusPropagation(this.status);
            }
        });

        this.$decisionButton = this.decisionButton.render();

        this.$bodyFrame.appendChild(this.$textInput);
        this.$bodyFrame.appendChild(this.$decisionButton);

        this.$home.appendChild(this.$headerFrame);
        this.$home.appendChild(this.$bodyFrame);
        this.$home.appendChild(this.$footerFrame);

        this.statusPropagation(status);
    }

    statusPropagation() {
        if(this.status === 0) {
            this.$textInput.classList.add('disabled');
        } else if(this.status === 1) {
            this.$textInput.classList.remove('disabled');
            this.$textInput.focus();
        }
        this.decisionButton.setState(this.status);
    }

    setState() {

    }

    render() {
        return this.$home;
    }
}