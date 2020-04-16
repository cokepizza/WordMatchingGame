import './ScoreBox.scss';

const defaultScore = 10;
export default class ScoreBox {
    $score = null;
    score = null;
    children = [];

    constructor({ setStateParent }) {
        this.$scoreBox = document.createElement('div');
        this.$scoreBox.className = 'scoreBox';
        this.setStateParent = setStateParent;
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
        if(status === 0) {
            this.setStateParent({
                score: null
            });
        } else if(status === 2) {
            this.setStateParent({
                score: defaultScore,
            });
        }
    }

    score_handler(score) {
        this.score = score;
        if(this.score === null) {
            this.$scoreBox.innerText = '';
        } else {
            this.$scoreBox.innerText = this.score + '점';
        }
    }

    render() {
        return this.$scoreBox;
    }
}