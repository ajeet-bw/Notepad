const express = require('express');
const cors = require('cors');
const port = 3000;

const App = (function() {
    const db = require('../db/connect');
    const reqHandler = require('../reqHandler/reqHandle');

    let server;

    (function() {
        server = express();
        server.use(express.json());
        server.use(cors());
        server.use('/', reqHandler);
    })();

    function run() {
        db.connect()
            .then(_ => {
                console.log('DB connection successful.');
                server.listen(port, (err) => {
                    if (err) {
                        console.log(`Couldn't start server.\n${err}`);
                    } else {
                        console.log(`Server running at: ${port}.`);
                    }
                });
            })
            .catch(err => {
                console.log(`Database connecton error.\n${err}`);
            });
    }

    return {
        run
    };

})();

App.run();