import './BillBoard.scss';

export default class BillBoard {
    $billBoardFrame = null;
    $billBoard = null;
    children = [];
    data = [];
    
    constructor() {
        this.$billBoardFrame = document.createElement('div');
        this.$billBoardFrame.className = 'billBoardFrame';

        this.$billBoard = document.createElement('div');
        this.$billBoard.className = 'billBoard';

        this.$underline = document.createElement('div');
        this.$underline.className = 'underline';

        this.$billBoardFrame.appendChild(this.$billBoard);
        this.$billBoardFrame.appendChild(this.$underline);
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
        this.status = status;
        if(status === 0) {
            this.data = [];
            this.$billBoard.innerText = '';
        }
    }

    time_handler(time) {
        this.time = time;
        if(this.status === 2) {
            const remainTime = this.time / this.initTime * 100;
            let color;
            if(remainTime <= 50) {
                color = 'red';
            } else {
                color = 'green';
            }
            this.$underline.style= `width:${remainTime}%; background: ${color}`;
        }
    }

    data_handler(data) {
        this.data = data;
    }

    index_handler(index) {
        const length = this.data.length;
        if(length > index) {
            const { text: nextText, second } = this.data[index];
            this.initTime = second;
            this.$underline.style= `width:100%; background: green`;
            this.nextText = nextText;
            this.$billBoard.innerText = this.nextText;
        } else {
            this.nextText = '';
            this.$billBoard.innerText = this.nextText;
        }
        
    }

    render() {
        return this.$billBoardFrame;
    }
}