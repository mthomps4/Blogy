# Talking Points

- **Consistency and Code Organization (at scale)**
  - App Router Specifics, Client, Server, Services, Tests

- Recommendation of Two Template Repos for the short term
  - Full Stack Next (iterate on this example)
  - Monorepo w/ Turbo (admin, user, api, library)
    - Turbo > Yarn Workspaces

## Few talking points along the way

- create-next-app@latest > Bison@canary

- NPM > Yarn
  - We've had to revert back to NPM for a lot of clients anyway

- Nix EB Eslint for Next/Core recommends

- Potentially Use `instrumentation.ts` for runtime checks <https://twitter.com/erfanebrahimnia/status/1723741584984846532?s=43>

- Reminder: EB Deploy vs Enterprise Deploy
  - FC, Render, or Here's your Dockerfile

- Normalize where business logic should be contained (Services VS Server Actions)
  - Normalize Serializers for API calls [post Example](./src/services/posts.ts)
  - Normalize a data return Type for App Router [type](./src/types/server.ts)
    - Standardize FE Validations w/ Zod [CreatePostForm](./src/app/posts/new/CreatePostForm.tsx)
    - Standardize API Returns [createPost](./src/server/posts/index.ts)

- Organization of UI components > Page Components (Forms, etc)

- Recommend of Top Level Types, Utils, Constants
  - We've had too many projects where these tend to float around...

- New App Router Overview

## Meeting Notes

- [x] use NPM
- [ ] Should we use another "base"
  - [ ] create next app, create T3, codebase up
- [ ] Compare tRPC for server side "services"
- [ ] Cache invalidations
  - use Tags?
- [ ] Round out Best Practices / Docs
