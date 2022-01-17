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
    };

    this.renderAnswers = this.renderAnswers.bind(this);
    this.onClickAnswer = this.onClickAnswer.bind(this);
    this.handleAnswers = this.handleAnswers.bind(this);
  }

  componentDidMount() {
    const { handleQuestionsRedux } = this.props;
    handleQuestionsRedux().then(() => {
      const { questionList } = this.props;
      this.handleAnswers(questionList);
    });
  }

  onClickAnswer() {
    console.log('clickou');
  }

  handleAnswers(questionList) {
    this.setState({
      answersList: [questionList[0].correct_answer, ...questionList[0].incorrect_answers],
    });
  }

  renderAnswers() {
    const { questionList } = this.props;
    const { answersList } = this.state;
    const { onClickAnswer } = this;
    const incorrectAnswers = questionList[0].incorrect_answers;
    const RANDOM_INTERVAL = 0.5;
    const shuffledList = answersList.sort(() => Math.random() - RANDOM_INTERVAL);

    return (
      shuffledList.map((answer, index) => {
        let testId = 'correct-answer';
        if (incorrectAnswers.some((options) => answer === options)) {
          testId = `wrong-answer-${index}`;
        }
        return (
          <Button
            label={ answer }
            buttDisabled={ false }
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
