export default class MyComment {
    public text: string | null; //
    public rating: number; //
    public maxlength: number;
    public elements: Array<Node> = new Array(); //
    constructor() {
        this.rating = 0;
        this.maxlength = 1000;
        this.elements = []
        this.text = "" 
    }

    public create(readyComment:HTMLElement):void {
        const form = document.querySelector('.comment_form')
        if (!form) { return }
        // var newDiv = document.createElement("div");
        // newDiv.innerHTML = "<h1>Привет!</h1>";
        let newComment = readyComment.cloneNode(true)
        const codeComment = readyComment.outerHTML
        console.log("создан клон элемента")
        //newComment = HTMLDivElement(newComment)
        //console.log("клон. нода содержит элементов: ", newComment.childNodes.length)
        form.appendChild(newComment)
        // form.innerHTML += codeComment
        console.log("клон элемента добавлен на страницу")
        this.elements.push(newComment)
        console.log("клон элемента добавлен в массив")

        //this.text = newComment?.nodeValue
        //newComment.querySelector(".comment")//
        
        
        // const container = newComment.querySelector(".comment_container")
    // Добавляем только что созданный элемент в дерево DOM

    // my_div = document.getElementById("org_div1");
    // document.body.insertBefore(newDiv, my_div);
    }

//     // А тут ожидаем boolean значение 
//     public isRoomAvailable():boolean {
//         return this.freeRoomsCount > 0;
//     }
}