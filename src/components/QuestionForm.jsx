import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const QuestionForm = () => {
  const [question, setQuestion] = useState({ text: '', options: ['', '', '', ''], correctAnswerIndex: 0 });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchQuestion(id);
    }
  }, [id]);

  const fetchQuestion = async (questionId) => {
    try {
      const response = await fetch(`https://sdn-asm1.onrender.com/questions/${questionId}`);
      const data = await response.json();
      setQuestion(data);
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = id
        ? `https://sdn-asm1.onrender.com/questions/${id}`
        : 'https://sdn-asm1.onrender.com/questions';
      const method = id ? 'PUT' : 'POST';
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(question),
      });
      navigate('/questions');
    } catch (error) {
      console.error('Error saving question:', error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Question' : 'Create Question'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="questionText" className="form-label">Question Text</label>
          <input
            type="text"
            className="form-control"
            id="questionText"
            value={question.text}
            onChange={(e) => setQuestion({ ...question, text: e.target.value })}
            required
          />
        </div>
        {question.options.map((option, index) => (
          <div key={index} className="mb-3">
            <label htmlFor={`option${index}`} className="form-label">Option {index + 1}</label>
            <input
              type="text"
              className="form-control"
              id={`option${index}`}
              value={option}
              onChange={(e) => {
                const newOptions = [...question.options];
                newOptions[index] = e.target.value;
                setQuestion({ ...question, options: newOptions });
              }}
              required
            />
          </div>
        ))}
        <div className="mb-3">
          <label htmlFor="correctAnswer" className="form-label">Correct Answer</label>
          <select
            className="form-select"
            id="correctAnswer"
            value={question.correctAnswerIndex}
            onChange={(e) => setQuestion({ ...question, correctAnswerIndex: parseInt(e.target.value) })}
          >
            {question.options.map((_, index) => (
              <option key={index} value={index}>Option {index + 1}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">{id ? 'Update' : 'Create'} Question</button>
      </form>
    </div>
  );
};

export default QuestionForm;