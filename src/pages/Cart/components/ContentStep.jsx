import { useContext } from 'react';
import Contents from '@/pages/Cart/components/contents/Contents';
import Checkout from '@/pages/Cart/components/Checkout/Checkout';
import { StepperContext } from '@/contexts/SteperProvider';

function ContentStep() {
  const { currentStep } = useContext(StepperContext);

  const handleRenderContent = () => {
    switch (currentStep) {
      case 1:
        return <Contents />;
      case 2:
        return (
          <>
            <Checkout />
          </>
        );
      case 3:
        return <>step 3</>;
    }
  };
  return <>{handleRenderContent()}</>;
}

export default ContentStep;
