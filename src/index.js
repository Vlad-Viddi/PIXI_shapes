// import * as PIXI from 'pixi.js';
// import './styles/colors';

// // --------MODEL----------------------------------------------------
// // data stored here

// class Model {
//   gameField = document.getElementById('game');
//   app = null;
//   shapesContainer = null;

//   gravityValue = 5;
//   increaseGravity = document.querySelector('.buttons__gravity--increase');
//   decreaseGravity = document.querySelector('.buttons__gravity--decrease');

//   canvasWidth = 800;
//   canvasHeight = 400;

//   shapesYGenerationPosition = - 100;
//   shapesYDestructionPosition = this.canvasHeight + 100;

//   shapesGeneratingPerSecond = 4;
//   increaseQtyOfShapePerSecond = document.querySelector('.buttons__shapes--increase');
//   decreaseQtyOfShapePerSecond = document.querySelector('.buttons__shapes--decrease');

//   totalShapesArea = 0;
//   shapesOnPageArr = [];
//   currentShapesIndicator = document.querySelector('.currentShapes');
//   totalShapesAreaIndicator = document.querySelector('.totalShapesArea');

//   shapesPerSecondIndicator = document.querySelector('.shapes-value');
//   gravityValueIndicator = document.querySelector('.gravity-value');

// // random
//   randomShapesList = ['triangle', 'rectangle', 'pentagon', 'hexagon', 'circle', 'ellipse', 'polygon'];
// }

// // --------VIEW----------------------------------------------------
// // UI, access to DOM

// class View {
//   constructor(model) {
//     this.model = model;
//   }

//   countArea(coords) {
//     const c = coords;
//     // n is a number of corners of the given shape
//     const n = coords.length / 2;
//     let area = c[n - 1] * c[1] - c[0] * c[n];
  
//     for (let i = 0; i < n; i++) {
//       area += c[i] * c[i + 3] - c[i + 2] * c[i + 1];
//     }
  
//     return Math.round(Math.abs(area) / 2);
//   }

//   getRandomColor() {
//     return '0x' + (Math.round(0xFFFFFF * Math.random())).toString(16);
//   }

//   createRandomShape(x = this.model.canvasWidth * Math.random(), y = this.model.shapesYGenerationPosition) {
//     const graphic = new PIXI.Graphics();
//     const randomColor = this.getRandomColor();
//     const randomShape = this.model.randomShapesList[Math.floor(Math.random() * this.model.randomShapesList.length)];
//     graphic.position.set(x, y);
//     graphic.beginFill(randomColor);

//     switch(randomShape) {
//       case 'triangle':
//         const [x1, y1] = [0, 0];
//         const [x2, y2] = [(Math.random() + 0.25) * 100, 0];
//         const [x3, y3] = [(Math.random() + 0.25) * 100, (Math.random() + 0.25) * 100];
//         graphic.drawPolygon(x1, y1, x2, y2, x3, y3);
//         graphic.typeOfShape = 'triangle';
//         graphic.area = 0.5 * Math.abs((x1 - x3) * (y2 - y3) - (y1 - y3) * (x2 - x3));
//         break;
//       case 'rectangle':
//         const height = (Math.random() + 0.25) * 100;
//         const width = (Math.random() + 0.25) * 100;
//         graphic.drawRect(0, 0, height, width);
//         graphic.typeOfShape = 'rectangle';
//         graphic.area = height * width;
//         break;
//       case 'pentagon':
//         const pentagonCoords = [
//           (Math.random() + 0.25) * 50, 0,
//           2, (Math.random() + 0.25) * 35,
//           (Math.random() + 0.25) * 21, (Math.random() + 0.25) * 90,
//           (Math.random() + 0.25) * 79, (Math.random() + 0.25) * 90,
//           (Math.random() + 0.25) * 98, (Math.random() + 0.25) * 35,
//         ];

//         graphic.drawPolygon(...pentagonCoords);
//         graphic.typeOfShape = 'pentagon';
//         graphic.area = this.countArea(pentagonCoords);
//         break;
//       case 'hexagon':
//         const hexagonCoords = [
//           (Math.random() + 0.25) * 75, (Math.random() + 0.25) * 7,
//           (Math.random() + 0.25) * 25, (Math.random() + 0.25) * 7,
//           0, (Math.random() + 0.25) * 50,
//           (Math.random() + 0.25) * 25, (Math.random() + 0.25) * 93,
//           (Math.random() + 0.25) * 75, (Math.random() + 0.25) * 93,
//           (Math.random() + 0.25) * 100, (Math.random() + 0.25) * 50,
//         ];
//         graphic.drawPolygon(...hexagonCoords);
//         graphic.typeOfShape = 'hexagon';
//         graphic.area = this.countArea(hexagonCoords);
//         break;
//       case 'circle':
//         const radius = Math.random() * 50;
//         graphic.drawCircle(0, 0, radius);
//         graphic.typeOfShape = 'circle';
//         graphic.area = Math.PI * radius ** 2;
//         break;
//       case 'ellipse':
//         const [ellipseWidth, ellipseHeight] = [(Math.random() + 0.25) * 80, (Math.random() + 0.25) * 60]
//         graphic.drawEllipse(0, 0, ellipseWidth, ellipseHeight);
//         graphic.typeOfShape = 'ellipse';
//         graphic.area = Math.PI * ellipseWidth * ellipseHeight;
//         break;
//       case 'polygon':
//         const qtyOfSides = Math.floor(Math.random() * (4) + 7); // from heptagonal to decagonal figure

