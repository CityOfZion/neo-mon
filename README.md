# NeoMon - Neo Network Status Monitor

## Overview:

NeoMon is a tool for monitoring the status of popular RCP Nodes and REST endpoints.

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

## Common questions

The following are a list of common questions that come up during development.

### Is an endpoint up or down? 

Developers will not be able to communicate with the Neo Network if an endpoint is down. They can use this tool to decide which is the best endpoint to use based on whether the endpoint is up and its current block height.

### Is the endpoint fully synced?  

If you are sending transactions to a Node with the intention of it being relayed to the network, you will not be able to see confirmations until the Node is fully synced. There is also a risk that the transactions will be rejected by other Nodes as the transactions being sent are based on outdated information.

## Feature Requests

Do you see any features missing or have ideas for improvements, you can add them to the Project:  [Milestone 1](https://github.com/CityOfZion/neo-mon/projects/1)
Adding new endpoints to NeoMon is manual at the moment. You can request in Slack, Trello or use the Project link above. 
