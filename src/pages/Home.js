import TextInput from '../components/TextInput';
import DecisionButton from '../components/DecisionButton';

import './Home.scss';

const dataURL = 'https://my-json-server.typicode.com/kakaopay-fe/resources/words';
const defaultTime = 10;
const statusModular = 3;

export default class Home {
    $home = null;
    status = 0;
    timeLimit = defaultTime;

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
            mention: ['시작', 'loading', '초기화'],
            onClick: () => {
                this.status = (this.status + 1) % statusModular;
                this.statusPropagation();
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

    async statusPropagation () {
        if(this.status === 1) {
            try {
                const response = await fetch(dataURL);
                const data = response.json();
                console.log(data);
                this.data = data;

                // sugar
                setTimeout(() => {
                    this.status = (this.status + 1) % statusModular;
                    this.statusPropagation(this.status);    
                }, 1000);
            } catch(e) {
                console.log(e);
            }
        }
        
        this.textInput.setState(this.status);
        this.decisionButton.setState(this.status);
    }

    setState() {

    }

    render() {
        return this.$home;
    }
}