//         switch(qtyOfSides) {
//           case 7:
//             const heptagonalCoords = [
//               (Math.random() + 0.25) * 50, 0,
//               (Math.random() + 0.25) * 11, (Math.random() + 0.25) * 19,
//               1, (Math.random() + 0.25) * 61,
//               (Math.random() + 0.25) * 28, (Math.random() + 0.25) * 95,
//               (Math.random() + 0.25) * 72, (Math.random() + 0.25) * 95,
//               (Math.random() + 0.25) * 99, (Math.random() + 0.25) * 61,
//               (Math.random() + 0.25) * 89, (Math.random() + 0.25) * 19,
//             ];
//             graphic.drawPolygon(...heptagonalCoords);
//             graphic.area = this.countArea(heptagonalCoords);
//             break;
//           case 8:
//             const octagonalCoords = [
//               (Math.random() + 0.25) * 69, 4,
//               (Math.random() + 0.25) * 31, 4,
//               4, (Math.random() + 0.25) * 31,
//               4, (Math.random() + 0.25) * 69,
//               (Math.random() + 0.25) * 31, (Math.random() + 0.25) * 96,
//               (Math.random() + 0.25) * 69, (Math.random() + 0.25) * 96,
//               (Math.random() + 0.25) * 96, (Math.random() + 0.25) * 69,
//               (Math.random() + 0.25) * 96, (Math.random() + 0.25) * 31,
//             ];
//             graphic.drawPolygon(...octagonalCoords);
//             graphic.area = this.countArea(octagonalCoords);
//             break;
//           case 9:
//             const novagonalCoords = [
//               (Math.random() + 0.25) * 50, 0,
//               18, 12,
//               1, (Math.random() + 0.25) * 41,
//               7, (Math.random() + 0.25) * 75,
//               (Math.random() + 0.25) * 33, (Math.random() + 0.25) * 97,
//               (Math.random() + 0.25) * 67, (Math.random() + 0.25) * 97,
//               (Math.random() + 0.25) * 93, (Math.random() + 0.25) * 75,
//               (Math.random() + 0.25) * 99, (Math.random() + 0.25) * 41,
//               (Math.random() + 0.25) * 82, 12,
//             ];
//             graphic.drawPolygon(...novagonalCoords);
//             graphic.area = this.countArea(novagonalCoords);
//             break;
//           case 10:
//             const decagonalCoords = [
//               (Math.random() + 0.25) * 65, 2,
//               (Math.random() + 0.25) * 35, 2,
//               10, (Math.random() + 0.25) * 21,
//               0, (Math.random() + 0.25) * 50,
//               10, (Math.random() + 0.25) * 79,
//               (Math.random() + 0.25) * 35, (Math.random() + 0.25) * 98,
//               (Math.random() + 0.25) * 65, (Math.random() + 0.25) * 98,
//               (Math.random() + 0.25) * 90, (Math.random() + 0.25) * 79,
//               (Math.random() + 0.25) * 100, (Math.random() + 0.25) * 50,
//               (Math.random() + 0.25) * 91, (Math.random() + 0.25) * 21,
//             ];
//             graphic.drawPolygon(...decagonalCoords);
//             graphic.typeOfShape = 'polygon';
//             graphic.area = this.countArea(decagonalCoords);
//             break;
//         }
//     }

//     graphic.endFill();
//     graphic.interactive = true;
//     graphic.buttonMode = true;

//     return graphic;
//   }
// }

// // --------CONTROLLER----------------------------------------------------

// class Controller {
//   constructor(model, view) {
//     this.model = model;
//     this.view = view;
//   }

//   start() {
//     this.initPixiShapes();

//     this.model.increaseGravity.addEventListener('click', () => {
//       this.model.gravityValue++;
    
//       if (this.model.gravityValue > 10) {
//         this.model.gravityValue = 10;
//         return this.model.gravityValue;
//       }
//       this.model.gravityValueIndicator.innerHTML = this.model.gravityValue;

