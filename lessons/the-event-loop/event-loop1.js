import fs from 'fs';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);

fs.readFile(filename, ()=>{
    setTimeout(()=>{
        console.log('timeout');
    }, 0);

    setImmediate(()=>{
        console.log('immediate')
    })
})