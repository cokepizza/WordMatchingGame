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