import { animated, useSpring } from '@react-spring/web';
import HeadlessTippy, { type TippyProps } from '@tippyjs/react/headless';
import { forwardRef, ReactNode, useImperativeHandle, useRef, useState } from 'react';

type Props = {
  children?: ReactNode | ((params: { visible: boolean }) => ReactNode);
  renderClassName?: string;
  onChange?: (visible: boolean) => void;
} & Omit<TippyProps, 'children'>;

export type PopoverRef = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const usePopoverRef = () => useRef<PopoverRef>(null);

const Popover = forwardRef<PopoverRef, Props>(
  ({ children, render, renderClassName, onMount, onHide, onChange, ...props }, ref) => {
    const initialStyles = { opacity: 0, transform: 'translateY(-10px)' };
    const config = { tension: 300, friction: 15 };
    const [propSpring, apis] = useSpring(() => initialStyles);
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => {
        setVisible(true);
        onChange?.(true);
      },
      close: () => {
        setVisible(false);
        onChange?.(false);
      },
      toggle: () => {
        setVisible((p) => !p);
        onChange?.(!visible);
      },
    }));

    const handlePopupMount: TippyProps['onMount'] = (e) => {
      apis.start({
        opacity: 1,
        transform: 'translateY(0)',
        onRest: () => {},
        config,
      });
      onMount?.(e);
    };

    const handlePopupHide = ({ unmount }: any) => {
      apis.start({
        ...initialStyles,
        onRest: unmount,
        config: { ...config, clamp: true },
      });
      onHide?.({ unmount } as any);
    };

    const handleRender: TippyProps['render'] = (attrs, content, instance) => {
      return (
        <animated.div style={propSpring} className={renderClassName} {...attrs}>
          {typeof render === 'function' ? render?.(attrs, content, instance) : render}
        </animated.div>
      );
    };

    return (
      <HeadlessTippy
        visible={visible}
        // @ts-ignore
        appendTo={() => document.body}
        placement="bottom"
        interactive
        animation={true}
        popperOptions={{
          strategy: 'fixed',
          ...props?.popperOptions,
        }}
        render={handleRender}
        {...props}
        onMount={handlePopupMount}
        onHide={handlePopupHide}
      >
        <div>{typeof children === 'function' ? children({ visible }) : children}</div>
      </HeadlessTippy>
    );
  },
);

Popover.displayName = 'Popover-comp';

export default Popover;
