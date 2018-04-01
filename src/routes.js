import Blockchain from "./components/blockchain/Blockchain";
import Accounts from "./components/Accounts";
import Nodes from "./components/network/Nodes";
import Representatives from "./components/network/Representatives";
import TokensCreate from "./components/tokens/TokensCreate";
import TokensView from "./components/tokens/TokensView";
import Login from "./components/account/Login";
import Account from "./components/account/Account";
import ApplyForDelegate from "./components/account/ApplyForDelegate";
import Votes from "./components/account/Votes";
import Send from "./components/Send";
import Receive from "./components/Receive";

export const routes = [
  {
    path: "/blockchain",
    label: "blockchain",
    component: Blockchain,
    // routes: [
    //   {
    //     label: "Transactions",
    //     path: "/blockchain/transactions",
    //     component: Transactions
    //   },
    //   {
    //     label: "Blocks",
    //     path: "/blockchain/blocks",
    //     component: Blocks
    //   },
    // ]
  },
  {
    path: "/network",
    label: "network",
    component: Representatives,
    routes: [
      {
        label: "nodes",
        path: "/network/nodes",
        component: Nodes
      },
      {
        label: "representatives",
        path: "/network/representatives",
        component: Representatives
      },
    ]
  },
  {
    path: "/tokens",
    label: "tokens",
    component: TokensView,
    routes: [
      {
        label: "view",
        path: "/tokens/view",
        component: TokensView
      },
      {
        label: "create",
        path: "/tokens/create",
        component: TokensCreate
      },
    ]
  },
  {
    path: "/accounts",
    label: "accounts",
    component: Accounts
  },
  {
    path: "/send",
    label: "send",
    component: Send
  },
  {
    path: "/receive",
    label: "receive",
    component: Receive
  },
  {
    path: "/login",
    showInMenu: false,
    component: Login,
  },
  {
    path: "/account/votes",
    showInMenu: false,
    component: Votes,
  },
  {
    path: "/account/apply-for-delegate",
    showInMenu: false,
    component: ApplyForDelegate,
  },
  {
    path: "/account",
    showInMenu: false,
    component: Account,
  },
  {
    path: "/",
    label: "Dashboard",
    showInMenu: false,
    component: Blockchain,
  },
];

