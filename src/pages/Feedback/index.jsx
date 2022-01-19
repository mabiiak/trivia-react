import React from 'react';
import { Header } from '../../components';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="feedback-text">Olá</div>
      </div>
    );
  }
}

export default Feedback;
