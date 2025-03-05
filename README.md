This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
## you need to read this first:
There are a total of five pages:

main_blog: Displays all blogs in a grid format. Clicking on a blog routes you to blog[-slug-].
blog[]: Dynamically displays the selected blog.
showupdate: Shows a table with edit and delete actions. Clicking "edit" routes you to t[-slug-].
t[]: Provides admin mode for the selected blog.
adm: An admin panel used for inserting blogs.
I am using MongoDB as the database.
Also i hve use jodit for rich text editing.
Initially, the project’s performance was not very good, with a Largest Contentful Paint (LCP) of 3.8s. However, after some adjustments, I have improved it to 1.26s.

I am using Multer for storing image.

Open http://localhost:3000 in your browser to see the result.

Currently, there is no authentication, so you need to manually navigate to:

Edit a blog: http://localhost:3000/showupdate
Insert a blog: http://localhost:3000/showupdate/adm

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
