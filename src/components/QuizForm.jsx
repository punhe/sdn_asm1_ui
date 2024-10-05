import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const QuizForm = () => {
  const [quiz, setQuiz] = useState({ title: '', description: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchQuiz(id);
    }
  }, [id]);

  const fetchQuiz = async (quizId) => {
    try {
      const response = await fetch(`https://sdn-asm1.onrender.com/quizzes/${quizId}`);
      const data = await response.json();
      setQuiz(data);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = id
        ? `https://sdn-asm1.onrender.com/quizzes/${id}`
        : 'https://sdn-asm1.onrender.com/quizzes';
      const method = id ? 'PUT' : 'POST';
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quiz),
      });
      navigate('/quizzes');
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Quiz' : 'Create Quiz'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="quizTitle" className="form-label">Quiz Title</label>
          <input
            type="text"
            className="form-control"
            id="quizTitle"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quizDescription" className="form-label">Quiz Description</label>
          <textarea
            className="form-control"
            id="quizDescription"
            value={quiz.description}
            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">{id ? 'Update' : 'Create'} Quiz</button>
      </form>
    </div>
  );
};

export default QuizForm;