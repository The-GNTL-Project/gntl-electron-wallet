# GNTL Electron (GUI) Wallet
<img src="https://github.com/The-GNTL-Project/Images/raw/master/GNTL_Icon_Round_200x200.png" alt="GNTL Coin">

Copyright (c) 2022-2022, The GNTL Project    
Copyright (c) 2018-2021, The Arqma Network   

## Introduction
GNTL is a private cryptocurrency based on ArQmA.
More information on the project can be found on the [website](https://gntl.cash).  GNTL is an open source project, and we encourage contributions from anyone with something to offer.

## About this project
This is the new electron GUI for GNTL.  It is open source and completely free to use without restrictions, anyone may create an alternative implementation of the GNTL Electron GUI that uses the protocol and network in a compatible manner.

Please submit any changes as pull requests to the development branch, all changes are assessed in the development branch before being merged to master, release tags are considered stable builds for the GUI.

## Compile from Source
### Pre-requisites
- Download latest [GNTL Release](https://github.com/the-gntl-project/gntl/releases/latest)

### Compile
```
nvm use 12.20.2 ##install with nvm install 12.20.2)
npm install -g quasar-cli
git clone https://github.com/the-gntl-project/gntl-electron-wallet
cd gntl-electron-wallet
cp path_to_gntl_binaries/gntld bin/
cp path_to_gntl_binaries/gntl-wallet-rpc bin/
npm install --force
```

#### Development
```
npm run dev
```

### Building
**Note:** This will only build the binaries for the system you run the command on.  Running this command on `linux` will only make `linux` binaries, no `mac` or `windows` binaries.
```
npm run build
```

### Adding language support
Adding a new language is fairly simple.

1. Duplicate the language file `src/i18n/en-us.js` and rename it to the relevant language code.
2. Translate all the strings in that duplicated file. Take note that capitalization matters.
    - The translated string must go in-between the quotes (`""`)
      - E.G `all: "ALL"` -> `all: "ВСЕ"`
    - If possible try and stick to the general string formatting already present.
      - E.G if there is a new line then try and keep that in your translation.
      - The same goes for the pipe character `|`. **DO NOT REMOVE IT**.
    - Please don't translate strings inside `{}` brackets. They are meant as placeholders for other values.
      - Some examples include `{type}` and `{count}`.
      - E.G if you have a string `A {index}` then you may translate it as `B {index}` or `{index} B` depending on how the string makes sense in your language. You are allowed to reposition the placeholders for the string to make sense **BUT DO NOT DELETE OR REPLACE THE PLACEHOLDERS WITH OTHER VALUES**
3. Add the language to the `languages` array in `src/i18n/index.js`. The `flag` property is the [ISO 3166-1-alpha-2 code](https://www.iso.org/obp/ui/#search/code/) of a country.
   - **NOTE: DO NOT ADD THE LANGUAGE TO `export default`**. Dynamic language loading is handled by the application.
4. Add your language locale to Vue Timeago. Add it in `src/plugins/timeago.js` under `locales`.
   - Ref: https://github.com/egoist/vue-timeago#update-locale-globally
5. Submit a PR with your changes.

## Credits
mosu-forge https://github.com/ryo-currency/ryo-wallet

Mikunj https://github.com/loki-project/loki-electron-gui-wallet
