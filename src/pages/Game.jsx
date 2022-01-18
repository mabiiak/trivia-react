import React from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import Header from '../components/Header';
import Button from '../components/Button';
import { handleQuestions } from '../redux/actions';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      answersList: [],
      buttonDisabled: false,
      questionIndex: 0,
    };

    this.renderAnswers = this.renderAnswers.bind(this);
    this.onClickAnswer = this.onClickAnswer.bind(this);
    this.handleAnswers = this.handleAnswers.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  componentDidMount() {
    const { handleQuestionsRedux } = this.props;
    handleQuestionsRedux().then(() => {
      const { questionList } = this.props;
      this.handleAnswers(questionList);
    });
  }

  onClickAnswer() {
    this.setState({ buttonDisabled: true });
  }

  handleAnswers(questionList) {
    const { questionIndex } = this.state;
    const orderList = [
      questionList[questionIndex].correct_answer,
      ...questionList[questionIndex].incorrect_answers,
    ];
    const RANDOM_INTERVAL = 0.5;
    const shuffledList = orderList.sort(() => Math.random() - RANDOM_INTERVAL);
    this.setState({
      answersList: shuffledList,
    }, () => {

    });
  }

  handleNext() {
    const ADD_TO_INDEX = 1;
    const MAX_INDEX = 4;
    const { questionIndex } = this.state;
    if (questionIndex < MAX_INDEX) {
      this.setState({ questionIndex: questionIndex + ADD_TO_INDEX });
    }
  }

  renderAnswers(questionIndex) {
    const { questionList } = this.props;
    const { answersList, buttonDisabled } = this.state;
    const { onClickAnswer } = this;
    const incorrectAnswers = questionList[questionIndex].incorrect_answers;

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
        <section>
          <div data-testid="question-category">
            { questionList.length > 0
            && `Categoria - ${questionList[questionIndex].category} ` }
          </div>
          <div data-testid="question-text">
            { questionList.length > 0 && questionList[questionIndex].question }
          </div>
        </section>
        <section data-testid="answer-options">
          { questionList.length > 0 && renderAnswers(questionIndex) }
          <div>
            <Button
              label="Next"
              onClick={ handleNext }
            />
          </div>
        </section>
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
