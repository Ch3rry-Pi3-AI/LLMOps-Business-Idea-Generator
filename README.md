# 🚀 LLMOps – Business Idea Generator

### 🧠 Project Setup Branch

This branch establishes the **foundational setup** for the **LLMOps Business Idea Generator**, including environment preparation, project scaffolding, and deployment configuration.

Once this stage is complete, you’ll have a running **FastAPI backend** and a **Next.js + Tailwind frontend**, ready for integration with OpenAI’s API and future LLMOps components.



## ⚡ PROJECT SETUP

### 🧩 Overview

This guide walks you through creating and deploying the base project structure for the **Business Idea Generator**.
By the end, you will have:

* A working **Next.js frontend** (TypeScript + Tailwind)
* A **FastAPI backend** ready to serve AI-generated ideas
* Live deployment on **Vercel**, accessible within minutes



## 🪄 Step 1: Sign Up for Vercel

1. Visit [https://vercel.com](https://vercel.com)
2. Click **Sign Up** in the top-right corner
3. Choose the **Hobby** plan (free for personal projects)
4. Enter your name
5. Select your preferred sign-in method:

   * **GitHub** (recommended) → Continue with GitHub and authorize
   * **GitLab** → Continue with GitLab and authorize
   * **Bitbucket** → Continue with Bitbucket and authorize
   * **Email** → Enter your email and verify
6. Complete the onboarding (team creation can be skipped)



## 🧱 Step 2: Install Node.js (Required for Vercel CLI)

1. Go to [https://nodejs.org/en/download](https://nodejs.org/en/download)
2. Choose one of the following installation methods:

   * **Direct Download:** Installer for your OS
   * **Package Manager:** Homebrew (macOS), Chocolatey (Windows), etc.
   * **Version Manager (Recommended):** Use `nvm`, `fnm`, or `volta`
3. After installation, open a **new terminal**
4. Verify installation:

   ```bash
   node --version
   npm --version
   ```

   Both commands should return version numbers.



## 🖥️ Step 3: Create the Next.js Frontend

1. Open **Cursor** (or your preferred IDE)
2. Open Terminal → New Terminal (Ctrl ` / Cmd `)
3. Navigate to your projects folder
4. Create a new **Next.js** project using TypeScript and Tailwind:

   ```bash
   npx create-next-app@15.5.6 llmops-business-idea-generator --typescript
   ```

   **Note:** We pin to Next.js **15.5.6** for compatibility with our libraries (Next 16.x has known issues as of Oct 2025).

   When prompted:

   1. **Which linter would you like to use?** → Press Enter (**ESLint**)
   2. **Use Tailwind CSS?** → `y`
   3. **Use a `src/` directory?** → `n`
   4. **Use App Router (recommended)?** → `n` (we’ll use Pages Router)
   5. **Use Turbopack?** → `n`
   6. **Customise import alias?** → `n`



## 🧭 Step 4: Open Your Project

1. In Cursor → File → Open Folder → Select `llmops-business-idea-generator`
2. You should now see the base Next.js structure.

### Project Structure Overview

```
llmops-business-idea-generator/
├── pages/              # Page routes
│   ├── _app.tsx        # Global app wrapper
│   ├── _document.tsx   # Custom document layout
│   ├── index.tsx       # Homepage
│   └── api/            # API routes (to be deleted)
│       └── hello.ts
├── styles/             # Tailwind & global styles
│   └── globals.css
├── public/             # Static assets
├── package.json        # Dependencies & scripts
├── tsconfig.json       # TypeScript config
├── next.config.js      # Next.js config
└── node_modules/
```



## 🧹 Step 5: Clean Up Unnecessary Files

Because the backend will be handled by **FastAPI**, remove the placeholder Next.js API:

1. In Cursor’s File Explorer, locate `pages/api`
2. Right-click and select **Delete**
3. Confirm when prompted

This keeps the project lean and focused on the UI layer.



## 🎨 Step 6: Understanding Tailwind CSS

**Tailwind CSS** is a utility-first CSS framework.
Instead of writing custom CSS files, you compose your styles directly in HTML/JSX using utility classes.

Examples:

* `bg-blue-500` → Blue background
* `text-white` → White text
* `p-4` → Padding on all sides
* `rounded-lg` → Rounded corners

This approach keeps your design system consistent and development fast.



## ⚙️ Step 7: Install Vercel CLI and Deploy

1. Install Vercel CLI globally:

   ```bash
   npm install -g vercel
   ```

2. Log in to Vercel:

   ```bash
   vercel login
   ```

   * Enter the email used for your Vercel account
   * Click the verification link in your email
   * Return to the terminal – you should see confirmation

3. From your project directory, run:

   ```bash
   vercel
   ```

   Follow the prompts to deploy your app.
   In seconds, you’ll get a live URL for your **Business Idea Generator** frontend.



## ✅ Completion Checklist

By the end of this stage, you should have:

| Component                  | Description                                  | Status |
| -------------------------- | -------------------------------------------- | :----: |
| Next.js Frontend           | TypeScript + Tailwind app scaffold           |    ✅   |
| FastAPI Backend (skeleton) | Basic API endpoint ready for LLM integration |    ✅   |
| Vercel Deployment          | Live frontend URL running on Vercel          |    ✅   |
| Git Branch Structure       | `00_project_setup` branch initialised        |    ✅   |

## 🧭 Next Stage Preview → `01_deploy_app`

The next branch (`01_deploy_app`) will focus on **deploying the base application to Vercel**.
This includes connecting your local FastAPI and Next.js setup to Vercel, verifying environment configuration, and ensuring a live, working version of the **LLMOps Business Idea Generator** is publicly accessible.


