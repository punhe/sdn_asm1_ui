import React, { useState } from 'react';

const QuestionForm = ({ quizId, onQuestionCreated }) => {
  const [text, setText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://sdn-asm1.onrender.com/questions/${quizId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          options,
          correctAnswerIndex,
        }),
      });
      if (!response.ok) throw new Error('Failed to create question');

      setText('');
      setOptions(['', '', '', '']);
      setCorrectAnswerIndex(0);
      onQuestionCreated();
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="form-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Question Text"
          className="form-control"
          required
        />
      </div>
      {options.map((option, index) => (
        <div key={index} className="form-group">
          <input
            type="text"
            value={option}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
            placeholder={`Option ${index + 1}`}
            className="form-control"
            required
          />
        </div>
      ))}
      <div className="form-group">
        <select
          value={correctAnswerIndex}
          onChange={(e) => setCorrectAnswerIndex(Number(e.target.value))}
          className="form-control"
        >
          {options.map((_, index) => (
            <option key={index} value={index}>
              Correct Answer: Option {index + 1}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-success">
        Add Question
      </button>
    </form>
  );
};

export default QuestionForm;