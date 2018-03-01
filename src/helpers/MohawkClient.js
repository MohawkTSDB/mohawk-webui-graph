
class MohawkClient {

  constructor(url) {
    this.url = url;
  }

  // ajaxCall is a wrapper for the fetch api.
  // it recieves an endpoint to fetch from and a callback to parse / manipulate the response.
  ajaxCall(endpoint, callback, options = {}) {
    fetch(this.url + endpoint, options).then(response => {
      if (response.status !== 200) {
        console.log("Something went wrong! Got respsonse status " + response.status);
        return ;
      }
      response.json().then(data => {
        return callback(data);
      });
    });
  }

  getTenants() {
    const tenants_endpoint = '/hawkular/metrics/tenants'
    let callback = data => {
      let tenant_list = [];
      data.forEach(tenant => {
        tenant_list.push(tenant.id);
      });
      return tenant_list;
    };
    return this.ajaxCall(tenants_endpoint,callback)
  }
}

export default MohawkClient;
