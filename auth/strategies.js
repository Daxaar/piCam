module.exports = {
  authenticateWith : function(name){
    require(name)();
    passport.authenticate(name);
    // var strategy = null;
    // switch (strategyName) {
    //   case 'live':
    //     require('live')();
    //     break;
    //   case 'local':
    //     require('local')();
    //     break;
    //   default:
    // }
  }
};
