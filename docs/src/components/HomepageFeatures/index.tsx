import React, { JSX } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Real-time Price Updates',
    Svg: require('@site/static/img/realtime-icon.svg').default,
    description: (
      <>
        Get the latest cryptocurrency prices refreshed automatically every 60 seconds.
        Manual refresh option available for immediate updates.
      </>
    ),
  },
  {
    title: 'Search Functionality',
    Svg: require('@site/static/img/search-icon.svg').default,
    description: (
      <>
        Easily find specific cryptocurrencies by name or symbol with debounced
        search and URL parameter tracking for shareable results.
      </>
    ),
  },
  {
    title: 'Responsive Design',
    Svg: require('@site/static/img/responsive-icon.svg').default,
    description: (
      <>
        Works seamlessly on both desktop and mobile devices with a clean,
        grid-based layout that adjusts based on screen size.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}