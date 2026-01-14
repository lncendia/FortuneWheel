import React, {useRef, useEffect, useCallback, useLayoutEffect} from 'react';
import {WheelContainer, SpinnerContainer, PrizeItem, Ticker, PrizeText} from './Wheel.styles.ts';
import type {WheelProps} from './types';

const Wheel: React.FC<WheelProps> = ({
                                       prizes,
                                       selectedPrize,
                                       rotation,
                                       isSpinning,
                                       onSpinComplete,
                                     }) => {
  const spinnerRef = useRef<HTMLUListElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  const tickerAnimationRef = useRef<number>(0);
  const currentSliceRef = useRef<number>(0);

  const prizeSlice = 360 / prizes.length;
  const prizeOffset = Math.floor(180 / prizes.length);

  /**
   * Анимация тикера при вращении
   */
  const runTickerAnimation = useCallback(() => {
    if (!spinnerRef.current || !tickerRef.current) return;

    const animation = () => {
      const style = window.getComputedStyle(spinnerRef.current!);
      const matrix = style.transform;

      if (matrix === 'none') return;

      const values = matrix
        .split('(')[1]
        .split(')')[0]
        .split(',')
        .map(Number);

      const [a, b] = values;
      let rad = Math.atan2(b, a);

      if (rad < 0) rad += 2 * Math.PI;

      const angle = Math.round((rad * 180) / Math.PI);
      const slice = Math.floor(angle / prizeSlice);

      if (currentSliceRef.current !== slice) {
        // Сброс и перезапуск анимации тикера
        tickerRef.current!.style.animation = 'none';
        setTimeout(() => (tickerRef.current!.style.animation = ''), 10);
        currentSliceRef.current = slice;
      }

      tickerAnimationRef.current = requestAnimationFrame(animation);
    };

    tickerAnimationRef.current = requestAnimationFrame(animation);
  }, [prizeSlice]);

  /**
   * Запуск анимации при старте вращения
   */
  useLayoutEffect(() => {
    if (isSpinning) {
      requestAnimationFrame(runTickerAnimation);
    }
  }, [isSpinning, runTickerAnimation]);

  /**
   * Обработка завершения вращения
   */
  useEffect(() => {
    const spinner = spinnerRef.current;
    if (!spinner) return;

    const handleTransitionEnd = () => {
      cancelAnimationFrame(tickerAnimationRef.current);
      onSpinComplete();
    };

    spinner.addEventListener('transitionend', handleTransitionEnd);
    return () => spinner.removeEventListener('transitionend', handleTransitionEnd);
  }, [onSpinComplete]);

  return (
    <WheelContainer>
      <SpinnerContainer
        ref={spinnerRef}
        $rotate={rotation}
        $prizes={prizes}
        $isSpinning={isSpinning}
      >
        {prizes.map((prize, index) => {
          const rotate = -prizeSlice * index - prizeOffset;

          return (
            <PrizeItem key={prize.name} $rotate={rotate}>
              <PrizeText $selected={selectedPrize === prize && !isSpinning}>
                {prize.name}
              </PrizeText>
            </PrizeItem>
          );
        })}
      </SpinnerContainer>

      <Ticker ref={tickerRef} $isSpinning={isSpinning}/>
    </WheelContainer>
  );
};

export default Wheel;
