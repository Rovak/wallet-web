<h2 align="center">
    <table align="center">
        <tr>
            <td>Idiomas :</td>
            <td><a href="./README.md"><img src="http://flags.fmcdn.net/data/flags/w580/gb.png" width="30" height="20"></a></td>
            <td><a href="./README_FR.md"><img src="http://flags.fmcdn.net/data/flags/w580/fr.png" width="30" height="20"></a></td>
            <td><a href="./README_BR.md"><img src="http://flags.fmcdn.net/data/flags/w580/br.png" width="30" height="20"></a></td>
        </tr>
    </table>
</h2>

<h1 align="center">
  wallet-web
  <br>
</h1>

<h4 align="center">
  Carteira digital para <a href="https://tron.network">Protocolo Tron</a>
</h4>

<p align="center">
  <a href="https://join.slack.com/t/tronfoundation/shared_invite/enQtMzAzNzg4NTI4NDM3LTAyZGQzMzEzMjNkNDU0ZjNkNTA4OTYyNTA5YWZmYjE3MTEyOWZhNzljNzQwODM3NDQ0OWRiMTIyMDhlYzgyOGQ">
    <img src="https://img.shields.io/badge/chat-on%20slack-brightgreen.svg">
  </a>
    
  <a href="https://travis-ci.org/tronprotocol/wallet-web">
    <img src="https://travis-ci.org/tronprotocol/wallet-web.svg?branch=develop">
  </a>
  
  <a href="https://github.com/tronprotocol/wallet-web/issues">
    <img src="https://img.shields.io/github/issues/tronprotocol/wallet-web.svg">
  </a>
  
  <a href="https://github.com/tronprotocol/wallet-web/pulls">
    <img src="https://img.shields.io/github/issues-pr/tronprotocol/wallet-web.svg">
  </a>
  
  <a href="https://github.com/tronprotocol/wallet-web/graphs/contributors"> 
    <img src="https://img.shields.io/github/contributors/tronprotocol/wallet-web.svg">
  </a>
  
  <a href="LICENSE">
    <img src="https://img.shields.io/github/license/tronprotocol/wallet-web.svg">
  </a>
</p>

<p align="center">
  <a href="#how-to-use">Como utilizar</a> •
  <a href="#links">Links</a> •
  <a href="http://wiki.tron.network">Wiki</a> •
  <a href="#community">Comunidade</a>
</p>

# Como Utilizar

## Requisitos

* Node v9.8.0
* Yarn

## Funcionamento

```bash
> yarn install
> yarn start
```

A carteira então pode ser acessada através do endereço: [http://localhost:3000](http://localhost:3000)

## Alterando o URL da API padrão

Por padrão, o Explorer se conectará à https://tronscan.io para obter os dados. 

Quando executada localmente, o URL pode ser alterado definindo a variável de ambiente `API_URL` 

```bash
> API_URL=http://127.0.0.0:8088 yarn start
```

Isto deve alterar a variável API_URL, apontando para o serviço local `wallet-cli`

# Comunidade

* [Slack](https://join.slack.com/t/tronfoundation/shared_invite/enQtMzAzNzg4NTI4NDM3LTAyZGQzMzEzMjNkNDU0ZjNkNTA4OTYyNTA5YWZmYjE3MTEyOWZhNzljNzQwODM3NDQ0OWRiMTIyMDhlYzgyOGQ)
* [Telegram](https://t.me/tronnetworkEN)

# Links

* [Website](https://tron.network/)
* [Documentação](https://github.com/tronprotocol/wallet-web)
* [Blog](https://tronprotocol.github.io/tron-blog/)
* [TRON Wiki](http://wiki.tron.network/en/latest/)

# Projetos

* [TRON Protocol](https://github.com/tronprotocol/protocol)
* [Wallet-CLI](https://github.com/tronprotocol/wallet-cli)
