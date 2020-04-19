import './BillBoard.scss';

export default class BillBoard {
    $billBoard = null;
    children = [];
    data = [];
    
    constructor() {
        this.$billBoard = document.createElement('div');
        this.$billBoard.className = 'billBoard';
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
            this.data = [];
            this.$billBoard.innerText = '';
        }
    }

    data_handler(data) {
        this.data = data;
    }

    index_handler(index) {
        const length = this.data.length;
        if(length > index) {
            const { text: nextText } = this.data[index];
            this.nextText = nextText;
            this.$billBoard.innerText = this.nextText;
        } else {
            this.nextText = '';
            this.$billBoard.innerText = this.nextText;
        }
        
    }

    render() {
        return this.$billBoard;
    }
}