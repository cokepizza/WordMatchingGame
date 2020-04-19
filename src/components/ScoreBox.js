import StatePropagation from '../components/StatePropagtion';
import './ScoreBox.scss';

const defaultScore = 10;
export default class ScoreBox extends StatePropagation {
    $self = null;
    score = null;
    children = [];

    constructor(props) {
        super(props);
        const { setStateParent } = props;
        this.$self = document.createElement('div');
        this.$self.className = 'scoreBox';
        this.setStateParent = setStateParent;
    }

    status_handler(status) {
        this.status = status;
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
            this.$self.innerText = '';
        } else {
            this.$self.innerText = this.score + '점';
        }
    }
}