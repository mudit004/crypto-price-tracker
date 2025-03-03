# Crypto Tracker

A comprehensive cryptocurrency tracking application with integrated documentation built on Docusaurus.

## Overview

Crypto Tracker is a modern, responsive web application that provides real-time tracking, analytics, and insights for cryptocurrency markets. The project consists of two main components:

1. **Crypto Tracker App** - A feature-rich dashboard for monitoring cryptocurrency prices, trends, and market data
2. **Documentation Portal** - Built with Docusaurus, providing comprehensive guides and API documentation

## Features

- Real-time cryptocurrency price tracking
- Comprehensive API for developers
- Mobile-responsive design
- Thorough documentation with guides, API references, and examples

## Project Structure

```
crypto-tracker/
├── app/            
├── docs/           
└── README.md       
```

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- npm (v8+) or yarn
- Git

### Setting Up the Crypto Tracker App

1. Clone the repository
   ```bash
   git clone https://github.com/mudit004/crypto-price-tracker.git
   cd crypto-price-tracker/app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Build for production
   ```bash
   npm run build
   ```

### Setting Up the Documentation (Docusaurus)

1. Navigate to the docs directory
   ```bash
   cd ../docs
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the documentation development server
   ```bash
   npm start
   ```

4. Build the documentation site
   ```bash
   npm run build
   ```

## Deployment

### Deploying the App

The app can be deployed to any static hosting service or containerized environment:

```bash
cd app
npm run build
# Deploy the contents of the 'build' directory
```

### Deploying the Documentation

Docusaurus sites can be easily deployed to GitHub Pages, Netlify, Vercel, or other static hosting services:

```bash
cd docs
npm run build
# Deploy the contents of the 'build' directory
```

## API Documentation

Comprehensive API documentation is available in the Docusaurus site under `/api`. 

## Acknowledgments

- [CoinGecko API](https://www.coingecko.com/en/api) for cryptocurrency data
- [Docusaurus](https://docusaurus.io/) for the documentation framework
- All open-source libraries used in this project