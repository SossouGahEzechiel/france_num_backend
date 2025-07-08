const {collect} = require("collect.js");

exports.unProtectedRoutes = collect([
  {
    url: "/api/auth/login",
    method: "POST"
  },
  {
    url: "/api/forms",
    method: "POST"
  },
  {
    url: "/api/contact-data",
    method: "GET"
  }
]);

exports.protectedRoutes = collect([
  {
    url: "/api/forms",
    method: "GET"
  }
]);
