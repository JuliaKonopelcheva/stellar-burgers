import { FC, ReactElement } from 'react';
import { useAppSelector } from '../../services/hooks';
import {
  selectUser,
  selectIsAuthChecked
} from '../../services/slices/auth-slice';
import { Navigate, useLocation } from 'react-router-dom';

interface IProtectedRouteProps {
  onlyUnAuth?: boolean;
  component: ReactElement;
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({
  onlyUnAuth = false,
  component
}) => {
  // Данные о пользователе из Redux store
  const user = useAppSelector(selectUser);
  const isAuthChecked = useAppSelector(selectIsAuthChecked);
  const location = useLocation();

  // Если проверка авторизации еще не завершена, рендер не происходит
  if (!isAuthChecked) {
    return null;
  }

  // Для маршрутов только для неавторизованных пользователей
  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  // Для защищенных маршрутов
  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return component;
};