//       return this.model.gravityValue;
//     });

//     this.model.decreaseGravity.addEventListener('click', () => {
//       this.model.gravityValue--;
    
//       if (this.model.gravityValue < 1) {
//         this.model.gravityValue = 1;
//         return this.model.gravityValue;
//       }
//       this.model.gravityValueIndicator.innerHTML = this.model.gravityValue;

//       return this.model.gravityValue;
//     });

//     this.model.gravityValueIndicator.innerHTML = this.model.gravityValue;

//     // control the qty of shapes falling down per second

//     this.model.increaseQtyOfShapePerSecond.addEventListener('click', () => {
//       this.model.shapesGeneratingPerSecond++;
    
//       if (this.model.shapesGeneratingPerSecond > 10) {
//         this.model.shapesGeneratingPerSecond = 10;
//         return this.model.shapesGeneratingPerSecond;
//       }
//       this.model.shapesPerSecondIndicator.innerHTML = this.model.shapesGeneratingPerSecond;

//       return this.model.shapesGeneratingPerSecond;
//     });

//     this.model.decreaseQtyOfShapePerSecond.addEventListener('click', () => {
//       this.model.shapesGeneratingPerSecond--;
    
//       if (this.model.shapesGeneratingPerSecond < 1) {
//         this.model.shapesGeneratingPerSecond = 1;
//         return this.model.shapesGeneratingPerSecond;
//       }
//       this.model.shapesPerSecondIndicator.innerHTML = this.model.shapesGeneratingPerSecond;

//       return this.model.shapesGeneratingPerSecond;
//     });

//     this.model.shapesPerSecondIndicator.innerHTML = this.model.shapesGeneratingPerSecond;

//     this.createShapeOnTap();

//     this.model.shapesOnPageArr.map(shape => shape.on('contextmenu', (event) => {
//       event.preventDefault();
//       event.stopPropagation();
//       this.model.app.stage.removeChild(shape);
//     }));
//   }

//   initPlayground() {
//     this.model.app = new PIXI.Application({
//       view: this.model.gameField,
//       width: this.model.canvasWidth,
//       height: this.model.canvasHeight, 
//       backgroundColor: 0xd4f3ef, 
//     });
//   }

//   createShapes() {
//     this.model.shapesContainer = new PIXI.Container();
//     this.model.app.stage.addChild(this.model.shapesContainer);
//     for (let i = 1; i <= this.model.shapesGeneratingPerSecond; i++) {
//       const shape = this.view.createRandomShape();
//       this.model.shapesOnPageArr.push(shape);
//       this.model.totalShapesArea += shape.area;
//       this.model.shapesContainer.addChild(shape);
//     }
//     this.model.currentShapesIndicator.innerHTML = this.model.shapesOnPageArr.length;
//     this.model.totalShapesAreaIndicator.innerHTML = Math.round(this.model.totalShapesArea);
//   }

//   deleteShape(shape, index) {
//     shape.clear();
//     this.model.totalShapesArea -= shape.area;
//     this.model.shapesOnPageArr.splice(index, 1);
//   }

//   // deleteShapeOnTap() {
//   //   this.model.shapesOnPageArr.filter((shape, index) => {
//   //     shape.on('pointerdown', () => this.deleteShape((shape, index)))
//   //   });
//   //   console.log('did delete on tap');
//   // }

//   createShapeOnTap() {
//     this.model.gameField.addEventListener('contextmenu', event => {
//       event.stopPropagation();
//       event.preventDefault();
//       const shape = this.view.createRandomShape(event.offsetX, event.offsetY);
//       this.model.shapesOnPageArr.push(shape);
//       this.model.totalShapesArea += shape.area;
//       this.model.shapesContainer.addChild(shape);
//       shape.on('click', event => {
//         this.view.app.stage.removeChild(shape);
//         });
//     });
//     this.model.currentShapesIndicator.innerHTML = this.model.shapesOnPageArr.length;
//     this.model.totalShapesAreaIndicator.innerHTML = Math.round(this.model.totalShapesArea);
//   }

//   animate() {
//     this.model.shapesOnPageArr.map((shape, index) => {
//       shape.y += this.model.gravityValue;
//       if (shape.y > this.model.shapesYDestructionPosition) {
//         this.deleteShape(shape, index);
//       }
//     });
//   }

//   initPixiShapes() {
//     this.initPlayground();
//     setInterval(() => this.createShapes(), 1000);
//     this.model.app.ticker.add(() => this.animate());
//   }
// }

// // ------------MAIN-------------------------------------------

// const model = new Model();
// const view = new View(model);
// const controller = new Controller(model, view);

// controller.start();
