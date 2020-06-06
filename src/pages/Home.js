import StatePropagation from '../components/StatePropagtion';
import Timer from '../components/Timer';
import ScoreBox from '../components/ScoreBox';
import BillBoard from '../components/BillBoard';
import TextInput from '../components/TextInput';
import DecisionButton from '../components/DecisionButton';

import './Home.scss';

const dataURL = 'https://hixxx.me/wordJsonData';
const statusModular = 3;

export default class Home extends StatePropagation {
    $self = null;
    status = 0;
    data = [];
    index = 0;
    score = null;
    children = [];

    constructor(props) {
        super(props);
        const { navigation } = props;
        this.navigation = navigation;
        this.$self = document.createDocumentFragment();

        this.$headerFrame = document.createElement('div');
        this.$headerFrame.className = 'Home_headerFrame';
        this.$bodyFrame = document.createElement('div');
        this.$bodyFrame.className = 'Home_bodyFrame';
        this.$footerFrame = document.createElement('div');
        this.$footerFrame.className = 'Home_footerFrame';
        this.$noticeRow = document.createElement('div');
        this.$noticeRow.className = 'Home_noticeRow';

        this.$githubBlock = document.createElement('a');
        const text = document.createTextNode('https://github.com/cokepizza');
        this.$githubBlock.appendChild(text);
        this.$githubBlock.href = 'https://github.com/cokepizza';
        this.$githubBlock.style = 'color: rgba(0, 0, 0, 0.4); text-decoration: none;';

        this.$informBlock = document.createElement('div');
        this.$informBlock.innerHTML = 'Powered by SJCorp. Designs @ 2020 SJCorp';
        
        this.$footerPrint = document.createElement('div');
        this.$footerPrint.className = 'Home_footerPrint';
        this.$footerPrint.appendChild(this.$githubBlock);
        this.$footerPrint.appendChild(this.$informBlock);
        this.$footerFrame.appendChild(this.$footerPrint);

        this.timer = new Timer({
            setStateParent: this.setState,
            missAWord: async () => {
                await this.setState({
                    score: this.score - 1,
                    index: this.index + 1,
                })
            }
        });
        this.$timer = this.timer.render();

        this.scoreBox = new  ScoreBox({
            setStateParent: this.setState,
        });
        this.$scoreBox = this.scoreBox.render();

        this.billBoard = new BillBoard();
        this.$billBoard = this.billBoard.render();

        this.textInput = new TextInput({
            onSubmit: async text => {
                if(this.data[this.index].text === text) {
                    const prevIndex = this.index;
                    await this.setState({
                        index: this.index + 1,
                        solved: this.solved + 1,
                        timeSpent: this.timeSpent += (this.data[prevIndex].second - this.time),
                    });

                    if(this.data.length === this.index) {
                        this.navigateResult();
                    }
                }
            }
        });
        this.$textInput = this.textInput.render();

        this.decisionButton = new DecisionButton({
            mention: ['시작', 'loading', '초기화'],
            onClick: async () => {
                await this.setState({
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

        this.$self.appendChild(this.$headerFrame);
        this.$self.appendChild(this.$bodyFrame);
        this.$self.appendChild(this.$footerFrame);

        this.children = [ this.timer, this.scoreBox, this.billBoard, this.textInput, this.decisionButton ];

        //  initialize
        this.setState({
            status: this.status,
        });
    }

    async status_handler(status) {
        this.status = status;
        if(this.status === 0) {
            this.data = [];
            this.index = 0;
            this.time = null;
            this.score = null;
            this.solved = 0;
            this.timeSpent = 0;

            this.setState({
                data: this.data,
                index: this.index,
                time: this.time,
                score: this.score,
            });
        } else if (this.status === 1) {
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
                }, 300);
            } catch(e) {
                console.log(e);
            }
        }
    }

    index_handler(index) {
        this.index = index;
    }

    score_handler(score) {
        this.score = score;
    }

    time_handler(time) {
        this.time = time;
    }

    solved_handler(solved) {
        this.solved = solved;
    }

    timeSpent_handler(timeSpent) {
        this.timeSpent = timeSpent;
    }

    navigateResult() {
        this.navigation.navigate('/result', {
            score: this.score,
            timeSpentAverage: parseInt(this.timeSpent / this.solved),
        });
    }
}