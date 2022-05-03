var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  const baseURL = "https://eth-mainnet.alchemyapi.io/v2/demo/getNFTs/";
  const ownerAddr = "0xfAE46f94Ee7B2Acb497CEcAFf6Cff17F621c693D";
  const fetchURL = `${baseURL}?owner=${ownerAddr}`;
  
  fetch(fetchURL, requestOptions)
    .then(response => response.json())
    .then(response => JSON.stringify(response, null, 2))
    .then(result => console.log(result))
    .catch(error => console.log('error', error))