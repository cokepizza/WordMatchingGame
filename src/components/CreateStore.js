export default class CreateStore {
    state = {};
    
    constructor() {
        this.listener = [];
    };

    subscribe(l) {
        this.listener.push(l);
        return () => {
            const index = this.listener.indexOf(l);
            this.listener.splice(index, 1);
        }
    }

    dispatch(action) {
        //  only rootReducer
        const payload = action.payload;
        if(action.type === 'score') {
            const { score } = payload;
            this.state = {
                ...this.state,
                score,
            }
        }

        this.notify();
    }

    getState() {
        return this.state;
    }

    notify() {
        this.listener.forEach(l => l());
    }
};