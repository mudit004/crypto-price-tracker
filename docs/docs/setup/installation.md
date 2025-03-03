---
sidebar_position: 1
---

# Installation Guide

This guide will walk you through setting up the Crypto Price Tracker application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher) or yarn (v1.22.0 or higher)
- Git

## Getting the Code

First, clone the repository to your local machine:

```bash
git clone https://github.com/mudit004/crypto-price-tracker.git
cd crypto-price-tracker
```

## Installing Dependencies

Install all required dependencies using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_COINGECKO_API_URL=https://api.coingecko.com/api/v3
```

## Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

The application will be available at `http://localhost:3000`.

### Production Build

To create a production build:

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

## Running Tests

Execute the test suite:

```bash
npm test
```

## Linting

Run linting checks:

```bash
npm run lint
```

## Troubleshooting

### API Rate Limiting

The CoinGecko API has rate limits for free tier usage. If you encounter issues with API requests, it might be due to rate limiting. Consider implementing caching or reducing the refresh interval.

### Build Errors

If you encounter build errors related to TypeScript, try:

```bash
npm run typecheck
```

to identify type-related issues.