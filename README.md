# KabulMark

A React-based rich text editor built as a wrapper over Meta's Lexical library. It provides a customizable WYSIWYG editor with features like text formatting, lists, links, headings, and more.

## Features

- Bold, italic, underline text formatting
- Alignment options (left, center, right, justify)
- Ordered and unordered lists
- Headings (H1 to H6) and blockquotes
- Link insertion
- Undo/Redo (configurable)
- Direction (LTR/RTL) support
- Markdown shortcuts
- Customizable toolbar
- HTML output

## Installation

Install the package via npm:

```bash
npm install kabulmark
```

Note: This package has peer dependencies on `react` and `react-dom` (version >=16.8.0). Make sure they are installed in your project.

Note: The component includes pre-built styles via Tailwind CSS. No additional style imports are required.

## Usage

Import and use the `KabulMarkEditor` component in your React application:

```jsx
import React from "react";
import KabulMarkEditor from "kabulmark";

function App() {
  const handleChange = (html) => {
    console.log("Editor content:", html);
  };

  return (
    <div>
      <KabulMarkEditor
        placeholder="Start typing..."
        onChange={handleChange}
        showToolbar={true}
        height="400px"
      />
    </div>
  );
}

export default App;
```

### Demo

Try out a live example in this [CodeSandbox demo](https://codesandbox.io/p/sandbox/angry-swartz-zpch33).

### Props

- `id` (string, optional): ID for the editor container.
- `error` (string, optional): Error message to display below the editor.
- `value` (string, optional): Initial HTML content.
- `placeholder` (string, optional): Placeholder text (default: "Start writing your content...").
- `className` (string, optional): Additional CSS classes for the editor container.
- `showHtmlOutput` (boolean, optional): Show HTML output below the editor (default: false).
- `showToolbar` (boolean, optional): Show the toolbar (default: true).
- `height` (string, optional): Height of the editor (default: "300px").
- `onChange` (function, optional): Callback for content changes, receives HTML string.
- `toolbarConfig` (object, optional): Configuration to show/hide toolbar buttons. See ToolbarConfig interface for details.

Example toolbarConfig:

```jsx
const customToolbar = {
  showBold: true,
  showItalic: true,
  showLink: true,
  showNumberedList: true,
  showBulletList: true,
  showHeadingSelect: true
};
<KabulMarkEditor toolbarConfig={customToolbar} />;
```

## Use Cases

- **Blog Post Editor**: Create and format blog content with headings, lists, and links.
- **Comment System**: Allow users to format comments in forums or social platforms.
- **Content Management**: Integrate into CMS for rich text input fields.
- **Email Composer**: Build email templates with formatted text.
- **Note-taking App**: Enable users to take formatted notes with markdown support.

## About

KabulMark is a lightweight wrapper around Meta's [Lexical](https://lexical.dev/) library, providing an easy-to-use React component for rich text editing. It simplifies integration while offering customization options for the toolbar and editor behavior.

## Contributing

KabulMark is open source and we welcome contributions from the community!

### Suggested Improvements

Here are some potential enhancements you could work on:

- Add image upload and embedding support.
- Implement code block highlighting.
- Support for tables.
- More customization options for themes.
- Export to Markdown or other formats.

### How to Contribute

Contributions are welcome! To contribute:

1. Fork the repository on GitHub.
2. Clone your fork locally: `git clone https://github.com/your-username/kabulmark.git`
3. Create a new branch for your changes: `git checkout -b feature/your-feature-name`
4. Make your changes in the new branch.
5. Commit your changes with descriptive messages.
6. Push your branch to your fork: `git push origin feature/your-feature-name`
7. Create a pull request from your branch to the main repository.

Please make sure to update tests as appropriate and adhere to the project's coding style.

If you have questions, open an issue.

## Author

Developed by Shamshad Zaheer.

GitHub: [shamshadzaheer](https://github.com/shamshadzaheer)

## License

MIT License. See [LICENSE](LICENSE) for details.
