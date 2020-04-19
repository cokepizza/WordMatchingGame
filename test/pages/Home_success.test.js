//  success scenario
import 'isomorphic-fetch';
import Home from '../../src/pages/Home';
import Navigation from '../../src/Navigation';

let home;
let decisionButton;
let textInput;
let navigation;

beforeAll(() => {
    const $root = document.querySelector('body');
    const defaultUrl = '/';
    navigation = new Navigation({ $root, defaultUrl });
    home = new Home({navigation});
    ({ decisionButton, textInput } = home);
})

describe("Initialization phase test", () => {
    test("check status whether 0 or not", () => {
        expect(home.status).toBe(0);
    });
});

describe("Loading phase test", () => {
    beforeAll(async () => {
        await decisionButton.onClick();
    })

    test("check status whether 1 or not", () => {
        expect(home.status).toBe(1);
    });
});

describe("Game phase test", () => {
    beforeAll(async() => {
        await new Promise((resolve, reject) => setTimeout(() => {
            resolve();
        }, 300));
    });

    test("check status whether 2 or not", () => {
        expect(home.status).toBe(2);
    });

    test("check consistency of varialbe in Home", async () => {
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