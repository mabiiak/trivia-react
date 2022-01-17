import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import { connect } from 'react-redux';
import { handleQuestions } from '../redux/actions';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      loaded: false,
      answersList: [],
    }
    
    this.renderAnswers = this.renderAnswers.bind(this);
    this.onClickAnswer = this.onClickAnswer.bind(this);
    this.handleAnswers = this.handleAnswers.bind(this);
  }

 handleAnswers() {
  const { questions } = this.state;
  console.log(questions);
  this.setState({
    answersList: [
      questions[0].correct_answer,
      ...questions[0].incorrect_answers],
    loaded: true,
  })
 }

  componentDidMount() {
    const { handleQuestions } = this.props;
    handleQuestions();
  }

  onClickAnswer() {
    console.log('clickou');
  }

  renderAnswers() {
    const { state: { answersList, questions }, onClickAnswer } = this;
    const incorrectAnswers = questions[0].incorrect_answers;
    const shuffledList = answersList.sort(() => Math.random() - 0.5)

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
        )
      })
    );
  }

  render() {
    const { state: { loaded, questions }, renderAnswers } = this;
    return (
      <div>
        <Header />
        <section>
          <div data-testid="question-category">
            { loaded && `Categoria - ${questions[0].category}` }
          </div>
          <div data-testid="question-text">
            { loaded && questions[0].question.replace(/&quot;/gi, '"').replace(/&#039;/gi, "'") }
          </div>
        </section>
        <section data-testid="answer-options">
          { loaded && renderAnswers() }
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleQuestions: (state) => dispatch(handleQuestions(state))
})

export default connect(null, mapDispatchToProps)(Game);
