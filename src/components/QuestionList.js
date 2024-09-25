import React, { useState, useEffect } from 'react';

const QuestionList = ({ quizId }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`https://sdn-asm1.onrender.com/quizzes/${quizId}/populate`);
      const data = await response.json();
      setQuestions(data || []);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  return (
    <ul className="list-group">
      {questions.length > 0 ? (
        questions.map((question) => (
          <li key={question._id} className="list-group-item">
            <h5>{question.text}</h5>
            <ul className="list-group mt-2">
              {question.options.map((option, index) => (
                <li 
                  key={index} 
                  className={`list-group-item ${index === question.correctAnswerIndex ? 'bg-success text-white' : ''}`}
                >
                  {option}
                </li>
              ))}
            </ul>
          </li>
        ))
      ) : (
        <li className="list-group-item">No questions found</li>
      )}
    </ul>
  );
};

export default QuestionList;
