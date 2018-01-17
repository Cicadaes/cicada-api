module.exports = class Init {
    constructor() {
        const args = Array.prototype.slice.call(arguments);
        const next = args.pop();
        const app = args.shift();
        const pipes = [
            'main/model',
            'passport',
            'main/middleware',
            'main/controller',
            'main/router'
        ];
        const onInit = () => {
            let Pipe = pipes.shift();

            if (Pipe) {
                let namespace = Pipe.split('/');
                Pipe = require('./' + Pipe);

                if (namespace.length > 1) {
                    new Pipe(app, namespace[0], onInit);
                } else {
                    new Pipe(app, onInit);
                }
                
            } else {
                next();
            }
        }

        onInit();
    }
}