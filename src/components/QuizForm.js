import React, { useState } from 'react';

const QuizForm = ({ onQuizCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://sdn-asm1.onrender.com/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      if (!response.ok) throw new Error('Failed to create quiz');
      
      setTitle('');
      setDescription('');
      onQuizCreated();
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Quiz Title"
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Quiz Description"
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Create Quiz
      </button>
    </form>
  );
};

export default QuizForm;
