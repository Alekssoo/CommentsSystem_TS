class User {
    public name: string; //
    constructor(name: string) { // параметр конструктора тоже строка
        this.name = name;
    }

    // метод возвращает тип void, т.е. "Пустоту", значит, ничего и не ждём  
    //на выходе
//     public takeARoom():void {
//         this.freeRoomsCount--;
//     }

//     // А тут ожидаем boolean значение 
//     public isRoomAvailable():boolean {
//         return this.freeRoomsCount > 0;
//     }
}