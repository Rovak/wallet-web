import Blockchain from "./components/blockchain/Blockchain";
import Transactions from "./components/blockchain/Transactions";
import Accounts from "./components/Accounts";
import Nodes from "./components/network/Nodes";
import Representatives from "./components/network/Representatives";
import Blocks from "./components/blockchain/Blocks";
import TokensCreate from "./components/tokens/TokensCreate";
import TokensView from "./components/tokens/TokensView";


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
  {
    path: "/network",
    label: "Network",
    component: Representatives,
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
    path: "/tokens",
    label: "Tokens",
    component: TokensView,
    routes: [
      {
        label: "View",
        path: "/tokens/view",
        component: TokensView
      },
      {
        label: "Create",
        path: "/tokens/create",
        component: TokensCreate
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
    showInMenu: false,
    component: Blockchain,
  },
];

