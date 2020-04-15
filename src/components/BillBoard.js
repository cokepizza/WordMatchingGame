import './BillBoard.scss';

export default class BillBoard {
    $billBoard = null;
    children = [];
    data = [];
    
    constructor() {
        this.$billBoard = document.createElement('div');
        this.$billBoard.className = 'billBoard';
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

        }
    }

    data_handler(data) {
        this.data = data;
        console.log(this.data);
    }

    index_handler(index) {
        const { text } = this.data[index];
        this.$billBoard.innerText = text;
    }

    render() {
        return this.$billBoard;
    }
}