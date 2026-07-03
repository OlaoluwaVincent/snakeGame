// This file converts an svg to png

const sharp = require("sharp");
const fs = require("fs");

const svgBuffer = fs.readFileSync("assets/images/custom-splash.svg");

sharp(svgBuffer)
  .png()
  .toFile("assets/images/custom-splash.png")
  .then(() => console.log("Successfully generated custom-splash.png"))
  .catch((err) => {
    console.error("Error generating image:", err);
    process.exit(1);
  });
