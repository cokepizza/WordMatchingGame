export default class StatePropagation {
    constructor() {}

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

    render() {
        return this.$self;
    }
}