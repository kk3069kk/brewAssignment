# IMDb Movie Detail & Sentiment Insight Tool

A premium, production-grade Next.js application that fetches movie details from IMDb (via OMDb API) and provides AI-powered sentiment analysis of audience reviews.

## Features

- **Elegant Design**: Modern glassmorphism aesthetic with smooth animations using Framer Motion.
- **Robust Architecture**: Modular service layer, custom hooks, and comprehensive error handling.
- **Sentiment Analysis**: Real-time analysis of audience reviews using the `sentiment` library.
- **Shadcn/UI**: High-quality, accessible UI components.
- **Demo Mode**: Built-in fallback to high-quality mock data if API limits are reached or no key is provided.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **UI Components**: Shadcn/UI, Lucide React
- **Animations**: Framer Motion
- **Logic**: Axios, Sentiment
- **Testing**: Jest

## Setup Instructions

1.  **Clone the repository**.
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Setup Environment Variables**:
    Create a `.env.local` file in the root directory and add your OMDb API key:
    ```env
    NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here
    ```
    *Note: A default demo key is included in the code as a fallback.*

4.  **Run the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

5.  **Run Tests**:
    ```bash
    npm test
    ```

## Design Rationale

- **Glassmorphism**: Chosen to provide a "premium" and "modern" feel that exceeds standard MVP designs.
- **Service Layer**: Decoupled API logic from UI components to ensure maintainability and testability.
- **Accessibility**: Leveraged Radix UI (via Shadcn) to ensure component accessibility.
