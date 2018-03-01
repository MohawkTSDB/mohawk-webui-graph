class QueryParser {
  constructor(query) {
    this.query = query;
  }

  parseQuery(){
    let query = this.query.replace(/\s/g, "");
    let id_list = query.split(',');
    return {ids: id_list};
  }
}

export default QueryParser;
