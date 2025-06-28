import { ProfileUI } from '@ui-pages';
import {
  FC,
  SyntheticEvent,
  useEffect,
  useState,
  Dispatch,
  SetStateAction
} from 'react';
import { useAppDispatch, useAppSelector, useForm } from '../../services/hooks';
import {
  updateUser,
  selectUser,
  selectUpdateUserRequest,
  selectUpdateUserFailed
} from '../../services/slices/auth-slice';

export const Profile: FC = () => {
  // Переменные из стора
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const updateUserRequest = useAppSelector(selectUpdateUserRequest);
  const updateUserFailed = useAppSelector(selectUpdateUserFailed);

  const [formValue, handleInputChange, setFieldValue] = useForm({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    setFieldValue('name', user?.name || '');
    setFieldValue('email', user?.email || '');
  }, [user, setFieldValue]);

  useEffect(() => {
    if (updateUserFailed) {
      setError('Ошибка обновления профиля');
    } else {
      setError('');
    }
  }, [updateUserFailed]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!formValue.name || !formValue.email) {
      setError('Заполните все поля');
      return;
    }
    dispatch(
      updateUser({
        name: formValue.name,
        email: formValue.email,
        password: formValue.password || undefined
      })
    );
    setFieldValue('password', '');
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFieldValue('name', user?.name || '');
    setFieldValue('email', user?.email || '');
    setFieldValue('password', '');
    setError('');
  };

  const handleInputChangeAdapter = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    if (error) setError('');
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChangeAdapter}
    />
  );
};
