module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'a48b04fe703f8c2badb05e6a15e9a1a4'),
  },
});
