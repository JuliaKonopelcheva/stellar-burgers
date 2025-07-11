import { FC } from 'react';

import styles from './profile-orders.module.css';

import { ProfileOrdersUIProps } from './type';
import { ProfileMenu, OrdersList } from '@components';

export const ProfileOrdersUI: FC<ProfileOrdersUIProps> = ({
  orders,
  loading
}) => (
  <main className={`${styles.main}`}>
    <div className={`mt-30 mr-15 ${styles.menu}`}>
      <ProfileMenu />
    </div>
    <div className={`mt-10 ${styles.orders}`}>
      {loading ? (
        <div className='text text_type_main-large mt-10'>
          Загрузка заказо...
        </div>
      ) : (
        <OrdersList orders={orders} />
      )}
    </div>
  </main>
);
