import app from './app';
import {config} from './config/index';
import './database';

app.listen(config.port, function(){
    console.log(`Listening http://localhost:${config.port}`)
});