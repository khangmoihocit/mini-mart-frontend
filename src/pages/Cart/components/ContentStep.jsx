import { useContext } from 'react';
import Contents from '@/pages/Cart/components/contents/Contents';
import Checkout from '@/pages/Cart/components/Checkout/Checkout';
import OrderSuccess from '@/pages/Cart/components/OrderSuccess/OrderSuccess';
import { StepperContext } from '@/contexts/SteperProvider';

function ContentStep() {
  const { currentStep } = useContext(StepperContext);

  const handleRenderContent = () => {
    switch (currentStep) {
      case 1:
        return <Contents />;
      case 2:
        return <Checkout />;
      case 3:
        return <OrderSuccess />;
      default:
        return <Contents />;
    }
  };
  return <>{handleRenderContent()}</>;
}

export default ContentStep;
