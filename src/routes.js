import Blockchain from "./components/blockchain/Blockchain";
import Transactions from "./components/blockchain/Transactions";
import Accounts from "./components/Accounts";
import Dashboard from "./components/Dashboard";
import Network from "./components/network/Network";
import Nodes from "./components/network/Nodes";
import Representatives from "./components/network/Representatives";
import Blocks from "./components/blockchain/Blocks";


export const routes = [
  {
    path: "/blockchain",
    label: "Blockchain",
    component: Blockchain,
    routes: [
      {
        label: "Transactions",
        path: "/blockchain/transactions",
        component: Transactions
      },
      {
        label: "Blocks",
        path: "/blockchain/blocks",
        component: Blocks
      },
    ]
  },
  // {
  //   path: "/network",
  //   label: "Network",
  //   component: Network,
  //   routes: [
  //     {
  //       label: "Nodes",
  //       path: "/network/nodes",
  //       component: Nodes
  //     },
  //     {
  //       label: "Representatives",
  //       path: "/network/representatives",
  //       component: Representatives
  //     },
  //   ]
  // },
  {
    path: "/accounts",
    label: "Accounts",
    component: Accounts
  },
  {
    path: "/",
    label: "Dashboard",
    component: Blockchain,
  },
];

