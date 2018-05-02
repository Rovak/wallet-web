<h2 align="center">
    <table align="center">
        <tr>
            <td>Langues :</td>
            <td><a href="./README.md"><img src="http://flags.fmcdn.net/data/flags/w580/gb.png" width="30" height="20"></a></td>
            <td><a href="./README_FR.md"><img src="http://flags.fmcdn.net/data/flags/w580/fr.png" width="30" height="20"></a></td>
        </tr>
    </table>
</h2>

<h1 align="center">
  wallet-web
  <br>
</h1>

<h4 align="center">
  Portefeuille pour le <a href="https://tron.network">protocole Tron</a>
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
  <a href="#how-to-use">Comment utiliser</a> •
  <a href="#links">Liens</a> •
  <a href="http://wiki.tron.network">Wiki</a> •
  <a href="#community">Communauté</a>
</p>

# Comment l'utiliser

## Exigences

* Node v9.8.0
* Yarn

## Fonctionnement

```bash
> yarn install
> yarn start
```

Le portefeuille devra se lancer par la suite sur [http://localhost:3000](http://localhost:3000)

## Changer l'URL par défaut de l'API

Par défaut, l'explorateur se connectera à https://tronscan.io pour récupérer ses données. 

Lors du développement en local, l'URL peut être modifiée en définissant la variable d'environnement `API_URL`

```bash
> API_URL=http://127.0.0.0:8088 yarn start
```

Cela devrait changer le API_URL pour pointer vers votre serveur `wallet-cli` en local

# Communauté

* [Slack](https://join.slack.com/t/tronfoundation/shared_invite/enQtMzAzNzg4NTI4NDM3LTAyZGQzMzEzMjNkNDU0ZjNkNTA4OTYyNTA5YWZmYjE3MTEyOWZhNzljNzQwODM3NDQ0OWRiMTIyMDhlYzgyOGQ)
* [Telegram](https://t.me/tronnetworkEN)

# Liens

* [Website](https://tron.network/)
* [Documentation](https://github.com/tronprotocol/wallet-web)
* [Blog](https://tronprotocol.github.io/tron-blog/)
* [TRON Wiki](http://wiki.tron.network/en/latest/)

# Projets

* [TRON Protocol](https://github.com/tronprotocol/protocol)
* [Wallet Client](https://github.com/tronprotocol/wallet-cli)
