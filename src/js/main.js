import { Model } from './model/model';
import { View } from './view/view';
import { Controller } from './controller/controller';

const model = new Model();
const view = new View(model);
const controller = new Controller(model, view);

controller.start();
