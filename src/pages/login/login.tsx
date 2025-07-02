import {
  FC,
  SyntheticEvent,
  useState,
  useEffect,
  Dispatch,
  SetStateAction
} from 'react';
import { LoginUI } from '@ui-pages';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useForm } from '../../services/hooks';
import { loginUser, selectLoginFailed } from '../../services/slices/auth-slice';

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const loginFailed = useAppSelector(selectLoginFailed);

  const [formValue, handleInputChange, setFieldValue] = useForm({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (loginFailed) {
      setError('Ошибка входа. Проверьте email и пароль.');
    }
  }, [loginFailed]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      setError('Заполните все поля');
      return;
    }
    dispatch(
      loginUser({ email: formValue.email, password: formValue.password })
    );
  };

  const setEmail: Dispatch<SetStateAction<string>> = (value) => {
    const newValue =
      typeof value === 'function' ? value(formValue.email) : value;
    setFieldValue('email', newValue);
    if (error) setError('');
  };

  const setPassword: Dispatch<SetStateAction<string>> = (value) => {
    const newValue =
      typeof value === 'function' ? value(formValue.password) : value;
    setFieldValue('password', newValue);
    if (error) setError('');
  };

  return (
    <LoginUI
      errorText={error}
      email={formValue.email}
      setEmail={setEmail}
      password={formValue.password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
