import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { registerUser } from '../../services/slices/auth-slice';
import { RegisterUI } from '@ui-pages';

export const Register: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, registerFailed, registerRequest } = useAppSelector(
    (state) => state.auth
  );

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (registerFailed) {
      setError('Ошибка регистрации. Попробуйте другой email.');
    } else {
      setError('');
    }
  }, [registerFailed]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password || !userName) {
      setError('Заполните все поля');
      return;
    }
    dispatch(registerUser({ email, password, name: userName }));
  };

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
