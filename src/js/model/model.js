export class Model {
  gameField = document.getElementById('game');
  app = null;
  shapesContainer = null;

  gravityValue = 5;
  increaseGravity = document.querySelector('.buttons__gravity--increase');
  decreaseGravity = document.querySelector('.buttons__gravity--decrease');

  canvasWidth = 800;
  canvasHeight = 400;

  shapesYGenerationPosition = - 100;
  shapesYDestructionPosition = this.canvasHeight + 100;

  shapesGeneratingPerSecond = 4;
  increaseQtyOfShapePerSecond = document.querySelector('.buttons__shapes--increase');
  decreaseQtyOfShapePerSecond = document.querySelector('.buttons__shapes--decrease');

  totalShapesArea = 0;
  shapesOnPageArr = [];
  currentShapesIndicator = document.querySelector('.currentShapes');
  totalShapesAreaIndicator = document.querySelector('.totalShapesArea');

  shapesPerSecondIndicator = document.querySelector('.shapes-value');
  gravityValueIndicator = document.querySelector('.gravity-value');

  // random
  randomShapesList = ['triangle', 'rectangle', 'pentagon', 'hexagon', 'circle', 'ellipse', 'polygon'];
}
