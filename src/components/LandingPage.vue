<template>
	<div id="frontPage">
    <img src="../assets/fusora.png" alt="Fusora Logo" id="fusora-logo"/>
    <div>WELCOME TO THE FUSORA WALLET</div>
    <div/>
    <div id="innerFrontPage">Visit the <a href="http://fusora.herokuapp.com/" id="innerFrontPage" >Fusora Main Node</a></div>
	</div>
</template>

<style>
#fusora-logo {
  width: 300px;
  height: auto;
}

#frontPage {
  font-family: 'Lato', sans-serif;
  color: #e0ffff;
  font-size: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  margin: 20px;
  flex-direction: column;
}

#innerFrontPage {
  font-family: 'Lato', sans-serif;
  font-size: 30px;
  color: white;
  text-decoration: none;
}
</style>
