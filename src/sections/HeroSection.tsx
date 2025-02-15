import React from 'react';
import Logo from '../components/Logo';
import Button from '../components/Button';
import Mask, { IMaskProps } from '../components/Mask';
import heroBackground from '../assets/img/webp/hero-background.webp';
import topMaskImage from '../assets/img/webp/top-mask.webp';
import bottomMaskImage from '../assets/img/webp/bottom-mask.webp';
import { m, useMotionValueEvent, useScroll } from 'framer-motion';
import Brand from '../components/Brand';
import useScrollSnap from '../hooks/useScrollSnap';
import { useResourceLoad } from '../hooks/useResourceLoad';

const Starting = React.lazy(() => import('../components/Starting'));

const HERO_TRANSITION = { ease: 'easeOut', duration: 1 };
const BUTTON_TRANSITION = { duration: 0.3, delay: 0.7 };

function HeroSection() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const { setScrollSnap } = useScrollSnap();
  const { loaded } = useResourceLoad();

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (progress === 0) {
      setScrollSnap(true);
    }
    if (progress === 1) {
      setScrollSnap(false);
    }
  });

  const topMaskAnimate: IMaskProps['animate'] = React.useCallback(
    () => {
      return {
        top: 0,
        transition: HERO_TRANSITION,
      };
    },
    [],
  );

  const bottomMaskAnimate: IMaskProps['animate'] = React.useCallback(
    () => {
      return {
        bottom: 0,
        transition: HERO_TRANSITION,
      };
    },
    [],
  );

  return (
    <div
      className={`relative bg-cover sm:bg-fixed`}
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <div className="sticky top-0 w-screen h-screen flex justify-center" style={{ opacity: loaded ? 100 : 0 }}>
        <div className="absolute top-logo-height md:top-0 w-full sm:w-9/12 md:w-7/12 lg:w-7/12 xl:w-5/12 2xl:w-4/12 h-full">
          <Mask
            src={topMaskImage}
            containerClassName="absolute top-0 h-full w-full flex flex-col justify-center"
            animate={topMaskAnimate}
          />
          <Mask
            src={bottomMaskImage}
            containerClassName="absolute -top-logo-height md:top-0 h-full w-full flex flex-col justify-center"
            animate={bottomMaskAnimate}
          />
        </div>

        <div className="absolute top-0 left-0 flex flex-row items-center w-full sm:h-auto bg-axon-background md:bg-transparent bg-opacity-75">
          <div className="w-logo-width h-logo-height ml-[5px] md:ml-[30px] md:mt-[10px]">
            <Logo />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full flex flex-row justify-center z-20">
          <m.div
            className="flex flex-col sm:flex-row mb-10 sm:mb-12 2xl:mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: BUTTON_TRANSITION }}
          >
            <Button text="Open Docsite" href="https://docs.axonweb3.io/" />
            <div className="w-[30px] h-[20px]" />
            <Button text="Open in GitHub" href="https://github.com/axonweb3" />
          </m.div>
        </div>
      </div>

      <div style={{ marginTop: '-100vh', opacity: loaded ? 100 : 0 }} ref={ref}>
        <section className="w-screen h-screen flex justify-center -mt-screen snap-center">
          <div className="flex flex-col h-full justify-center items-center pt-8 sm:pt-0">
            <Brand />
          </div>
        </section>
        <section
          className="w-screen h-screen hidden sm:flex justify-center snap-center"
          style={{ marginTop: '-50vh' }}
        >
          <div className="flex flex-col h-full w-full justify-center items-center pt-8 sm:pt-0">
            <React.Suspense fallback={false}>
              <Starting />
            </React.Suspense>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HeroSection;
