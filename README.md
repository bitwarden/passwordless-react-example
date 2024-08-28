# React Example

## Requirements

- Demo backend: https://demo.passwordless.dev/swagger/index.html
    - This could be what your backend looks like. It's a simple API that allows you to create a user, login, and logout. It's a passwordless authentication system, so you don't need to worry about passwords.

## Project

There are many React frameworks available, in this example, we did not make use of a framework such as:
- NextJS
- Remix
- Gatbsy

We started with a simple React project using Vite as the build tool.

### Configuration
Create and modify a `.env` file as required for your own needs in the project's root directory.

```shell
VITE_BACKEND_URL=https://demo.passwordless.dev
VITE_PASSWORDLESS_API_KEY=pwdemo:public:5aec1f24f65343239bf4e1c9a852e871
VITE_PASSWORDLESS_API_URL=https://v4.passwordless.dev
```

### Running the project

```shell
npm install
npm run dev
```
