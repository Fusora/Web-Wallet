<template>
	<div>
		<div> Import your JSON Wallet </div>
    <input type="file" v-on:change="handleFileUpload">
    <div>Password :</div>
		<input v-model="password" placeholder="Password">
  	<button v-on:click="loadWallet()"> Generate Wallet </button>
	</div>
</template>

<script>
import ethers from "ethers";
import axios from "axios";
export default {
  data: function() {
    return {
      privateKey: '',
      address: '',
      amount: 0,
      password: '',
      wallet: null
    };
  },
  methods: {
    handleFileUpload,
    loadWallet,
  }
};

function handleFileUpload(e) {
  let reader = new FileReader();
  reader.onload = event => {
    if (event.target.readyState === 2) {
      const jsWallet = (reader.result);
      this.wallet = jsWallet;
    }
  };
  reader.readAsText(event.target.files[0]);
}

function loadWallet() {
  const jsonWallet = this.wallet;
  const password = this.password;
  ethers.Wallet.fromEncryptedWallet(jsonWallet, password).then(wallet => {
    console.log(wallet);
  });
}
</script>

<style>
</style>
 