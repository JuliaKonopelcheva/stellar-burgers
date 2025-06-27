import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { loginUser } from '../../services/slices/auth-slice';

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loginFailed } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setError('');
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (loginFailed) {
      setError('Ошибка входа. Проверьте email и пароль.');
    }
  }, [loginFailed]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Заполните все поля');
      return;
    }
    dispatch(loginUser({ email, password }));
  };

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={(value) => {
        setEmail(value);
        if (error) setError('');
      }}
      password={password}
      setPassword={(value) => {
        setPassword(value);
        if (error) setError('');
      }}
      handleSubmit={handleSubmit}
    />
  );
};
