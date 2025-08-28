# Calculator Online App

A modern, responsive calculator web application built with HTML, CSS, and JavaScript. This calculator provides a clean interface for performing basic arithmetic operations with keyboard and mouse support.

## Features

- **Basic Arithmetic Operations**: Addition (+), Subtraction (-), Multiplication (×), Division (÷)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Keyboard Support**: Full keyboard navigation and input support
- **Error Handling**: Graceful handling of invalid operations and division by zero
- **Modern UI**: Clean, modern design with smooth animations and hover effects
- **Clear Functions**: Both Clear (C) and Clear Entry (CE) functionality
- **Decimal Support**: Proper handling of decimal numbers with validation

## Files Structure

```
├── index.html      # Main HTML structure
├── style.css       # CSS styling and responsive design
├── script.js       # JavaScript functionality with comments
└── README.md       # Documentation (this file)
```

## Usage

### Running the Application
1. Clone this repository
2. Open `index.html` in any modern web browser
3. Start calculating!

### Calculator Controls

#### Mouse Controls
- **Number Buttons (0-9)**: Input numbers
- **Operator Buttons (+, -, ×, ÷)**: Perform arithmetic operations
- **Equals (=)**: Calculate and display result
- **Clear (C)**: Clear all input and reset calculator
- **Clear Entry (CE)**: Clear current entry only
- **Backspace (⌫)**: Delete last entered character
- **Decimal (.)**: Add decimal point to numbers

#### Keyboard Controls
- **Number Keys (0-9)**: Input numbers
- **Operator Keys (+, -, *, /)**: Perform arithmetic operations
- **Enter or =**: Calculate result
- **Escape or C**: Clear all
- **Backspace**: Delete last character
- **Decimal (.)**: Add decimal point

### Example Calculations
```
Basic: 5 + 3 = 8
Decimal: 10.5 × 2 = 21
Complex: 15 - 3 × 2 = 9
Division: 100 ÷ 4 = 25
```

## Technical Details

### JavaScript Features
- **Safe Expression Evaluation**: Uses Function constructor instead of eval() for security
- **Error Handling**: Comprehensive error catching and user-friendly error messages
- **Input Validation**: Prevents invalid inputs like multiple decimal points
- **Keyboard Integration**: Full keyboard event handling for accessibility
- **State Management**: Proper handling of calculator state between operations

### CSS Features
- **Grid Layout**: Modern CSS Grid for button arrangement
- **Responsive Design**: Media queries for mobile optimization
- **Smooth Animations**: Hover and active state transitions
- **Modern Aesthetics**: Gradient backgrounds and shadow effects
- **Accessibility**: Focus indicators and proper contrast ratios

### Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development

This is a static web application that requires no build process or dependencies. Simply edit the files and refresh the browser to see changes.

### Code Organization
- **HTML**: Semantic structure with accessibility considerations
- **CSS**: Modular styling with BEM-like class naming
- **JavaScript**: Well-commented functions with clear separation of concerns

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly across different browsers
5. Submit a pull request

## License

This project is open source and available under the MIT License.