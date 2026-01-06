import { StepperProvider } from '@/contexts/SteperProvider';
import Steps from '@/pages/Cart/components/steps/Steps';
import MyFooter from '@components/Footer/Footer';
import MyHeader from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import ContentStep from '@/pages/Cart/components/ContentStep';
import styles from './styles.module.scss';
import { use, useEffect } from 'react';

function Cart() {
  const { container } = styles;

  return (
    <>
      <MyHeader />
      <div className={container}>
        <Steps />
        <MainLayout>
          <ContentStep />
        </MainLayout>
      </div>
      <MyFooter />
    </>
  );
}

export default Cart;
