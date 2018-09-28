<template>
	<div id="loadKey">
		<div id="innerTransaction"> 
      <div> Address :</div>
		  <input class="input" v-model="address" placeholder="Address">   
      <div />
      <button class="button" v-on:click="loadKey()"> Load Key </button>
      <div/>
      <div v-if="this.walletLoaded === true" id="results">
        <div>Safe Balance : {{safeBalance}}</div>
        <div>Confirmed Balance : {{confirmedBalance}}</div>
        <div>Pending Balance : {{pendingBalance}}</div>
      </div>
    </div>
    <simplert :useRadius="true"
          :useIcon="true"
          ref="simplert">
    </simplert>
	</div>
</template>
<script>
import ethers from "ethers";
import axios from "axios";
import Simplert from "vue2-simplert";
export default {
  data: function() {
    return {
      address: "",
      confirmedBalance: 0,
      pendingBalance: 0,
      safeBalance: 0,
      walletLoaded: false
    };
  },
  methods: {
    loadKey
  },
  components: { Simplert }
};

function loadKey() {
  axios
    .get(`http://fusora.herokuapp.com/address/${this.address}/balance`)
    .then(response => {
      this.walletLoaded = true;
      this.confirmedBalance = response.data.balance.confirmed;
      this.pendingBalance = response.data.balance.pending;
      this.safeBalance = response.data.balance.safe;
    })
    .catch(err => {
      let obj = {
        title: "Invalid Address",
        message: "",
        type: "error"
      };
      this.$refs.simplert.openSimplert(obj);
    });
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

.input {
  width: 700px;
  height: 30px;
  border-radius: 5px;
  margin: 10px;
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
 