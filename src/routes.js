import Blockchain from "./components/blockchain/Blockchain";
import Accounts from "./components/Accounts";
import Nodes from "./components/network/Nodes";
import Representatives from "./components/network/Representatives";
import TokensCreate from "./components/tokens/TokenCreate";
import TokensView from "./components/tokens/TokensView";
import Login from "./components/account/Login";
import Account from "./components/account/Account";
import ApplyForDelegate from "./components/account/ApplyForDelegate";
import Transactions from "./components/account/Transactions";
import Votes from "./components/account/Votes";
import Send from "./components/transfer/Send";
import Receive from "./components/transfer/Receive";
import Blocks from "./components/blockchain/Blocks";
import Block from "./components/blockchain/Block";
import SearchBar from "./components/common/SearchBar";

export const routes = [
  {
    path: "/blockchain",
    label: "blockchain",
    component: Blockchain,
    icon: ''
  },
  {
    path: "/network",
    label: "network",
    component: Representatives,
    icon: '',
    routes: [
      {
        label: "nodes",
        path: "/network/nodes",
        component: Nodes,
        icon: ''
      },
      {
        label: "representatives",
        path: "/network/representatives",
        component: Representatives,
        icon: ''
      },
    ]
  },
  {
    path: "/block/:id",
    label: "block",
    component: Block,
    icon: '',
    showInMenu: false,
  },
  {
    path: "/blocks",
    label: "blocks",
    component: Blocks,
    icon: '',
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
        component: TokensView,
        icon: ''
      },
      {
        label: "create",
        path: "/tokens/create",
        component: TokensCreate,
        icon: ''
      }
    ],
    search: {
      label: "search",
      component: SearchBar,
      exclude: "/tokens/create",
      placeholder: "search_token"
    }
  },
  {
    path: "/accounts",
    label: "accounts",
    component: Accounts,
    icon: ''
  },
  {
    path: "/send",
    label: "send",
    component: Send,
    icon: "fa fa-paper-plane mr-2",
    showLoggedIn: true
  },
  {
    path: "/receive",
    label: "receive",
    component: Receive,
    icon: "fa fa-qrcode mr-2",
    showLoggedIn: true
  },
  {
    path: "/login",
    showInMenu: false,
    component: Login,
  },
  {
    path: "/account/transactions",
    showInMenu: false,
    component: Transactions,
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

