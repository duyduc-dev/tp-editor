import { filter, times } from 'lodash';
import { ReactNode, Ref, useImperativeHandle, useState } from 'react';

import ListRender from '../ListRender';

type RenderProps<T> = {
  item: T;
  index: number;
  list: T[];
  isExpand: boolean;
};

type Props<T> = {
  data: T[];
  renderLabel: (p: RenderProps<T>) => ReactNode;
  renderContent: (p: RenderProps<T>) => ReactNode;
  innerRef?: Ref<CollapseRef>;
  className?: string;
  disabled?: boolean;
  defaultExpandIndex?: number[];
  keyExtractor?: (item: T, index: number, thisData: Array<T>) => string;
};

export type CollapseRef = {
  openAll: () => void;
  closeAll: () => void;
  toggleIndex: (index: number) => void;
  openIndex: (index: number) => void;
  closeIndex: (index: number) => void;
};

export type CollapseComponentType<T> = (props: Props<T>) => ReactNode;

const Collapse = <T,>(props: Props<T>) => {
  const {
    innerRef,
    data,
    defaultExpandIndex = [],
    keyExtractor,
    disabled,
    renderContent,
    renderLabel,
  } = props;

  const [indexActives, setIndexActives] = useState<Array<number>>(defaultExpandIndex);

  const isActive = (index: number) => indexActives.includes(index);

  const handleClickLabel = (index: number) => {
    if (disabled) {
      return;
    }
    if (isActive(index)) {
      setIndexActives((prev) => filter(prev, (item) => item !== index));
    } else {
      setIndexActives((prev) => [...prev, index]);
    }
  };

  useImperativeHandle(innerRef, () => ({
    closeAll: () => setIndexActives([]),
    openAll: () => setIndexActives(times(data.length)),
    toggleIndex: (index: number) => {
      if (isActive(index)) {
        const findIndex = indexActives.findIndex((item) => item === index);
        if (findIndex > -1) {
          setIndexActives((prev) => {
            prev.splice(findIndex, 1);
            return prev;
          });
        }
      } else {
        setIndexActives((prev) => [...prev, index]);
      }
    },
    openIndex(index) {
      if (!isActive(index)) {
        setIndexActives((prev) => [...prev, index]);
      }
    },
    closeIndex(index) {
      const findIndex = indexActives.findIndex((item) => item === index);
      if (findIndex > -1) {
        setIndexActives((prev) => {
          prev.splice(findIndex, 1);
          return prev;
        });
      }
    },
  }));

  return (
    <ListRender
      data={data}
      keyExtractor={keyExtractor}
      renderItem={(item, index, thisData) => (
        <>
          <div role="presentation" onClick={() => handleClickLabel(index)}>
            {renderLabel({
              item: item,
              index,
              list: thisData,
              isExpand: isActive(index),
            })}
          </div>
          <div
            style={{
              display: isActive(index) ? 'block' : 'none',
            }}
          >
            {renderContent({
              item: item,
              index,
              list: thisData,
              isExpand: isActive(index),
            })}
          </div>
        </>
      )}
    />
  );
};

export default Collapse;
