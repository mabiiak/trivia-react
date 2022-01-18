import React from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import Header from '../components/Header';
import Button from '../components/Button';
import { handleQuestions } from '../redux/actions';
import Timer from '../components/Timer';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      answersList: [],
      buttonDisabled: false,
      currentTime: 30,
    };

    this.renderAnswers = this.renderAnswers.bind(this);
    this.onClickAnswer = this.onClickAnswer.bind(this);
    this.handleAnswers = this.handleAnswers.bind(this);
  }

  componentDidMount() {
    const MIL = 1000;
    const { handleQuestionsRedux } = this.props;
    handleQuestionsRedux().then(() => {
      const { questionList } = this.props;
      this.handleAnswers(questionList);
    });
    this.timerID = setInterval(
      () => this.tick(),
      MIL,
    );
  }

  onClickAnswer() {
    this.setState({ buttonDisabled: true });
  }

  handleAnswers(questionList) {
    const orderList = [
      questionList[0].correct_answer,
      ...questionList[0].incorrect_answers,
    ];
    const RANDOM_INTERVAL = 0.5;
    const shuffledList = orderList.sort(() => Math.random() - RANDOM_INTERVAL);
    this.setState({
      answersList: shuffledList,
    }, () => {

    });
  }

  tick() {
    const ONE = 1;
    const { currentTime } = this.state;
    if (currentTime > 0) {
      this.setState((prevState) => ({
        currentTime: prevState.currentTime - ONE,
      }));
    }
    if (currentTime === 0) {
      this.setState({
        buttonDisabled: true,
      });
    }
  }

  renderAnswers() {
    const { questionList } = this.props;
    const { answersList, buttonDisabled } = this.state;
    const { onClickAnswer } = this;
    const incorrectAnswers = questionList[0].incorrect_answers;

    return (
      answersList.map((answer, index) => {
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

  render() {
    const { currentTime } = this.state;
    const { questionList } = this.props;
    const { renderAnswers } = this;
    return (
      <div>
        <Header />
        <section>
          <div data-testid="question-category">
            { questionList.length > 0 && `Categoria - ${questionList[0].category} ` }
          </div>
          <div data-testid="question-text">
            { questionList.length > 0 && questionList[0].question }
          </div>
        </section>
        <section data-testid="answer-options">
          { questionList.length > 0 && renderAnswers() }
        </section>
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
});

Game.propTypes = {
  handleQuestionsRedux: PropType.func.isRequired,
  questionList: PropType.arrayOf(PropType.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
