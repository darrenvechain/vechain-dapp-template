# vechain-dapp-template

This is a template for building a dApp on the VeChainThor blockchain.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [Docker](https://docs.docker.com/install/)
  - For running Thor Solo, Thor Insights and Inspector.
- [VeWorld](https://www.veworld.net/)
  - The VeChainThor wallet for interacting with the dApp.
  - Use this mnemonic to access the thor solo
    wallet: `denial kitchen pet squirrel other broom bar gas better priority spoil cross`
  - Navigate to the network settings and add the thor solo node: `http://localhost:8669`

### Installation

1. Clone the repository

2. Install dependencies `yarn install`

3. Start the development environment `yarn dev`

### Setup

| Service       | URL                                            |
| ------------- | ---------------------------------------------- |
| Frontend DApp | [http://localhost:3000](http://localhost:3000) |
| Inspector     | [http://localhost:3001](http://localhost:3001) |
| Insights      | [http://localhost:3002](http://localhost:3002) |
| Thor Solo     | [http://localhost:8669](http://localhost:8669) |
