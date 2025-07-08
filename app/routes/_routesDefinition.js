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
    url: "/api/contact-data/:id",
    method: "PUT"
  },
  {
    url: "/api/auth/logout",
    method: "POST"
  },
  {
    url: "/api/auth/refresh-data",
    method: "GET"
  },
  {
    url: "/api/forms",
    method: "GET"
  },
  {
    url: "/api/forms/news",
    method: "GET"
  },
  {
    url: "/api/forms/old",
    method: "GET"
  },
  {
    url: "/api/forms/:id",
    method: "PUT"
  },
  {
    url: "/api/users",
    method: "GET"
  },
  {
    url: "/api/users",
    method: "POST"
  },
  {
    url: "/api/users/:id",
    method: "PUT"
  },
  {
    url: "/api/users/:id",
    method: "DELETE"
  },
  {
    url: "/api/dashboard",
    method: "GET"
  }
]);
