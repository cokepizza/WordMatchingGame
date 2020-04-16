import Timer from '../components/Timer';
import ScoreBox from '../components/ScoreBox';
import BillBoard from '../components/BillBoard';
import TextInput from '../components/TextInput';
import DecisionButton from '../components/DecisionButton';

import './Home.scss';

const dataURL = 'https://my-json-server.typicode.com/kakaopay-fe/resources/words';
const statusModular = 3;

export default class Home {
    $home = null;
    status = 0;
    timeLimit = null;
    data = [];
    index = 0;
    score = null;
    children = [];

    constructor() {
        this.$home = document.createDocumentFragment();

        this.$headerFrame = document.createElement('div');
        this.$headerFrame.className = 'headerFrame';
        this.$bodyFrame = document.createElement('div');
        this.$bodyFrame.className = 'bodyFrame';
        this.$footerFrame = document.createElement('div');
        this.$footerFrame.className = 'footerFrame';
        this.$noticeRow = document.createElement('div');
        this.$noticeRow.className = 'noticeRow';

        this.timer = new Timer({

        });
        this.$timer = this.timer.render();

        this.scoreBox = new  ScoreBox({
            setStateParent: this.setState,
        });
        this.$scoreBox = this.scoreBox.render();

        this.billBoard = new BillBoard({

        });
        this.$billBoard = this.billBoard.render();

        this.textInput = new TextInput({
            onSubmit: text => {
                if(this.data[this.index].text === text) {
                    this.setState({
                        index: ++this.index,
                    })
                }
            }
        });
        this.$textInput = this.textInput.render();

        this.decisionButton = new DecisionButton({
            mention: ['시작', 'loading', '초기화'],
            onClick: () => {
                this.setState({
                    status: (this.status + 1) % statusModular,
                });
            }
        });
        this.$decisionButton = this.decisionButton.render();

        this.$noticeRow.appendChild(this.$timer);
        this.$noticeRow.appendChild(this.$scoreBox);
        this.$bodyFrame.appendChild(this.$noticeRow);
        this.$bodyFrame.appendChild(this.$billBoard);
        this.$bodyFrame.appendChild(this.$textInput);
        this.$bodyFrame.appendChild(this.$decisionButton);

        this.$home.appendChild(this.$headerFrame);
        this.$home.appendChild(this.$bodyFrame);
        this.$home.appendChild(this.$footerFrame);

        this.children = [ this.timer, this.scoreBox, this.billBoard, this.textInput, this.decisionButton ];

        //  initialize
        this.setState({
            status: this.status,
        });
    }

    setState(state) {
        //  Check if there is a handler for the changed state 
        Object.keys(state).forEach(key => {
            if(this[`${key}_handler`]) {
                this[`${key}_handler`](state[key]);
            }
        });

        //  Spread the changed state to children
        this.children.forEach(child => child.setState(state));
    }

    async status_handler(status) {
        this.status = status;
        if(this.status === 1) {
            try {
                const response = await fetch(dataURL);
                const data = await response.json();
                this.data = data;

                // sugar
                setTimeout(() => {
                    this.setState({
                        status: (this.status + 1) % statusModular,
                        data: this.data,
                        index: this.index,
                    });
                }, 1000);
            } catch(e) {
                console.log(e);
            }
        }
    }

    score_handler(score) {
        this.score = score;
    }

    render() {
        return this.$home;
    }
}