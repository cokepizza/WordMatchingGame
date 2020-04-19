import ScoreBox from '../../src/components/ScoreBox';

const defaultScore = 10;

let scoreBox;

beforeAll(() => {
    const setStateParent = ({ score }) => {
        scoreBox.setState({
            score,
        })
    };

    scoreBox = new ScoreBox({ setStateParent });
});

describe("Initialization phase test", () => {
    beforeEach(() => {
        scoreBox.setState({
            status: 0,
        });
    });

    test("status initialize test", () => {
        expect(scoreBox.status).toBe(0);
        expect(scoreBox.score).toBe(null);
    });
});

describe("Game phase test", () => {
    beforeEach(() => {
        scoreBox.setState({
            status: 2,
        });
    });

    test("status change test", () => {
        expect(scoreBox.status).toBe(2);
        expect(scoreBox.score).toBe(defaultScore);
    });

    test("score change test", () => {
        for(let i=0; i<10; ++i) {
            scoreBox.score_handler(i);
            expect(scoreBox.score).toBe(i);
        }
    });
});