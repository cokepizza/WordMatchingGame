import TextInput from '../../src/components/TextInput';

let textInput;

beforeAll(() => {
    const onSubmit = text => {};

    textInput = new TextInput({ onSubmit });
});

describe("Initialization phase test", () => {
    beforeEach(() => {
        textInput.setState({
            status: 0,
        });
    });

    test("status initialize test", () => {
        expect(textInput.status).toBe(0);
    });
});

describe("Game phase test", () => {
    beforeEach(() => {
        textInput.setState({
            status: 2,
        });
    });

    test("status change test", () => {
        expect(textInput.status).toBe(2);
    });
});