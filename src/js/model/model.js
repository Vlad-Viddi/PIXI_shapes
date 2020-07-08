import {
  TRIANGLE,
  RECTANGLE,
  PENTAGON,
  HEXAGON,
  CIRCLE,
  ELLIPSE,
  POLYGON
} from '../../helpers/constants';

export class Model {
  gameField = document.getElementById('game');
  app = null;
  shapesContainer = null;
  backgroundCanvas = null;

  frameUpdateValue = 60;

  canvasWidth = 800;
  canvasHeight = 400;
  shapesYGenerationPosition = - 100;
  shapesYDestructionPosition = this.canvasHeight + 100;

  shapesGeneratingPerSecond = 4;
  increaseQtyOfShapePerSecond = document.querySelector('.buttons__shapes--increase');
  decreaseQtyOfShapePerSecond = document.querySelector('.buttons__shapes--decrease');
  shapesPerSecondIndicator = document.querySelector('.shapes-value');

  gravityValue = 5;
  increaseGravity = document.querySelector('.buttons__gravity--increase');
  decreaseGravity = document.querySelector('.buttons__gravity--decrease');
  gravityValueIndicator = document.querySelector('.gravity-value');

  totalShapesArea = 0;
  shapesOnPageArr = [];
  currentShapesIndicator = document.querySelector('.currentShapes');
  totalShapesAreaIndicator = document.querySelector('.totalShapesArea');

  randomShapesList = [TRIANGLE, RECTANGLE, PENTAGON, HEXAGON, CIRCLE, ELLIPSE, POLYGON];
}
