import * as PIXI from 'pixi.js';

export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  start() {
    this.initPixiShapes();

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

    this.model.shapesOnPageArr.map(shape => shape.on('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.model.app.stage.removeChild(shape);
    }));
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
    }
    this.model.currentShapesIndicator.innerHTML = this.model.shapesOnPageArr.length;
    this.model.totalShapesAreaIndicator.innerHTML = Math.round(this.model.totalShapesArea);
  }

  deleteShape(shape, index) {
    shape.clear();
    this.model.totalShapesArea -= shape.area;
    this.model.shapesOnPageArr.splice(index, 1);
  }

  // deleteShapeOnTap() {
  //   this.model.shapesOnPageArr.filter((shape, index) => {
  //     shape.on('pointerdown', () => this.deleteShape((shape, index)))
  //   });
  //   console.log('did delete on tap');
  // }

  createShapeOnTap() {
    this.model.gameField.addEventListener('click', event => {
      event.stopPropagation();
      event.preventDefault();
      const shape = this.view.createRandomShape(event.offsetX, event.offsetY);
      this.model.shapesOnPageArr.push(shape);
      this.model.totalShapesArea += shape.area;
      this.model.shapesContainer.addChild(shape);
      shape.on('click', event => {
        this.view.app.stage.removeChild(shape);
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
    setInterval(() => this.createShapes(), 1000);
    this.model.app.ticker.add(() => this.animate());
  }
}