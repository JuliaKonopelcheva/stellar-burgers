import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../services/hooks';
import { logout } from '../../services/slices/auth-slice';
import { logoutApi } from '../../utils/burger-api';
import { deleteCookie } from '../../utils/cookie';
import { ProfileMenuUI } from '@ui';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (e) {}
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch(logout());
    navigate('/login');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
