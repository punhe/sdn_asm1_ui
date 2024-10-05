import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch('https://sdn-asm1.onrender.com/quizzes');
      const data = await response.json();
      setQuizzes(data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://sdn-asm1.onrender.com/quizzes/${id}`, {
        method: 'DELETE',
      });
      fetchQuizzes(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  return (
    <div>
      <h2>List of Quizzes</h2>
      <Link to="/quizzes/new" className="btn btn-primary mb-3">Create New Quiz</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz._id}>
              <td>{quiz.title}</td>
              <td>{quiz.description}</td>
              <td>
                <Link to={`/quizzes/${quiz._id}`} className="btn btn-sm btn-info me-2">View</Link>
                <Link to={`/quizzes/${quiz._id}/edit`} className="btn btn-sm btn-primary me-2">Edit</Link>
                <button onClick={() => handleDelete(quiz._id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizList;