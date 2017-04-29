'use strict';

var _ = require('lodash');
const nodemailer = require('nodemailer');


exports.create = function(req, res) {
  // create reusable transporter object using the default SMTP transport
			var transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: 'click2madan@gmail.com',
					pass: ''
				}
			});

			// setup email data with unicode symbols
			var mailOptions = {
				from:req.body.email, //'"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
				to: 'click2madan@gmail.com', // list of receivers
				subject: req.body.subject + " - " + req.body.firstname + " " + req.body.lastname, // Subject line
				//text: req.body.message // plain text body
				html: req.body.message + '</br></br>' + " - " + req.body.firstname + " " + req.body.lastname
			};

			// send mail with defined transport object
			transporter.sendMail(mailOptions,function(error, info) {
				if (error) {
					return handleError(res, error);
				}
				console.log('Message %s sent: %s', info.messageId, info.response);
				res.status(201).json(info);
			});
};

function handleError(res, err) {
  return res.status(500).send(err);
}
