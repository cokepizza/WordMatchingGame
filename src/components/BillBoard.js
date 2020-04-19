import StatePropagation from '../components/StatePropagtion';
import './BillBoard.scss';

export default class BillBoard extends StatePropagation {
    $self = null;
    $billBoard = null;
    children = [];
    data = [];
    
    constructor(props) {
        super(props);
        this.$self = document.createElement('div');
        this.$self.className = 'billBoardFrame';

        this.$billBoard = document.createElement('div');
        this.$billBoard.className = 'billBoard';

        this.$underline = document.createElement('div');
        this.$underline.className = 'underline';

        this.$self.appendChild(this.$billBoard);
        this.$self.appendChild(this.$underline);
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
}