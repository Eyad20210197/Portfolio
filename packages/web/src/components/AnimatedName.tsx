'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger, splitText } from 'animejs';

export default function AnimatedName() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    const { chars } = splitText(headingRef.current, {
      chars: true,
      words: false,
    });

    animate(chars, {
      y: [
        { to: '-2.5rem', ease: 'outExpo', duration: 600 },
        { to: 0, ease: 'outBounce', duration: 800, delay: 100 },
      ],
      rotate: {
        from: '-1turn',
      },
      delay: stagger(50),
      loop: true,
      loopDelay: 1200,
      ease: 'inOutCirc',
    });
  }, []);

  return (
    <h1
      ref={headingRef}
      className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
    >
      Eyad Aboelftoh
    </h1>
  );
}
