# Portfolio Website

A modern, responsive portfolio website built with React.js and CSS3/SCSS. This project showcases my skills, projects, and provides a platform for potential clients to learn about my services and get in touch.

## Features

- Modern, clean design with dark theme
- Responsive layout for all devices
- Interactive elements and animations
- Skills showcase with category filtering
- Client guide with pricing and services
- Contact form for project inquiries
- Performance optimized

## Technologies Used

- React.js
- CSS3/SCSS
- React Router
- React Icons
- CSS Animations
- Responsive Design
- Modern JavaScript (ES6+)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mohitshah/portfolio-website.git
```

2. Navigate to the project directory:
```bash
cd portfolio-website
```

3. Install dependencies:
```bash
npm install
# or
yarn install
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

## Project Structure

```
portfolio-website/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
├── src/
│   ├── components/
│   │   ├── About.js
│   │   ├── Contact.js
│   │   ├── Header.js
│   │   ├── Hero.js
│   │   ├── Projects.js
│   │   ├── Skills.js
│   │   ├── ClientGuide.js
│   │   └── ClientGuideForm.js
│   ├── styles/
│   │   ├── About.css
│   │   ├── Contact.css
│   │   ├── Header.css
│   │   ├── Hero.css
│   │   ├── Projects.css
│   │   ├── Skills.css
│   │   ├── ClientGuide.css
│   │   └── ClientGuideForm.css
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Customization

### Colors
The website uses CSS variables for easy color customization. Update the following variables in `src/index.css`:

```css
:root {
    --primary-color: #00ff88;
    --secondary-color: #00b8ff;
    --background-color: #0a192f;
    --text-color: #ffffff;
    --accent-color: #00ff88;
}
```

### Content
Update the content in respective component files:
- `src/components/About.js` - Personal information
- `src/components/Skills.js` - Skills and categories
- `src/components/Projects.js` - Project showcase
- `src/components/ClientGuide.js` - Services and pricing

## Responsive Design

The website is fully responsive with breakpoints at:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Performance Optimization

- Lazy loading of components
- Optimized images
- CSS animations for smooth transitions
- Minimal dependencies
- Code splitting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Mohit Shah** - [GitHub](https://github.com/mohitshah) | [LinkedIn](https://linkedin.com/in/mohitshah) | [Twitter](https://twitter.com/mohitshah)

## Acknowledgments

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [React Icons](https://react-icons.github.io/react-icons/) - Popular icons for React projects
- [Google Fonts](https://fonts.google.com/) - Typography
- [Unsplash](https://unsplash.com/) - High-quality images