var smtpTransport = require('nodemailer-smtp-transport'),
    nodemailer = require('nodemailer'),
    util = require('util'),
    nconf = require('nconf'),
    logger = require('winston'),
    mailer = nodemailer.createTransport(smtpTransport({
        host: nconf.get('EMAIL_SMTP'),
        auth: {
            user: nconf.get('EMAIL_UNAME'),
            pass: nconf.get('EMAIL_PW')
        },
        secure: true
    })),
    tools = exports = module.exports = {};

tools.emailRegex = function(d) {
  if (!d) return true;
  return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(d) &&
         ((d && d.length || 0) <= 100);
};

tools.forgotMailer = function(user, code, cb) {
  var url = nconf.get('PUBLIC_URL') + '#/reset/' + code,
      lines = [
        'Hello,', '',
        'Click <a href="' + url + '">here</a> or go to the link ' +
        'below to reset your password.',
        '', url
      ];

  if (user.email) {
    tools.sendEmail(user.email, { subject: 'Password Reset', lines: lines });
  } else {
    logger.info('Forgot code for %s: %s', user.username, code);
  }

  cb();
}

tools.verifyEmail = function(user, q, cb) {
  var code = user && user.turnkey && user.turnkey.verification &&
             user.turnkey.verification.code,
      verified = user && user.turnkey && user.turnkey.verification &&
                 user.turnkey.verification.verified,
      url = nconf.get('PUBLIC_URL') + '/turnkey/verify/' + code,
      lines = [
        'Hello,', '',
        'Click <a href="' + url + '">here</a> or go to the link ' +
        'below to verify your account.',
        '', url
      ];

  if (user.email && !verified) {
    tools.sendEmail(
      user.email,
      { subject: 'Account Verification', lines: lines }
    );
  } else if (verified) {
    logger.info('Verification turned off.');
  } else {
    logger.info('Need to verify user: ', user);
  }

  cb && cb();  // no need to modify response information
};

tools.sendEmail = function(to, d, cb) {
  var d = d || {},
      appName = 'My Awesome App',
      lines = d.lines || [],
      mailOptions = {
        from: util.format('%s <%s>', appName, nconf.get('EMAIL_UNAME')),
        to: to,
        subject: d.subject || appName
      };

  lines.push('', 'Thanks,', appName);
  mailOptions.html = lines.join('<br/>');
  mailer.sendMail(mailOptions, function(e) {
    if (e) {
      logger.warn('An error occured emailing. You need to have nconfs for ' +
                  'EMAIL_UNAME, EMAIL_PW, and EMAIL_SMTP. Check those.');
      logger.warn('Error: ', e);
      logger.info('Message:', lines);
    }
    if (cb) cb.apply(this, arguments);
  });
}

// Middleware ------------------------------------------------------------------

tools.mw = {};

tools.mw.queryUser = function(isId) {
  return function(d, q, cb) {
    var req = this.request;

    if (!(req && req.user)) return cb('unauthorized');

    // not needed for admins
    if (req.user.role == 'admin') return cb();

    if (isId) q._id = String(req.user._id);
    else q.user = String(req.user._id);

    cb();
  };
};

tools.mw.dataUser = function() {
  return function(d, q, cb) {
    var req = this.request;

    if (!(req && req.user)) return cb('unauthorized');

    // if an admin specifies otherwise, it can do things on
    // another user's behalf
    if (req.user.role == 'admin' && d && d.user) return cb();

    d.user = String(req.user._id);
    cb();
  };
};
