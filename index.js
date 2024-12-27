// index.js
const fs = require("fs");
const inquirer = require("inquirer");
const { Triangle, Circle, Square } = require("./lib/shapes");

async function promptUser() {
  const { text } = await inquirer.prompt({
    type: "input",
    name: "text",
    message: "Enter text for your logo (up to 3 characters):",
    validate(input) {
      if (input.length > 3) {
        return "Text must be 3 characters or fewer.";
      }
      return true;
    },
  });

  const { textColor } = await inquirer.prompt({
    type: "input",
    name: "textColor",
    message: "Enter a color or hex code for the text color:",
  });

  const { shape } = await inquirer.prompt({
    type: "list",
    name: "shape",
    message: "Choose a shape for your logo:",
    choices: ["Circle", "Triangle", "Square"],
  });

  const { shapeColor } = await inquirer.prompt({
    type: "input",
    name: "shapeColor",
    message: "Enter a color or hex code for the shape color:",
  });

  let shapeInstance;
  switch (shape) {
    case "Circle":
      shapeInstance = new Circle();
      break;
    case "Triangle":
      shapeInstance = new Triangle();
      break;
    case "Square":
      shapeInstance = new Square();
      break;
  }
  shapeInstance.setColor(shapeColor);

  const svgContent = `
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">
    ${shapeInstance.render()}
    <text x="150" y="125" font-size="50" text-anchor="middle" fill="${textColor}">${text}</text>
  </svg>
  `;

  fs.writeFileSync("logo.svg", svgContent);
  console.log("Generated logo.svg");
}

promptUser();
