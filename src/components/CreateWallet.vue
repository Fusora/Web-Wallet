<template>
	<div id='createWallet'>
		<div>
      <div id="mnemonic">
			  <div id="generateMnemonic"> Generated Mnemonic </div>
			  <div id="mnemonics"> {{ mnemonic }} </div>
			  <button class="button" v-on:click="generateNewMnemonic()"> Generated New Mnemonic </button>
        <button class="button" v-on:click="generateWallet()"> Generated Wallet </button>
			</div>
      <div v-if="this.showResult === true" id="results">
       <div>Private Key: {{showPrivateKey}} </div>
       <div>Public Key: {{showPublicKey}} </div>
			 <div>Address: {{showAddress}} </div>
      </div>
      <div></div>
		</div>
	</div>
</template>

<script>
import ethers from "ethers";
import axios from "axios";
let randomEntropyBytes = ethers.utils.randomBytes(24);
let mnemonic = ethers.HDNode.entropyToMnemonic(randomEntropyBytes);
export default {
  data: function() {
    return {
      mnemonic,
      showResult: false,
      showAddress: "",
      showPrivateKey: "",
      showPublicKey: "",
    };
  },
  methods: {
    generateNewMnemonic,
    generateWallet,
  }
};

function generateNewMnemonic() {
  let randomEntropyBytes = ethers.utils.randomBytes(32);
  let mnemonic = ethers.HDNode.entropyToMnemonic(randomEntropyBytes);
  this.mnemonic = mnemonic;
}

function generateWallet() {
  try {
    const derivationPath = "m/44'/60'/0'/0";
    const hdNode = ethers.HDNode.fromMnemonic(this.mnemonic).derivePath(derivationPath);
    const walletInstance = new ethers.Wallet(hdNode.privateKey);
    this.showResult = true;
    this.showAddress = walletInstance.address;
    this.showPrivateKey = hdNode.privateKey;
    this.showPublicKey = hdNode.publicKey;

  } catch (err) {}
}
</script>

<style>
#createWallet {
  color: #e0ffff;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}

#mnemonics {
  color: black;
  background-color: #e0ffff;
  height: 50px;
  width: 1200px;
  padding: 10px;
  border-radius: 10px;
}

#generateMnemonic {
  padding: 10px;
}

.button {
  margin: 15px;
  border-radius: 10px;
  padding: 12px 28px;
  background-color: #000060;
  border-color: #005de0;
  color: #e0ffff;
  font-family: "Lato", sans-serif;
  font-size: 15px;
}
</style>
