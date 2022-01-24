import * as express from 'express';

import CarCtrl from './controllers/car';
import CircuitCtrl from './controllers/circuit';

const setRoutes = (app): void => {
    const router = express.Router();
    const carCtrl = new CarCtrl();
    const circuitCtrl = new CircuitCtrl();

    // Cars
    router.route('/cars').get(carCtrl.getAll);
    // router.route('/cars/count').get(carCtrl.count);
    router.route('/car').post(carCtrl.insert);
    router.route('/car/:id').get(carCtrl.get);
    router.route('/car/:id').put(carCtrl.update);
    router.route('/car/:id').delete(carCtrl.delete);

    // Circuits
    router.route('/circuits').get(circuitCtrl.getAll);
    // router.route('/circuits/count').get(circuitCtrl.count);
    router.route('/circuit').post(circuitCtrl.insert);
    router.route('/circuit/:id').get(circuitCtrl.get);
    router.route('/circuit/:id').put(circuitCtrl.update);
    router.route('/circuit/:id').delete(circuitCtrl.delete);

    // Apply the routes to our application with the prefix /api
    app.use('/api', router);
};

export default setRoutes;
