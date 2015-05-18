/*
 * all utility functions that are used throughout the app 
 * can be imported from here.
 */

/*
 * Assume the maximum length will be 31
 */
exports.getRandomStr = function (len) {
  if (!len) len = 10;

  var str = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
  return str.slice(0, len)
}

exports.getVerificationCode = function(length) {
  
  return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}

//nexmo userId:jrt.chandru@gmail.com, pwd: thiyagarajan
