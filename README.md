# Link Previewer

A modern web application that generates social media-style link previews for any URL. Paste a link and instantly see how it will appear on Twitter, Facebook, LinkedIn, Discord, and Slack.

## Features

- **Multi-Platform Previews**: View how your links appear across different social media platforms:
  - Twitter/X
  - Facebook
  - LinkedIn
  - Discord
  - Slack

- **Real-time Metadata Extraction**: Automatically fetches and displays:
  - Page title
  - Description
  - Featured image
  - URL information

- **Responsive Design**: Works seamlessly on desktop and mobile devices

- **Modern UI**: Built with Tailwind CSS and Radix UI components

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) 16+ with TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com) 4
- **UI Components**: [Radix UI](https://radix-ui.com)
- **Icons**: [Lucide React](https://lucide.dev)
- **HTML Parsing**: [Cheerio](https://cheerio.js.org)
- **Runtime**: React 19

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The app will automatically reload as you edit files.

### Build

Create a production build:

```bash
npm run build
npm start
```

### Linting

Check code quality:

```bash
npm run lint
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── preview/          # API endpoint for fetching link metadata
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout component
│   └── page.tsx               # Home page with preview interface
├── components/
│   ├── UrlInput.tsx           # URL input field component
│   ├── previews/              # Social media preview components
│   │   ├── TwitterPreview.tsx
│   │   ├── FacebookPreview.tsx
│   │   ├── LinkedInPreview.tsx
│   │   ├── DiscordPreview.tsx
│   │   └── SlackPreview.tsx
│   └── ui/                    # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── skeleton.tsx
│       └── tabs.tsx
├── lib/
│   └── utils.ts               # Utility functions
└── types/
    └── metadata.ts            # TypeScript type definitions
```

## How It Works

1. User enters a URL in the input field
2. The application sends the URL to the `/api/preview` endpoint
3. The API extracts metadata from the URL (title, description, image, etc.)
4. Previews are rendered in different social media formats
5. User can switch between platforms using the tab interface

## API Endpoint

### `POST /api/preview`

Fetches metadata from a given URL.

**Request:**
```json
{
  "url": "https://example.com"
}
```

**Response:**
```json
{
  "title": "Example Domain",
  "description": "Example Domain. This domain is for use in examples...",
  "image": "https://example.com/image.png",
  "url": "https://example.com"
}
```

## Configuration

- **Tailwind CSS**: See `tailwind.config.ts`
- **PostCSS**: See `postcss.config.mjs`
- **ESLint**: See `eslint.config.mjs`
- **TypeScript**: See `tsconfig.json`
- **Next.js**: See `next.config.ts`

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.
