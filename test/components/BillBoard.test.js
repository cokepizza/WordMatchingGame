import BillBoard from '../../src/components/BillBoard';

let billBoard;

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
    billBoard = new BillBoard();
});

describe("Initialization phase test", () => {
    beforeEach(() => {
        billBoard.status_handler(0);
    });

    test("data initialize test", () => {
        billBoard.data_handler([]);
    });
});

describe("Game phase test", () => {
    beforeEach(() => {
        billBoard.data_handler(testCase);
    });

    test("data insertion test", () => {
        expect(billBoard.data).toBe(testCase);
    });

    test("index insertion test => billBoard.nextText change", () => {
        let index = 0;
        for(const data of billBoard.data) {
            billBoard.index_handler(index);
            expect(billBoard.nextText).toBe(data.text);
            ++index;
        }
    })
});