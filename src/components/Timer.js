import './Timer.scss';

export default class Timer {
    $timer = null;
    time = null;
    children = [];
    setTimeRef = null;

    constructor({ setStateParent, missAWord, endTheGame }) {
        this.$timer = document.createElement('div');
        this.$timer.className = 'timer';
        this.setStateParent = setStateParent;
        this.missAWord = missAWord;
        this.endTheGame = endTheGame;
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
                --this.time;
                this.setStateParent({
                    time: this.time,
                });
                this.timeReducer();
            } else {
                console.log('missAword');
                this.missAWord();
            }
            // if(this.time < 0) {
                
            // } else {
                
            // }
        }, 1000);
    }

    render() {
        return this.$timer;
    }
}