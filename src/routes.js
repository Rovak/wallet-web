import Blockchain from "./components/blockchain/Blockchain";
import Transactions from "./components/blockchain/Transactions";
import Accounts from "./components/Accounts";
import Dashboard from "./components/Dashboard";
import Network from "./components/network/Network";
import Nodes from "./components/network/Nodes";
import Representatives from "./components/network/Representatives";


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
    ]
  },
  {
    path: "/network",
    label: "Network",
    component: Network,
    routes: [
      {
        label: "Nodes",
        path: "/network/nodes",
        component: Nodes
      },
      {
        label: "Representatives",
        path: "/network/representatives",
        component: Representatives
      },
    ]
  },
  {
    path: "/accounts",
    label: "Accounts",
    component: Accounts
  },
  {
    path: "/",
    label: "Dashboard",
    component: Dashboard,
  },
];

