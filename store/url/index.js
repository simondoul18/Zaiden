const isDomain=async (url)=>{
  let urlString = url;
  try {
    if(new URL(urlString).hostname){
      console.log(new URL(urlString).hostname)
      urlString = new URL(urlString).hostname;
    }
  }
  catch(err) {
    console.log(err)
  } 
  let domain = null
  let text = urlString;
  const isValidUrl = urlString=> {
        var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
        '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
      return !!urlPattern.test(urlString);
    }
  isValidUrl(urlString)
  console.log('valid:',isValidUrl(urlString));
  if(isValidUrl(urlString)){
    text.match(/www./gi)?(text = text.replace(/www./gi,'')):console.log("no www.");
    console.log("text after www. check",text)
    text.match(/http/gi)?(text = new URL(text).hostname):
      console.log("no http"),
      text = `https://${text}`,
      text = new URL(text).hostname
    ;
    domain = text
  }
  else{
    false
  }
  if(!domain)throw new Error('Invalid URL');
  console.log({domain});
  return domain;
}

export const actions = {
   searchSingleURL({ commit }, { url, id }) {
    return new Promise(async (resolve, reject) => {
      try {
        url = await isDomain(url)
        const response = await this.$axios.get(`/get-url?url=${url}&id=${id}`);
        console.log(response);

        resolve({
          url: response.data[0].url,
          emails: response.data[0].emails,
          others: response.data[0].others,
          socials: response.data[0].socials,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};
