# Next.js Project

This is a Next.js project bootstrapped with create-next-app.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## API Routes

API routes can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

## Components

* **FeedCard**: A reusable UI component for displaying feed cards.
* **GoogleLogin**: A component for handling Google login functionality.

## Hooks

* **useCreatePost**: A hook for creating new posts.
* **useGetAllPosts**: A hook for fetching all posts.

## API Clients

* **graphqlClient**: A client for making GraphQL requests.

## Dependencies

* `@apollo/client`
* `@react-oauth/google`
* `@tanstack/react-query`
* `axios`
* `next`
* `react`
* `react-dom`
* `react-icons`
* `react-router-dom`

## Learn More

To learn more about Next.js, take a look at the following resources:

* [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
* [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
* [Next.js GitHub Repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js. Check out our [Next.js deployment documentation](https://vercel.com/docs/deployment) for more details.