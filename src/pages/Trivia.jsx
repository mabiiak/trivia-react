import React from 'react';
import getQuestions from '../services/triviaApi';
import Button from '../components/Button';

class Trivia extends React.Component {
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
    getQuestions().then((questionList) => {
      this.setState({ questions: questionList, loaded: true }, () => {
        const { questions } = this.state; 
        this.setState({
          answersList: [questions[0].correct_answer, ...questions[0].incorrect_answers]
        })
      });
    })
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

export default Trivia;
