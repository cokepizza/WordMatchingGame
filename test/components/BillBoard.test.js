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

beforeEach(() => {
    billBoard = new BillBoard();
    billBoard.data_handler(testCase);
    expect(billBoard.data).toBe(testCase);
});

test('hi', () => {
    
    expect(true).toBe(true);
})

// describe('BillBoard Test', () => {
//     it('hi', () => {
//         console.log(billBoard);
//         expect(true).toBe(true);
//     })
// });