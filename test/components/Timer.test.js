import Timer from '../../src/components/Timer';

let timer;
const testCase = [
    {
        second: 2,
        text: 'my',
    },
    {
        second: 4,
        text: 'name',
    },
    {
        second: 2,
        text: 'is',
    },
    {
        second: 9,
        text: 'cokepizza',
    }
]

beforeAll(() => {
    const setStateParent = () => {};
    const missAWord = () => {
        timer.setState({
            index: timer.index + 1,
        })
    };

    timer = new Timer({ setStateParent, missAWord });
    timer.data = testCase;
});

describe("Initialization phase test", () => {
    beforeEach(() => {
        timer.setState({
            status: 0,
        });
    });

    test("status initialize test", () => {
        expect(timer.status).toBe(0);
    });
});

describe("Game phase test", () => {
    beforeEach(() => {
        timer.setState({
            status: 2,
        });
        timer.index = 0;
        timer.missAWord();
    });

    test("status change test", () => {
        expect(timer.status).toBe(2);
        expect(timer.index).toBe(1);
    });
});