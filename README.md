# NeoMon - Neo Network Status Monitor

## Overview:

NeoMon is a tool for monitoring the status of popular RPC Nodes and REST endpoints on the Neo network.

## Install, Build and Run

```cmd
npm install
```

```cmd
bower install
```

```cmd
gulp serve
```

## Manage Endpoints

Endpoints can be configured by editing the following JSON files

```
src/assets/json/mainnet.json
```

```
src/assets/json/testnet.json
```

## Deploy

Neomon is hosted on GitHub pages by publishing to /docs folder. GitHub Settings are configured to use the custom domain: monitor.cityofzion.io

To publish changes
```cmd
gulp publish
```

This command will update the /docs folder with a deployable version of the application. When the changes are merged into master branch they will immediately show up on http://monitor.cityofzion.io



## Common questions

The following is a list of common problems that developers may have while developing an application on the Neo network.

### Is an endpoint up or down? 

Developers will not be able to communicate with the Neo Network if an endpoint is down. They can use NeoMon to decide which is the best endpoint to use based on whether the endpoint is up and its current block height.

### Is the endpoint fully synced?  

If transactions are being sent to a Node with the intention of them being relayed to the network, the confirmations will not be seen until the Node is fully synced. There is also a risk that the transactions will be rejected by other Nodes as the transactions being sent may be based on outdated information.

## Feature Requests

Do you see any features missing or have any ideas for improvements, you can add feature requests and bugs under Issues.
