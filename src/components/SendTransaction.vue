<template>
	<div id="sendTransaction">
    <div id="innerTransaction">
      <div>Private Key :</div>
		  <input v-model="privateKey" placeholder="Private Key">
      <div>Recipient Address :</div>
		  <input v-model="address" placeholder="Address">
      <div>Fee :</div>
		  <input v-model="fee" placeholder="Fee">
      <div>Data :</div>
		  <input v-model="data" placeholder="Data(optional)">
		  <div>Amount :</div>
		  <input v-model="amount" type="number"  placeholder="Amount">  
      <div/>
      <button class="button" v-on:click="signTransaction()"> Sign Transaction </button>
      <div v-if="this.signedTransaction === true" id="results">
        <div>Signed Transaction :</div>
        <textarea v-model="transaction" readonly>
        </textarea>
        <div/>
         <button class="button" v-on:click="sendTransaction()"> Send Transaction </button>
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
      privateKey: "",
      address: "",
      amount: 0,
      password: "",
      signedTransaction: false,
      readyToSendTransaction: false,
      fee: 21000,
      data: '',
      transaction: null,
    };
  },
  methods: {
    signTransaction,
    sendTransaction
  },
  components: { Simplert }
};

function signTransaction() {
  try {
    const signingKey = new ethers.SigningKey(this.privateKey);
    if(this.address.length !== 42 ) {
      let obj = {
        title: "Invalid Address",
        message: "",
        type: "error"
      };
      this.$refs.simplert.openSimplert(obj);
      return;
    }

    if(this.fee <= 0) {
      let obj = {
        title: "Invalid Fee",
        message: "",
        type: "error"
      };
      this.$refs.simplert.openSimplert(obj);
      return;
    }

    if(this.address.length !== 42 ) {
      let obj = {
        title: "Invalid Address",
        message: "",
        type: "error"
      };
      this.$refs.simplert.openSimplert(obj);
      return;
    }

    const dataBytes = ethers.utils.toUtf8Bytes(this.data);
    const dataDigest = ethers.utils.keccak256(dataBytes);
    const senderSignature = signingKey.signDigest(dataDigest);
    const transaction = {
      from: signingKey.address,
      to: this.address,
      value: this.amount,
      fee: this.fee,
      dateCreated: new Date().toString(),
      data: this.data,
      senderPubKey:signingKey.publicKey,
      senderSignature: senderSignature,
    };
    this.signedTransaction = true;
    this.transaction = JSON.stringify(transaction);
  } catch (err) {
    console.log(err.message);
    if (err.message.includes("invalid private key")) {
      let obj = {
        title: "Invalid Private Key",
        message: "",
        type: "error"
      };
      this.$refs.simplert.openSimplert(obj);
    }
  }
}

function sendTransaction() {

}
</script>

<style>
#sendTransaction {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}

#innerTransaction {
  color: #e0ffff;
}

input {
  width: 700px;
  height: 30px;
  border-radius: 5px;
  margin: 10px;
}

textArea {
  width: 700px;
  height: 200px;
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
