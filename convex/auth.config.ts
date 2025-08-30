export default {
  providers: [
    {
      // Replace with your own Clerk Issuer URL from your "convex" JWT template
  // or with `process.env.CLERK_JWT_ISSUER_DOMAIN`
      // and configure CLERK_JWT_ISSUER_DOMAIN on the Convex Dashboard
      // See https://docs.convex.dev/auth/clerk#configuring-dev-and-prod-instances
  // NOTE: your runtime token shows issuer `https://equal-moth-69.clerk.accounts.dev`.
  // Keep the env var override for different environments, but default to the
  // issuer that matches the tokens you're currently using so Convex can
  // authenticate them successfully.
  domain: process.env.CLERK_JWT_ISSUER_DOMAIN,
      applicationID: "convex",
    },
  ]
};
