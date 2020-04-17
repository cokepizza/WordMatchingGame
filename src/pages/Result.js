import './Result.scss';

export default class Result {
    $result = null;

    constructor({ navigation, score, timeSpentAverage }) {
        this.navigation = navigation;
        this.$result = document.createDocumentFragment();

        this.$headerFrame = document.createElement('div');
        this.$headerFrame.className = 'Result_headerFrame';
        this.$bodyFrame = document.createElement('div');
        this.$bodyFrame.className = 'Result_bodyFrame';
        this.$footerFrame = document.createElement('div');
        this.$footerFrame.className = 'Result_footerFrame';
        this.$noticeRow = document.createElement('div');
        this.$noticeRow.className = 'Result_noticeRow';

        this.$titleMention = document.createElement('div');
        this.$titleMention.style = 'font-size: 30px;';
        this.$titleMention.innerHTML = 'Mission Complete!';
        
        this.$scoreMention = document.createElement('div');
        this.$scoreMention.style = 'font-size: 50px;';
        this.$scoreMention.innerHTML = `당신의 점수는 ${score}점 입니다.`;

        this.$timeMention = document.createElement('div');
        this.$timeMention.style = 'font-size: 50px;';
        this.$timeMention.innerHTML = `단어당 평균 답변 시간은 ${timeSpentAverage}초 입니다.`;

        this.$restartButton = document.createElement('button');
        this.$restartButton.className = 'Result_restartButton';
        this.$restartButton.addEventListener('click', () => {
            navigation.goBack();
        });
        this.$restartButton.innerHTML = '다시 시작';

        this.$bodyFrame.appendChild(this.$titleMention);
        this.$bodyFrame.appendChild(this.$scoreMention);
        this.$bodyFrame.appendChild(this.$timeMention);
        this.$bodyFrame.appendChild(this.$restartButton);

        this.$result.appendChild(this.$headerFrame);
        this.$result.appendChild(this.$bodyFrame);
        this.$result.appendChild(this.$footerFrame);        
    }

    render() {
        return this.$result;
    }
}