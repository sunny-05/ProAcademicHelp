// app/api/request/route.js
// Backward-compat: if anything still posts to /api/request,
// reuse the handlers from /api/requests.
export { POST, GET, DELETE } from '../requests/route';
