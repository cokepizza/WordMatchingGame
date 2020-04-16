import './Timer.scss';

export default class Timer {
    $timer = null;
    time = null;
    children = [];
    setTimeRef = null;

    constructor({ setStateParent }) {
        this.$timer = document.createElement('div');
        this.$timer.className = 'timer';
        this.setStateParent = setStateParent;
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

    status_handler(status) {
        if(status === 0) {
            this.time = null;
            this.setStateParent({
                time: this.time,
            })
            clearTimeout(this.setTimeRef);
        }
    }

    data_handler(data) {
        this.data = data;
    }

    index_handler(index) {
        this.time = this.data[index].second;
        this.setStateParent({
            time: this.time,
        });
        this.timeReducer();
    }

    time_handler(time) {
        if(time) {
            this.$timer.innerText = '남은 시간 : ' + time + '초';
        } else {
            this.$timer.innerText = '';
        }
    }

    timeReducer() {
        clearTimeout(this.setTimeRef);
        this.setTimeRef = setTimeout(() => {
            --this.time;
            if(this.time < 0) {
                console.log('time 0');
            } else {
                this.setStateParent({
                    time: this.time,
                });
                this.timeReducer();
            }
        }, 1000);
    }

    render() {
        return this.$timer;
    }
}