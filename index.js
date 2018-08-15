const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const util = require('util')
const ethers = require('ethers')
const provider = ethers.providers.getDefaultProvider('ropsten')
const walletDirectory = "wallets/"
const app = express()


if (!fs.existsSync(walletDirectory)) {
  fs.mkdirSync(walletDirectory)
}

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
// app.set('view engine', 'ejs')
// app.engine('html', require('ejs').renderFile)

app.get('/', (req, res) => {
  // res.render(__dirname + '/views/test.html')
  res.sendFile(path.join(__dirname + '/views/test.html'));
})

app.get('/generateMnemonic', (req, res) => {
  let randomEntropyBytes = ethers.utils.randomBytes(16);
  let mnemonic = ethers.HDNode.entropyToMnemonic(randomEntropyBytes);
  res.json({
    mnemonic
  });
})

app.get('/createWallet', (req, res) => {
  let password = req.body.password.toString();
  let confirmPassword = req.body.confirmPassword.toString();
  let mnemonic = req.body.mnemonic;

  // let password = '123'
  // let confirmPassword = '123'
  // let mnemonic = "steak man prize copy spice sick fatal scheme solve rent nurse logic";

  if (password !== confirmPassword) {
    res.json({
      errorMsg: 'Passwords are not match',
    });
    return;
  } else {
    let wallet = ethers.Wallet.fromMnemonic(mnemonic);
    wallet.encrypt(password).then((jsonWallet) => {
      let filename = "FUSORA_WALLET_" + Math.ceil(Math.random(10000, 10000) * 10 ** 20) + ".json"
      fs.writeFile(walletDirectory + filename, (jsonWallet), 'utf-8', (err) => {
        if (err) {

        } else {
          res.download(__dirname + "/" + walletDirectory + filename, filename, (x) => {
            fs.unlinkSync(__dirname + "/" + walletDirectory + filename)
          });

        }
      })
    })
  }
})

app.get('/test', (req, res) => {})

app.listen(3000, () => {
  console.log('is listening')
})