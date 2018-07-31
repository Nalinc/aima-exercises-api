const lunr = require('lunr')
const corpus = require('./corpus.json')

var idx = lunr(function () {
  this.field('title')
  this.field('body')
  this.metadataWhitelist = ['position']
  // Build the index
  for(index in corpus){
	this.add(corpus[index])
  }
})

exports.searchController = function(req, res) {
	var query = req.query.query;
	data = idx.search(query)
	res.send(data);
}