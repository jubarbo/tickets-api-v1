import {config} from '../../config/index';

function withErrorStack(err, stack) {
  if (config.dev) {
    return { err, stack };
  }
  return err;
}

function logErrors(err, req, res, next) {
  console.log(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  //  res.status(500).json({
  //     message_error:
  //       err.message || 'Ups... something went wrong, please try in a while.',
  //   });

  res
    .status(500)
    .json(
      withErrorStack(
        err.message || 'Ups... something went wrong, please try in a while.',
        err.stack
      )
    );

  // res.status(err.status || 500);
  // res.json(withErrorStack(err.message, err.stack));
}

module.exports = {
  logErrors,
  errorHandler,
};
