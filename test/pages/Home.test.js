import 'isomorphic-fetch';
import Home from '../../src/pages/Home';
import Navigation from '../../src/Navigation';

let home;
let billBoard;
let decisionButton;
let textInput;
let navigation;

beforeAll(() => {
    const $root = document.querySelector('body');
    const defaultUrl = '/';
    navigation = new Navigation({ $root, defaultUrl });
    home = new Home({navigation});
    ({ decisionButton, billBoard, textInput } = home);
})

//  check consistency of varialbe in Home
describe("Initialization phase test (status = 0)", () => {
    test("", () => {
        expect(home.status).toBe(0);
    });
});

describe("Loading phase test (status = 1)", () => {
    beforeAll(async () => {
        await decisionButton.onClick();
    })

    test('This is a sample', () => {
        expect(true).toBe(true);
    });

    test("", () => {
        expect(home.status).toBe(1);
    });
});

describe("Game phase test (status = 2)", () => {
    beforeAll(async() => {
        await new Promise((resolve, reject) => setTimeout(() => {
            resolve();
        }, 300));
    });

    test("", () => {
        expect(home.status).toBe(2);
    });

    test("", async () => {
        const datas = home.data;
        let index = 0;
        for(const data of datas) {
            ++index;
            await textInput.onSubmit(data.text);
            if(index < datas.length) {
                expect(home.time).toBe(datas[index].second);
            } else {
                expect(home.time).toBe(null);
            }
            expect(home.index).toBe(index);
            expect(home.score).toBe(10);
            expect(home.solved).toBe(index);
            expect(home.timeSpent).toBe(0);
        }
    });
});

// test("", async () => {
//     const datas = home.data;
//     let solved = 0;
//     for(const data of datas) {
//         await textInput.onSubmit(data.text);
//         expect(home.solved).toBe(++solved);
//     }
// })