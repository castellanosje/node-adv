import {Readable} from "stream";

const rivers = [
    "Amazon",
    "Nile",
    "Yangtze",
    "Mississippi",
    "Ganges",
    "Danenube",
    "Mekong"
];

class ArrayStream extends Readable {
        constructor(array){
            super({ objectMode: true});
            this.array = array;
            this.index = 0;
        }
        _read(){
            if(this.index <= this.array.length){
                const chunk = {
                    data:this.array[this.index],
                    index: this.index,
                }
                this.push(chunk);
                this.index += 1;
            }else{
                this.push(null);
            }
            
        }
}


const riverStream = new ArrayStream(rivers);

riverStream.on("data", (chunk)=> console.log(chunk));
riverStream.on("end", ()=>console.log("stream ended."));