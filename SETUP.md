# Memoryscapes Website Setup

This is the frontend website for Memoryscapes, built with SvelteKit 5.

## Prerequisites

- Node.js 18+ and npm
- The API must be deployed separately (see `../memoryscapes-api/`)

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   
   Copy the example environment file:
   ```bash
   copy .env.example .env
   ```
   
   Edit `.env` and add your API endpoint:
   ```
   VITE_EMAIL_API_ENDPOINT=https://your-api-id.execute-api.us-east-1.amazonaws.com/prod/signup
   ```
   
   You'll get this endpoint after deploying the API (see `../memoryscapes-api/README.md`)

3. **Run development server:**
   ```bash
   npm run dev
   ```
   
   Open http://localhost:5174

## Project Structure

```
memoryscapes-web/
├── src/
│   ├── routes/
│   │   ├── +layout.svelte    # Root layout
│   │   └── +page.svelte       # Landing page
│   ├── app.css                # Global styles
│   └── app.html               # HTML template
├── static/
│   └── memoryscapes_title.png # Logo image
├── .env.example               # Environment template
└── package.json
```

## Features

- **Dark Mode Theme**: Custom Memoryscapes color palette
- **Horizontal Scroll**: Scroll-jacking effect for three pillars (PROTECT, SHARE, CONNECT)
- **Animations**: Staggered fade-in, slide-in, and scale animations
- **Email Signup**: Integrated with AWS API for waitlist collection
- **Responsive Design**: Mobile-first, works on all screen sizes

## Building for Production

```bash
npm run build
```

The build output will be in the `build/` directory.

## Deployment to GitHub Pages

1. **Build the site:**
   ```bash
   npm run build
   ```

2. **Configure for GitHub Pages:**
   
   Update `svelte.config.js` to set the base path:
   ```javascript
   const config = {
     kit: {
       adapter: adapter(),
       paths: {
         base: '/memoryscapes-web'  // Your repo name
       }
     }
   };
   ```

3. **Deploy:**
   
   Push the `build/` directory to the `gh-pages` branch, or use a GitHub Action.

## Environment Variables

- `VITE_EMAIL_API_ENDPOINT`: API Gateway endpoint for email collection

## Tech Stack

- **SvelteKit 5**: Web framework
- **Tailwind CSS v4**: Styling
- **TypeScript**: Type safety
- **Vite**: Build tool

## Notes

- The `.env` file is gitignored for security
- Logo file must be in `static/` directory
- API endpoint must be configured before email signup works
- CORS is enabled on the API for all origins
