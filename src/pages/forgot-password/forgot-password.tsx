import { FC, useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setError(null);
    setSuccess(false);
    forgotPasswordApi({ email })
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        setSuccess(true);
        navigate('/reset-password', { replace: true });
      })
      .catch((err) => setError(err));
  };

  return (
    <ForgotPasswordUI
      errorText={error?.message}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
