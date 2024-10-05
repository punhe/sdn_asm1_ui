import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const QuizDetails = () => {
  const [quiz, setQuiz] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchQuizDetails();
  }, [id]);

  const fetchQuizDetails = async () => {
    try {
      const response = await fetch(`https://sdn-asm1.onrender.com/quizzes/${id}`);
      const data = await response.json();
      setQuiz(data);
    } catch (error) {
      console.error('Error fetching quiz details:', error);
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Quiz Details</h2>
      <h3>{quiz.title}</h3>
      <p>{quiz.description}</p>
      <Link to={`/quizzes/${id}/edit`} className="btn btn-primary mb-3">Edit Quiz</Link>
      <h4>Questions:</h4>
      {quiz.questions && quiz.questions.length > 0 ? (
        <ul className="list-group">
          {quiz.questions.map((question, index) => (
            <li key={question._id} className="list-group-item">
              <h5>{index + 1}. {question.text}</h5>
              <ol type="a">
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex} className={optionIndex === question.correctAnswerIndex ? 'text-success font-weight-bold' : ''}>
                    {option}
                    {optionIndex === question.correctAnswerIndex && ' (Correct)'}
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      ) : (
        <p>No questions available for this quiz.</p>
      )}
      <Link to="/quizzes" className="btn btn-secondary mt-3">Back to Quizzes</Link>
    </div>
  );
};

export default QuizDetails;