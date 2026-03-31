# Fuzzie - Workflow Automation
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/divyanshi-sachan/automation)

Fuzzie is a powerful, full-stack workflow automation platform designed to connect various applications and streamline your processes. Built with Next.js, it provides a seamless and intuitive experience for creating complex automations with a visual, drag-and-drop editor. Connect your favorite tools like Google Drive, Slack, Discord, and Notion to build custom workflows that run automatically, saving you time and effort.

## Key Features

-   **Visual Workflow Editor**: A user-friendly, drag-and-drop canvas powered by ReactFlow for designing and visualizing automation workflows.
-   **Multi-App Integration**: Natively connect to Google Drive, Discord, Notion, and Slack. OAuth2 and API keys handle secure authorization.
-   **Trigger & Action System**: Start workflows based on triggers (like a new file in Google Drive) and execute a series of actions (like sending a Discord message or creating a Notion page).
-   **User & Session Management**: Secure authentication and user management handled by Clerk, including profile management and social logins.
-   **Subscription & Credit System**: Integrated with Stripe for managing billing. Users have different tiers (Free, Pro, Unlimited) with a credit system that tracks automation usage.
-   **Real-time Updates**: Utilizes webhooks to listen for changes in connected services, enabling real-time workflow execution.
-   **Modern UI/UX**: A sleek and responsive interface built with Tailwind CSS and Shadcn/UI, featuring a dark mode toggle and various custom animated components.

## Tech Stack

-   **Framework**: Next.js 14 (App Router)
-   **Language**: TypeScript
-   **Database**: PostgreSQL
-   **ORM**: Prisma
-   **Authentication**: Clerk
-   **Styling**: Tailwind CSS, Shadcn/UI
-   **Animations**: Framer Motion
-   **Workflow Canvas**: ReactFlow
-   **Payments**: Stripe
-   **State Management**: Zustand
-   **Integrations**: Google APIs, Discord API, Notion API, Slack API
-   **File Uploads**: Uploadcare

## Getting Started

Follow these steps to get the project running locally.

### 1. Prerequisites

-   Node.js (v18 or later)
-   `pnpm`, `npm`, or `yarn`
-   A PostgreSQL database (e.g., from Neon, Supabase, or a local instance)

### 2. Environment Setup

Copy the example environment file and populate it with your own keys and credentials.

```bash
cp .env.example .env
```

You will need to create developer accounts and obtain API keys for the following services:
-   **Clerk**: For user authentication.
-   **Stripe**: For handling payments and subscriptions.
-   **Google Cloud Platform**: For Google Drive and OAuth integration.
-   **Discord**: For bot integration and webhooks.
-   **Notion**: For API access.
-   **Slack**: For bot integration.
-   **Uploadcare**: For file uploads (profile pictures).
-   **NGROK** (or a similar tunneling service): To expose your local server for webhook testing.

### 3. Database Setup

Set your `DATABASE_URL` in the `.env` file and run the following command to sync the Prisma schema with your database.

```bash
npx prisma db push
```

### 4. Installation & Running the App

Install the project dependencies:
```bash
npm install
```

Run the development server. The app uses HTTPS for secure OAuth callbacks, so the `--experimental-https` flag is recommended.

```bash
npm run dev
```

Open [https://localhost:3000](https://localhost:3000) in your browser to see the application in action.

## How It Works

1.  **Authentication**: Users sign up or log in using Clerk. A new user record is created in the database via a Clerk webhook.
2.  **Connections**: On the `/connections` page, users authorize Fuzzie to access their accounts on platforms like Google Drive, Discord, Notion, and Slack using OAuth 2.0 flows. Access tokens and other connection metadata are stored securely in the database.
3.  **Workflow Creation**: Users can create new workflows from the `/workflows` page. This opens the visual editor at `/workflows/editor/[editorId]`.
4.  **Visual Editor**:
    -   The editor is a ReactFlow canvas where users can drag and drop nodes (Triggers and Actions).
    -   The first node is typically a **Trigger** (e.g., 'Google Drive'). The user can configure it to listen for events, such as file modifications.
    -   Subsequent nodes are **Actions** (e.g., 'Discord', 'Notion', 'Slack').
    -   The sidebar provides configuration options for the selected node, allowing users to write message templates, select channels, or specify database properties.
5.  **Execution**:
    -   When a workflow is "Published," it becomes active.
    -   For a Google Drive trigger, the application sets up a webhook to receive notifications from the Google Drive API.
    -   When a file event occurs, Google sends a notification to the app's webhook endpoint (`/api/drive-activity/notification`).
    -   The endpoint identifies the user and the corresponding workflow, then executes the defined sequence of actions (e.g., posting to Discord, creating a Notion page), deducting credits from the user's account for each run.
