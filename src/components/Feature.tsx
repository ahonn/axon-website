import { m, Variants } from 'framer-motion';
import React from 'react';
import useScreenSize from 'use-screen-size';
import featureBackground1 from '../assets/img/webp/feature-background1.webp';
import featureBackground2 from '../assets/img/webp/feature-background2.webp';
import { IFeature } from '../config';

export interface IFeatureProps {
  feature: IFeature;
  index: number;
}

const backgrounds = [
  featureBackground1,
  featureBackground2,
  featureBackground1,
  featureBackground2,
];

const descriptVariants: Variants = {
  offscreen: {
    opacity: 0,
    translateY: -20,
  },
  onscreen: {
    opacity: 1,
    translateY: 0,
    transition: { ease: 'easeOut', duration: 1, delay: 0.2 },
  },
};

const imageVariants: Variants = {
  offscreen: {
    opacity: 0,
    translateY: -20,
  },
  onscreen: {
    opacity: 1,
    translateY: 0,
    transition: { ease: 'easeOut', duration: 1 },
  },
};

function Feature(props: IFeatureProps) {
  const { feature, index } = props;
  const size = useScreenSize();
  const image = React.useMemo(
    () => (
      <img
        src={feature.icon}
        className="scale-110"
        loading="lazy"
        decoding="async"
      />
    ),
    [feature.icon],
  );

  return (
    <m.div
      className={`flex justify-center items-center sm:items-start flex-col-reverse px-6 sm:px-0 mb-16 sm:mb-0 basis-3
      ${index % 2 === 0 ? `sm:flex-row-reverse` : `sm:flex-row`}`}
      initial={size.screen === 'xs' ? 'onscreen' : 'offscreen'}
      whileInView={size.screen === 'xs' ? undefined : 'onscreen'}
      viewport={{ once: true, amount: 0.6 }}
    >
      <m.div
        className="w-2/3 sm:w-full basis-4/12 -mt-8 sm:mt-0"
        variants={imageVariants}
      >
        {image}
      </m.div>
      <m.div
        className="flex bg-contain relative basis-8/12 z-30"
        variants={descriptVariants}
      >
        <img
          className="hidden absolute top-0 left-0 w-full lg:block"
          src={backgrounds[index]}
        />
        <div className="px-8 sm:pl-20 sm:py-12 sm:pr-24 bg-transparent
          sm:bg-white sm:backdrop-blur-[2px] sm:bg-opacity-50 sm:rounded-md
          lg:bg-transparent lg:backdrop-blur-none lg:bg-opacity-100 lg:rounded-none">
          <div className="relative mb-[25px]">
            <h2 className="text-[18px] font-alfarn-2 font-bold leading-7">
              {feature.title}
            </h2>
            <div
              className="absolute -bottom-[3px] left-0 w-10/12 border-b-[3px]"
              style={{ borderColor: feature.color }}
            />
          </div>
          <p className="relative font-neue-kabel font-medium leading-6">
            <span
              className="absolute -left-9 -top-4 text-7xl font-serif"
              style={{ color: feature.color }}
            >
              “
            </span>
            {feature.description}
            <span
              className="absolute -right-6 -bottom-12 text-7xl font-serif"
              style={{ color: feature.color }}
            >
              ”
            </span>
          </p>
        </div>
      </m.div>
    </m.div>
  );
}

export default Feature;
