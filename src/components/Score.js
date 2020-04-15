import './Score.scss';

export default class Score {
    $score = null;

    constructor({}) {
        this.$score = document.createElement('div');
        this.$score.className = 'score';

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

    data_handler(data) {
        this.data = data;
    }

    index_handler(index) {
        this.$score.innerText = this.data[index].second;
    }

    render() {
        return this.$score;
    }
}