import StatePropagation from '../components/StatePropagtion';
import './Timer.scss';

export default class Timer extends StatePropagation {
    $self = null;
    time = null;
    children = [];
    setTimeRef = null;

    constructor(props) {
        super(props);
        const { setStateParent, missAWord } = props;
        this.$self = document.createElement('div');
        this.$self.className = 'timer';
        this.setStateParent = setStateParent;
        this.missAWord = missAWord;
    }

    status_handler(status) {
        this.status = status;
        if(status === 0) {
            this.time = null;
            this.setStateParent({
                time: this.time,
            });
            clearTimeout(this.setTimeRef);
        }
    }

    data_handler(data) {
        this.data = data;
    }

    index_handler(index) {
        this.index = index;
        const length = this.data.length;
        if(length > index) {
            this.time = this.data[index].second;
            this.setStateParent({
                time: this.time,
            });
            this.timeReducer();
        } else {
            this.time = null;
            this.setStateParent({
                time: this.time,
            })
        }
    }

    time_handler(time) {
        this.time = time;
        if(this.time === null) {
            this.$self.innerText = '';
        } else {
            this.$self.innerText = '남은 시간 : ' + this.time + '초';
        }
    }

    timeReducer() {
        clearTimeout(this.setTimeRef);
        this.setTimeRef = setTimeout(() => {
            if(this.time === null) {
                this.$self.innerText = '';
            } else if(this.time > 0) {
                this.setStateParent({
                    time: this.time - 1,
                });
                this.timeReducer();
            } else {
                this.missAWord();
            }
        }, 1000);
    }
}