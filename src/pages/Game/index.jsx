import React from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import { handleQuestions, setScore } from '../../redux/actions';
import {
  Header,
  Button,
  Timer,
} from '../../components';
import '../../sass/game.scss';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      answersList: [],
      buttonDisabled: false,
      questionList: [],
      questionIndex: 0,
      currentTime: 30,
      display: 'nextButtonNotShown',
      score: 0,
      assertions: 0,
    };

    this.renderAnswers = this.renderAnswers.bind(this);
    this.onClickAnswer = this.onClickAnswer.bind(this);
    this.handleAnswers = this.handleAnswers.bind(this);
    this.sumPoints = this.sumPoints.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  componentDidMount() {
    const TIME = 1000;
    const { handleQuestionsRedux } = this.props;
    handleQuestionsRedux().then(() => {
      const { questionList } = this.props;
      this.setState({ questionList }, () => {
        this.handleAnswers(questionList);
      });
    });
    this.timerID = setInterval(
      () => this.tick(),
      TIME,
    );
  }

  onClickAnswer(e) {
    const { value } = e.target;
    this.setState({ buttonDisabled: true, display: 'notClicked', currentTime: 30 });
    this.sumPoints(value);
  }

  sumPoints(value) {
    const { questionList, questionIndex, currentTime, assertions } = this.state;
    console.log(assertions);
    const diff = (questionList[questionIndex]);
    const correct = questionList[questionIndex].correct_answer;

    const correctAnswer = 10;
    const mediumDifficulty = 2;
    const hardDifficulty = 3;

    let currentDifficulty = 1;

    if (value === correct) {
      if (diff === 'medium') currentDifficulty = mediumDifficulty;
      if (diff === 'hard') currentDifficulty = hardDifficulty;

      this.setState((prevState) => ({
        score:
          prevState.score + correctAnswer + (currentTime * currentDifficulty),
        assertions: prevState.assertions + 1,
      }), () => {
        const { score } = this.state;
        const { setScoreRedux } = this.props;
        localStorage.setItem('ranking', JSON.stringify({ score }));
        setScoreRedux(this.state);
      });
    }
  }

  handleAnswers() {
    const { questionList } = this.state;
    const arrayOfAnswers = [];
    questionList.forEach((question) => {
      const orderList = [question.correct_answer, ...question.incorrect_answers];
      const RANDOM_INTERVAL = 0.5;
      const shuffledList = orderList.sort(() => Math.random() - RANDOM_INTERVAL);
      arrayOfAnswers.push(shuffledList);
    });
    this.setState({ answersList: arrayOfAnswers });
  }

  handleNext() {
    const { history } = this.props;
    const ADD_TO_INDEX = 1;
    const MAX_INDEX = 4;
    const { questionIndex } = this.state;
    if (questionIndex < MAX_INDEX) {
      this.setState({ questionIndex: questionIndex + ADD_TO_INDEX }, () => {
        this.setState({ buttonDisabled: false, display: 'nextButtonNotShown' });
      });
    } else {
      history.push('/feedback');
    }
  }

  tick() {
    const ONE = 1;
    const { currentTime, buttonDisabled } = this.state;
    if (currentTime > 0 && buttonDisabled === false) {
      this.setState((prevState) => ({
        currentTime: prevState.currentTime - ONE,
      }));
    }
    if (currentTime === 0) {
      this.setState({
        buttonDisabled: true,
        display: 'notClicked',
      });
    }
  }

  renderAnswers() {
    const { questionList } = this.props;
    const { answersList, buttonDisabled, questionIndex } = this.state;
    const { onClickAnswer } = this;
    if (answersList.length > 0) {
      const incorrectAnswers = questionList[questionIndex].incorrect_answers;
      return (
        answersList[questionIndex].map((answer, index) => {
          let className = 'notClicked';
          if (buttonDisabled === true) {
            className = 'correctAnswer';
            if (incorrectAnswers.some((options) => answer === options)) {
              className = 'wrongAnswer';
            }
          }
          let testId = 'correct-answer';
          if (incorrectAnswers.some((options) => answer === options)) {
            testId = `wrong-answer-${index}`;
          }
          return (
            <Button
              className={ className }
              label={ answer }
              buttDisabled={ buttonDisabled }
              key={ index }
              onClick={ onClickAnswer }
              dataTest={ testId }
            />
          );
        })
      );
    }
  }

  render() {
    const { currentTime, display } = this.state;
    const { questionList } = this.props;
    const {
      state: {
        questionIndex,
      },
      renderAnswers,
      handleNext,
    } = this;
    return (
      <div>
        <Header />
        <div className="gameContainer">
          <div className="innerGameContainer">
            <section className="questionContainer">
              <div
                className="categoryContainer"
                data-testid="question-category"
              >
                { questionList.length > 0
                && `Categoria - ${questionList[questionIndex].category} ` }
              </div>
              <div
                className="innerQuestionContainer"
                data-testid="question-text"
              >
                { questionList.length > 0 && questionList[questionIndex].question }
              </div>
            </section>
            <section className="answerContainer" data-testid="answer-options">
              { questionList.length > 0 && renderAnswers(questionIndex) }
            </section>
          </div>
          <div>
            <Button
              className={ display }
              buttDisabled={ false }
              label="Next"
              onClick={ handleNext }
              dataTest="btn-next"
            />
          </div>
        </div>
        <Timer currentTime={ currentTime } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questionList: state.questions.questionList,
  isFetching: state.questions.isFetching,
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  handleQuestionsRedux: () => dispatch(handleQuestions()),
  setScoreRedux: (state) => dispatch(setScore(state)),
});

Game.propTypes = {
  history: PropType.arrayOf(PropType.func).isRequired,
  handleQuestionsRedux: PropType.func.isRequired,
  questionList: PropType.arrayOf(PropType.object).isRequired,
  setScoreRedux: PropType.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
