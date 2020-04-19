import './Timer.scss';

export default class Timer {
    $timer = null;
    time = null;
    children = [];
    setTimeRef = null;

    constructor({ setStateParent, missAWord }) {
        this.$timer = document.createElement('div');
        this.$timer.className = 'timer';
        this.setStateParent = setStateParent;
        this.missAWord = missAWord;
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
            this.$timer.innerText = '';
        } else {
            this.$timer.innerText = '남은 시간 : ' + this.time + '초';
        }
    }

    timeReducer() {
        clearTimeout(this.setTimeRef);
        this.setTimeRef = setTimeout(() => {
            if(this.time === null) {

            } else if(this.time > 0) {
                this.setStateParent({
                    time: this.time - 1,
                });
                this.timeReducer();
            } else {
                console.log('missAword');
                this.missAWord();
            }
        }, 1000);
    }

    render() {
        return this.$timer;
    }
}