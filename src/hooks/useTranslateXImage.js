import React, { useEffect, useRef, useState } from 'react';
import useScrollHandling from '@/hooks/useScrollHandling';

const useTranslateXImage = () => {
    const { scrollPosition, scrollDriction } = useScrollHandling();
    const [translateXPosition, setTranslateXPosition] = useState(30);

    const handleTranslateX = () => {
        if (scrollDriction === 'down' && scrollPosition >= 3300) {
            setTranslateXPosition(
                translateXPosition <= 0 ? 0 : translateXPosition - 1
            );
        } else if (scrollDriction === 'up') {
            setTranslateXPosition(
                translateXPosition >= 30 ? 30 : translateXPosition + 1
            );
        }
    };

    useEffect(() => {
        handleTranslateX();
    }, [scrollPosition]);

    return {translateXPosition}
};
export default useTranslateXImage;
