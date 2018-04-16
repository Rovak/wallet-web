import Blockchain from "./components/blockchain/Blockchain";
import Accounts from "./components/Accounts";
import Nodes from "./components/network/Nodes";
import Representatives from "./components/network/Representatives";
import TokensCreate from "./components/tokens/TokenCreate";
import TokensView from "./components/tokens/TokensView";
import Login from "./components/account/Login";
import Account from "./components/account/Account";
import ApplyForDelegate from "./components/account/ApplyForDelegate";
import Votes from "./components/account/Votes";
import Send from "./components/transfer/Send";
import Receive from "./components/transfer/Receive";
import Blocks from "./components/blockchain/Blocks";
import Block from "./components/blockchain/Block";

export const routes = [
  {
    path: "/blockchain",
    label: "blockchain",
    component: Blockchain,
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
    path: "/block/:id",
    label: "block",
    component: Block,
    showInMenu: false,
  },
  {
    path: "/blocks",
    label: "blocks",
    component: Blocks,
    showInMenu: false,
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

