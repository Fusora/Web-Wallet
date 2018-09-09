<template>
  <div id="app">
    <div id="header">
        <router-link id="logoItem" class='logo' to="/">Fusura Wallet</router-link>
		  <div id="menus">
        <div id="logoItem" >
          <router-link class='menu' to="/createWallet">Create Wallet</router-link>
        </div>
        <div id="logoItem">
          <router-link class='menu' to="/sendTransaction">Send Transaction</router-link>
        </div>
        <div id="logoItem" >
          <router-link class='menu' to="/loadKey">Load Key</router-link>
        </div>
    </div>
	</div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  margin: 0;
  background: linear-gradient(#005de0, #00c4fb);
  overflow: auto;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  position: absolute;
}

#header {
  display: flex;
  flex-direction: row;
  margin: 0;
  overflow: hidden;
  background-color: #0053c9;
  padding: 20px 20px;
}

.menu {
  color: white;
  text-decoration: none;
}

.logo {
  color: white;
  text-decoration: none;
}

#menus {
  display: flex;
  margin-left: 60%;
  margin-right: 30px;
}

#logoItem {
  font-size: 18px;
  text-align: center;
  margin: 7px;
}

.menu:hover {
  border-bottom: 2px solid #a6e1fa;
  padding-bottom: 5px;
  text-decoration: bold;
}
</style>
