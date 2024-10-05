import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('https://sdn-asm1.onrender.com/questions');
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://sdn-asm1.onrender.com/questions/${id}`, {
        method: 'DELETE',
      });
      fetchQuestions(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <div>
      <h2>List of Questions</h2>
      <Link to="/questions/new" className="btn btn-primary mb-3">Create New Question</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Question</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question._id}>
              <td>{question.text}</td>
              <td>
                <Link to={`/questions/${question._id}/edit`} className="btn btn-sm btn-primary me-2">Edit</Link>
                <button onClick={() => handleDelete(question._id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionList;