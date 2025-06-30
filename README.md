# Sjöfn - Todo App

A beautiful and minimal todo application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Three todo states**: Todo (○), In Progress (◐), and Done (●)
- **Inline editing**: Click on any todo text to edit it inline
- **Auto-save**: Changes are automatically saved after 2 seconds of inactivity
- **Smart persistence**: Done items are removed each new day, while Todo and In Progress items persist
- **Custom UI components**: Built entirely with custom components and Tailwind CSS
- **Google Fonts**: Uses Inter for UI elements and Caveat for todo text
- **Unique class prefixes**: All elements have `sf-` prefixed classes for easy referencing

## Design

The app follows a clean, minimal design with:

- Fixed top bar with Sjöfn logo and user profile
- Centered todo list with hover effects
- Custom status icons that cycle through states on click
- Responsive layout with proper spacing

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Google Fonts** - Inter and Caveat font families

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── globals.css       # Global styles and font imports
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Main todo app page
├── components/
│   ├── TopBar.tsx        # Header with logo and profile
│   ├── TodoItem.tsx      # Individual todo item component
│   └── AddItemButton.tsx # Button for adding new todos
├── tailwind.config.js    # Tailwind configuration
└── package.json          # Dependencies and scripts
```

## Usage

- **Add todos**: Click the "Add Item" button
- **Edit todos**: Click on any todo text to edit inline
- **Change status**: Click the circle icon to cycle between states
- **Auto-save**: Changes save automatically after 2 seconds
- **New day**: Done items are automatically removed each new day

## Component Classes

All components use `sf-` prefixed classes for easy element referencing:

- `sf-app` - Main app container
- `sf-top-bar` - Fixed header
- `sf-logo` - Logo container
- `sf-todo-item` - Individual todo item
- `sf-todo-status-icon` - Status circle icon
- `sf-todo-text` - Todo text content
- `sf-add-item-button` - Add new item button

## License

MIT
