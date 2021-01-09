import {config} from '../../config';

function withErrorStack(error, stack) {
  if (config.dev) {
    return { error, stack };
  }
  return error;
}

function logErrors(error, req, res, next) {
  console.log(error);
  next(error);
}

function errorHandler(error, req, res, next) {

  res
    .status(500)
    .json(
      withErrorStack(
        error.message || 'Ups... something went wrong, please try in a while.',
        error.stack
      )
    );
}

module.exports = {
  logErrors,
  errorHandler,
};
