# Server

- The main Server Actions called by App Router
- Handles all Can Permissions and Business Logic
- May call multiple [services](../services/) to achieve a desired outcome
- Try/Catch returns an [AppResponse Type](../types/server.ts) {data, errors} for the client to work with.
