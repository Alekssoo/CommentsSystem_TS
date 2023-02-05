class User {
    public name: string; //
    public photo: string; //
    constructor(name: string, url: string) { // параметр конструктора тоже строка
        this.name = name;
        this.photo = url; // возможно, позже сделать fetch
    }

//     public takeARoom():void {
//         this.freeRoomsCount--;
//     }

//     // А тут ожидаем boolean значение 
//     public isRoomAvailable():boolean {
//         return this.freeRoomsCount > 0;
//     }
}