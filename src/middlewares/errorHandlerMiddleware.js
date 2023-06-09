export default async function handleError(error, req, res, next) {
  console.log(error);
  const status = error.status || 500;
  const message = error.message || "Internal server error";

  return res.status(status).json({ message: message });
}
