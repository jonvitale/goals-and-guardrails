import QdtComponents from 'qdt-components'

const host = 'dashboards.philasd.org' // window.location.hostname

const testing = false

const config = {
  host,
  prefix: '',
  port: host === 'localhost' ? 4848 : 443, // window.location.port,
  secure: host === 'localhost' ? window.location.protocol === 'https:' : true,
  appId: testing
    ? 'fd62ef85-52d8-4cbe-9c8c-e410eb307d19'
    : 'a608ac18-201e-40cf-ad46-9854553aa791',
}
const connections = {
  vizApi: true,
  engineApi: true,
}
const qdtComponents = new QdtComponents(config, connections)

console.log('opening port', config.port)

export default ({ app }, inject) => {
  inject('qdt', qdtComponents)
}
