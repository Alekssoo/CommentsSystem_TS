export default class User {
    public name: string; 
    public photo: string; 
    constructor() { 
        this.name = "";
        this.photo = ""; // возможно, позже сделать fetch
    }

    public create(name: string):void {
        this.name = name;

    }

    public addPhoto(url:string):void {
        this.photo = url;
    }

    public writeComment():void {
        
    }



//     public takeARoom():void {
//         this.freeRoomsCount--;
//     }

//     // А тут ожидаем boolean значение 
//     public isRoomAvailable():boolean {
//         return this.freeRoomsCount > 0;
//     }
}