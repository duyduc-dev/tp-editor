import { MouseEventHandler, useState } from 'react';

import { RippleContainer } from './styled';
import { RippleContainerProps, RippleItemType } from './types';
import useDebouncedRippleCleanUp from './useDebouncedRippleCleanUp';

const Ripple = (props: RippleContainerProps) => {
  const { duration, color } = props;
  const [rippleArray, setRippleArray] = useState<RippleItemType[]>([]);

  useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
    setRippleArray([]);
  });

  const addRipple: MouseEventHandler<HTMLDivElement> = (event) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();
    const size =
      rippleContainer.width > rippleContainer.height
        ? rippleContainer.width
        : rippleContainer.height;
    const x = event.pageX - rippleContainer.x - size / 2;
    const y = event.pageY - rippleContainer.y - size / 2;
    const newRipple = {
      x,
      y,
      size,
    };

    setRippleArray((prev) => [...prev, newRipple]);
  };

  return (
    <RippleContainer $duration={duration} $color={color} onMouseDown={addRipple}>
      {rippleArray.length > 0 &&
        rippleArray.map((ripple, index) => {
          return (
            <span
              key={'span' + index}
              style={{
                top: ripple.y,
                left: ripple.x,
                width: ripple.size,
                height: ripple.size,
              }}
            />
          );
        })}
    </RippleContainer>
  );
};

export default Ripple;
