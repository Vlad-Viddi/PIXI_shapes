import * as PIXI from 'pixi.js';

export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  start() {
    this.initPixiShapes();

    // control the Gravity Value
    this.model.increaseGravity.addEventListener('click', () => {
      this.model.gravityValue++;
    
      if (this.model.gravityValue > 10) {
        this.model.gravityValue = 10;
        return this.model.gravityValue;
      }
      this.model.gravityValueIndicator.innerHTML = this.model.gravityValue;

      return this.model.gravityValue;
    });

    this.model.decreaseGravity.addEventListener('click', () => {
      this.model.gravityValue--;
    
      if (this.model.gravityValue < 1) {
        this.model.gravityValue = 1;
        return this.model.gravityValue;
      }
      this.model.gravityValueIndicator.innerHTML = this.model.gravityValue;

      return this.model.gravityValue;
    });

    this.model.gravityValueIndicator.innerHTML = this.model.gravityValue;

    // control the qty of shapes falling down per second
    this.model.increaseQtyOfShapePerSecond.addEventListener('click', () => {
      this.model.shapesGeneratingPerSecond++;
    
      if (this.model.shapesGeneratingPerSecond > 10) {
        this.model.shapesGeneratingPerSecond = 10;
        return this.model.shapesGeneratingPerSecond;
      }
      this.model.shapesPerSecondIndicator.innerHTML = this.model.shapesGeneratingPerSecond;

      return this.model.shapesGeneratingPerSecond;
    });

    this.model.decreaseQtyOfShapePerSecond.addEventListener('click', () => {
      this.model.shapesGeneratingPerSecond--;
    
      if (this.model.shapesGeneratingPerSecond < 1) {
        this.model.shapesGeneratingPerSecond = 1;
        return this.model.shapesGeneratingPerSecond;
      }
      this.model.shapesPerSecondIndicator.innerHTML = this.model.shapesGeneratingPerSecond;

      return this.model.shapesGeneratingPerSecond;
    });

    this.model.shapesPerSecondIndicator.innerHTML = this.model.shapesGeneratingPerSecond;
    this.createShapeOnTap();
  }

  initPlayground() {
    this.model.app = new PIXI.Application({
      view: this.model.gameField,
      width: this.model.canvasWidth,
      height: this.model.canvasHeight, 
      backgroundColor: 0xd4f3ef, 
    });
  }

  createShapes() {
    this.model.shapesContainer = new PIXI.Container();
    this.model.app.stage.addChild(this.model.shapesContainer);
    for (let i = 1; i <= this.model.shapesGeneratingPerSecond; i++) {
      const shape = this.view.createRandomShape();
      this.model.shapesOnPageArr.push(shape);
      this.model.totalShapesArea += shape.area;
      this.model.shapesContainer.addChild(shape);
      shape.on('pointerdown', () => {
        this.model.shapesContainer.removeChild(shape);
        this.deleteShape(shape);
        this.changeSameShapeColor(shape);
      });
    }
    this.model.currentShapesIndicator.innerHTML = this.model.shapesOnPageArr.length;
    this.model.totalShapesAreaIndicator.innerHTML = Math.round(this.model.totalShapesArea);
  }

  // delete method - used when shape leaves game area
  deleteShape(shape, index = this.model.shapesOnPageArr.indexOf(shape)) {
    shape.clear();
    this.model.totalShapesArea -= shape.area;
    this.model.shapesOnPageArr.splice(index, 1);
  }

  changeSameShapeColor(shape) {
    const clickedTypeOfShape = shape.typeOfShape;

    for (let shapeFromArr of this.model.shapesOnPageArr) {
      if (shapeFromArr.typeOfShape === clickedTypeOfShape) {
        shapeFromArr.tint = this.view.getRandomColor();
      }
    }
  }

  createShapeOnTap() {
    this.model.app.renderer.plugins.interaction.on('pointerdown', () => {
      
      const shape = this.view.createRandomShape(event.offsetX, event.offsetY);
      this.model.shapesOnPageArr.push(shape);
      this.model.totalShapesArea += shape.area;
      this.model.shapesContainer.addChild(shape);
      shape.on('pointerdown', () => {
        this.model.shapesContainer.removeChild(shape);
        this.deleteShape(shape);
        this.changeSameShapeColor(shape);
      });
    });
    this.model.currentShapesIndicator.innerHTML = this.model.shapesOnPageArr.length;
    this.model.totalShapesAreaIndicator.innerHTML = Math.round(this.model.totalShapesArea);
  }

  animate() {
    this.model.shapesOnPageArr.map((shape, index) => {
      shape.y += this.model.gravityValue;
      if (shape.y > this.model.shapesYDestructionPosition) {
        this.deleteShape(shape, index);
      }
    });
  }

  initPixiShapes() {
    this.initPlayground();

    const updateFrames = () => {
      if (this.model.frameUpdateValue++ % 60 === 0) {
        this.createShapes();
      };
      requestAnimationFrame(updateFrames);
    }
    updateFrames();

    this.model.app.ticker.add(() => this.animate());
  }
}
