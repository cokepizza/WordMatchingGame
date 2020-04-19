//  failure scenario
import 'isomorphic-fetch';
import Home from '../../src/pages/Home';
import Navigation from '../../src/Navigation';

let home;
let decisionButton;
let textInput;
let timer;
let navigation;

beforeAll(() => {
    const $root = document.querySelector('body');
    const defaultUrl = '/';
    navigation = new Navigation({ $root, defaultUrl });
    home = new Home({navigation});
    ({ decisionButton, textInput, timer } = home);
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

        //  miss a word due to timeout
        await timer.missAWord();
        expect(home.index).toBe(1);
        expect(home.time).toBe(datas[1].second);
        expect(home.score).toBe(9);
        expect(home.solved).toBe(0);
        expect(home.timeSpent).toBe(0);

        //  textInput - correct
        await textInput.onSubmit(datas[1].text);
        expect(home.index).toBe(2);
        expect(home.time).toBe(datas[2].second);
        expect(home.score).toBe(9);
        expect(home.solved).toBe(1);
        expect(home.timeSpent).toBe(0);

        //  textInput - misspell (nothing happen, just clear textInput)
        await textInput.onSubmit(datas[2].text + "_misspell");
        expect(home.index).toBe(2);
        expect(home.time).toBe(datas[2].second);
        expect(home.score).toBe(9);
        expect(home.solved).toBe(1);
        expect(home.timeSpent).toBe(0);
    });
});