var Castle = require('../model/castle');

var appRouter = function (app) {
    app.get("/castles", async function (req, res) {
        try {
            await Castle.find({}, (error, data) => {
                if (error) {
                  console.log(error);
                } else {
                  //console.log(data);
                  res.send(data);
                }
              }).clone();
        } catch (error) {
            res.json({message: error});
        }
    });
}
  
module.exports = appRouter;