import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
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

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

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
    setFormValue((prev) => ({ ...prev, password: '' }));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );

  return null;
};
