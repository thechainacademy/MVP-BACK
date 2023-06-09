function NotFoundUser() {
  return {
    message: "User not registered",
    status: 404,
  };
}

function LoginError() {
  return {
    message: "Invalid email and/or password",
    status: 401,
  };
}

function Conflict() {
  return {
    message: "User already registered",
    status: 409,
  };
}

function TokenExpired() {
  return {
    message: "Token expired or incorrect",
    status: 409,
  };
}

export { NotFoundUser, LoginError, Conflict, TokenExpired };
