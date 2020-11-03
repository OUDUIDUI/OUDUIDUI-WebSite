export default function({$axios,redirect}){
  $axios.setHeader('Content-Type', 'application/json')

  $axios.onRequest(config => {
    console.log('Making request to ' + config.url);
  })

  $axios.onError(error => {
    // const code = parseInt(error.response && error.response.status)
    return error.response;
  })
}
