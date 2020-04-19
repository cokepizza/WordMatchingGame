import DecisionButton from '../../src/components/DecisionButton';

let decisionButton;

const mention = ['시작', 'loading', '초기화'];

const statusModular = 3;

beforeAll(() => {
    const onClick = () => {
        decisionButton.setState({
            status: (decisionButton.status + 1) % statusModular,
        });
    }

    decisionButton = new DecisionButton({ mention, onClick });
});

describe("Initialization phase test", () => {
    beforeEach(() => {
        decisionButton.setState({
            status: 0,
        });
    });

    test("status initialize test", () => {
        expect(decisionButton.status).toBe(0);
        expect(decisionButton.nextText).toBe(mention[0]);
    });
});

describe("Loading phase test", () => {
    beforeEach(() => {
        decisionButton.onClick();
    });

    test("status change test => decisionButton.nextText change", () => {
        expect(decisionButton.status).toBe(1);
        expect(decisionButton.nextText).toBe('');
    });
});

describe("Game phase test", () => {
    beforeEach(() => {
        decisionButton.onClick();
    });

    test("status change test => decisionButton.nextText change", () => {
        expect(decisionButton.status).toBe(2);
        expect(decisionButton.nextText).toBe(mention[2]);
    });
});