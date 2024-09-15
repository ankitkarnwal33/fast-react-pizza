import { FormEvent, useState } from 'react';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { updateName } from './userSlice';
import { useNavigate } from 'react-router-dom';
import React from 'react';
function CreateUser() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    dispatch(updateName(username));
    navigate('/menu');
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="md: mb-10 text-base text-sm text-stone-600">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input mb-6 w-72"
      />

      {username !== '' && (
        <div>
          <Button
            type={'primary'}
            disabled={false}
            to={''}
            onClick={function (e: React.FormEvent): void {
              throw new Error('Function not implemented.');
            }}
          >
            Start ordering
          </Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
