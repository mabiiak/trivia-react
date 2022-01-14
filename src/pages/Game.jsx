import React from 'react';
import Button from '../components/Button';
import { connect } from 'react-redux';

class Game extends React.Component {
  constructor() {
    super();

    this.renderAnswers = this.renderAnswers.bind(this);
    this.onClickAnswer = this.onClickAnswer.bind(this);
    
    this.state = {
      questions: [],
      loaded: false,
      answersList: [],
    }
  }

  componentDidMount() {
    const { returnQuestions } = this.props;
    this.setState({
      questions: returnQuestions,
      answersList: [
        returnQuestions[0].correct_answer,
        ...returnQuestions[0].incorrect_answers],
      loaded: true,
    });
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
        let testId = `correct-answer`
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
    const { returnQuestions } = this.props;
    console.log(returnQuestions);
    const { state: { questions, loaded }, renderAnswers } = this;
    return (
      <div>
        <section>
          <div data-testid="question-category">
            { loaded ? `Categoria - ${questions[0].category}` : `Categoria -` }
          </div>
          <div data-testid="question-text">
          { loaded ? questions[0].question.replace(/&quot;/gi, '"').replace(/&#039;/gi, "'") : `Pergunta -` }
          </div>
        </section>
        <section data-testid="answer-options">
          { loaded ? renderAnswers() : `Resposta 1`}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  returnQuestions: state.questions,
});

export default connect(mapStateToProps)(Game);
