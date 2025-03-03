import React, { JSX } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Real-time cryptocurrency price monitoring application built with Next.js">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <section className={styles.demoSection}>
          <div className="container">
            <div className={styles.demoRow}>
              <div className={styles.demoCol}>
                <h2>Monitor Crypto Prices in Real-Time</h2>
                <p>
                  Crypto Price Tracker provides up-to-date information on various cryptocurrencies, 
                  including current prices, 24-hour price changes, market capitalization, and trading volumes. 
                  Built with Next.js and the CoinGecko API, it delivers a responsive and intuitive experience 
                  for tracking your favorite digital assets.
                </p>
                <div className={styles.ctaButtons}>
                  <Link
                    className="button button--primary button--md"
                    to="/docs/setup/installation">
                    Installation Guide
                  </Link>
                  <Link
                    className="button button--outline button--secondary button--md"
                    to="https://github.com/mudit004/crypto-price-tracker">
                    GitHub Repository
                  </Link>
                </div>
              </div>
              <div className={styles.demoImage}>
                <img src="/img/dashboard.png" alt="Crypto Price Tracker Dashboard" />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.techSection}>
          <div className="container">
            <h2 className={styles.techTitle}>Built With Modern Technology</h2>
            <div className={styles.techGrid}>
              <div className={styles.techItem}>
                <h3>Next.js</h3>
                <p>Fast and scalable React framework with server-side rendering</p>
              </div>
              <div className={styles.techItem}>
                <h3>React Query</h3>
                <p>Efficient server state management with automatic caching</p>
              </div>
              <div className={styles.techItem}>
                <h3>Tailwind CSS</h3>
                <p>Utility-first CSS framework for rapid UI development</p>
              </div>
              <div className={styles.techItem}>
                <h3>TypeScript</h3>
                <p>Type-safe JavaScript for robust application development</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}