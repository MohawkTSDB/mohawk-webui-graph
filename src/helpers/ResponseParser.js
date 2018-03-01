class ResponseParser {
  constructor(json) {
    this.json = json;
  }

  parseResponse() {
    let columns = []
    let xs = {}
    this.json.forEach((timeseries,idx) => {
      // mutate data such that it will be compatible with c3 Multiple XY Line Chart(see: c3js.org/samples/simple_xy_multiple.html)
      // i.e.: if response is given by
      // {[ {id: xx, data:[ .. ]},{id: yy, data:[ .. ]}  ]} => columns: [[series0, timestamp0, timestamp1,...], [id, data0, data1, ..]
      let timestamps = ['series' + idx]
      let data = [timeseries.id];
      timeseries.data.forEach(point => {
        data.push(point.value)
        timestamps.push(point.timestamp)
      });
      columns.push(timestamps)
      columns.push(data)
      xs[timeseries.id] = 'series' + idx
    });
    return [columns, xs]
  }
}

export default ResponseParser
