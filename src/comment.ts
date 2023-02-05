class MyComment {
    public text: string; //
    public rating: number; //
    public maxlength: number; //
    constructor(text: string, rating: number) {
        this.text = text;
        this.rating = rating;
        this.maxlength = 1000; 
    }

    public create():void {
        ;
    }

//     // А тут ожидаем boolean значение 
//     public isRoomAvailable():boolean {
//         return this.freeRoomsCount > 0;
//     }
}