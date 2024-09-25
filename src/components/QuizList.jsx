import React, { useState } from 'react'; 
import QuizForm from './QuizForm';

const QuizList = ({ quizzes, onQuizDeleted, onSelectQuiz }) => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleSelectQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    onSelectQuiz(quiz);
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      const response = await fetch(`https://sdn-asm1.onrender.com/quizzes/${quizId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        onQuizDeleted(quizId);
        setSelectedQuiz(null);
      }
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  return (
    <div>
      <h2 className="mb-3">Quizzes</h2>
      <ul className="list-group mb-3">
        {quizzes.map((quiz) => (
          <li key={quiz._id} className="list-group-item d-flex justify-content-between align-items-center">
            <span className="flex-grow-1 cursor-pointer" onClick={() => handleSelectQuiz(quiz)}>
              {quiz.title}
            </span>
            <div>
              <button
                className="btn btn-primary btn-sm me-2"
                onClick={() => handleSelectQuiz(quiz)}
              >
                Select
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteQuiz(quiz._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <QuizForm onQuizCreated={onSelectQuiz} />
    </div>
  );
};

export default QuizList;