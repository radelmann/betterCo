module.exports = {
  get: function(req, res, next) {
    res.status(200);
    res.json({data:'data'}); 
  },

  post: function(req, res, next) {
    var data = req.body;
    //to do - post data to db here
    res.status(200);
  }
}