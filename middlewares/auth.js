import ErrorHandler from '../utils/ErrorHandler.js';

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies['connect.sid'];

  console.log(token);

  if (!token) {
    return next(new ErrorHandler('Not logged in', 401));
  }
  next();
};

export const authrizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(new ErrorHandler('Only Admin allowed', 405));
  }
  next();
};
