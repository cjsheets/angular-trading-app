/* -----------------------------------|
 *|  Environment variables for use 
 *|  during development. Not commited
 *|  to git repository
 */

module.exports = {
  // Sentry.io Access Keys
  raven: {
    key     : '78f155660ae9419b885c3e9a5267272d',
    secret  : 'cc2ee271b34846f893decd2f67450c92',
    host    : 'sentry.io',
    app_id  : '128901'
  },
  // MongoDB connection options
  mongo: {
    user  : 'chad',
    pass  : 'fdsF298rhsdkfuh9w7',
    host  : 'ds163758.mlab.com',
    port  : '63758',
    db    : 'nightlife-app'
  },
  // Express.js Params
  express: {
    session_secret    : '1d7cc9a86b7de65401fdce4137f1c03b',
    // Anything not matching this pattern returns 404
    valid_routes      : '/:url(api|auth|dev|nl)/*',
    dev_routes        : true,  // Enable /dev routes
  },
  /**
   * Authentication - API Credentials
   */
  facebook : {
    client_id         : '390580464627762',
    client_secret     : '25b4aa80e3983217518b51bd2b660696',
    callback          : 'http://localhost:5000/auth/facebook/callback'
  },
  twitter : { // Development App
    consumer_key      : 'B7vC4GvMCRS8p5jddv9SnI9bV',
    consumer_secret   : 'HH9sLcxjwqepfUPqfaWqiUSU9b357kMuGmffFn92mz28TwdopT',
    callback          : 'http://localhost:5000/auth/twitter/callback'
  },
// twitter : { // Production Values
//   consumer_key      : 'pGymPYeIir2gfOfEkwxcO4DGh',
//   consumer_secret   : 'IV7mOKjfgCxlHm4LrzOJdSmvPp8g6EMHZ3EXctj9JOYRslrMv1',
//   callback          : 'http://localhost:5000/auth/twitter/callback'
// },

  google : {
    client_id         : '135873350564-7c0bkh2k3t93qgdl8oa7m7kclahl455s.apps.googleusercontent.com',
    client_secret     : 'OndoZv--ov_HFG4WXHOxJKWy',
    callback          : 'http://localhost:5000/auth/google/callback'
  }
};