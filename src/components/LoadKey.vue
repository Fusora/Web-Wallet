<template>
	<div id="loadKey">
		<div id="innerTransaction"> 
      <div> Address :</div>
		  <input class="input" v-model="address" placeholder="Private Key">   
      <div />
      <button class="button" v-on:click="loadKey()"> Load Key </button>
      <div/>
      <div v-if="this.walletLoaded === true" id="results">
        <div>Balance : {{balance}}</div>
      </div>
    </div>
	</div>
</template>

<script>
import ethers from "ethers";
import axios from "axios";
export default {
  data: function() {
    return {
      address: "",
      balance: 0,
      walletLoaded: false,
    };
  },
  methods: {
    loadKey,
  }
};

function loadKey() {
  axios.get(`https://fusora.herokuapp.com/address/${this.address}/balance`)
    .then(response => {
      this.walletLoaded = true;
      this.balance = response.data.balance;
      console.log(response);
    })
    .catch(err => {
      console.log(err)
    })
}
</script>

<style>
#loadKey {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}
</style>
 