export default class MyComment {
    public text: string | null; //
    public rating: number; //
    public maxlength: number;
    public elements: Array<Object> = new Array(); 
    public time: number;
    public author: string;

    constructor() {
        this.rating = 0;
        this.maxlength = 1000;
        this.elements = []
        this.text = ""
        this.author = ""
        this.time = Math.floor(Date.now())
        
    }

    public create(readyComment:HTMLElement, text: string):void {
        const form = document.querySelector('.comment_form')
        if (!form) { return }
        this.time = Math.floor(Date.now())
        this.text = text
        // var newDiv = document.createElement("div");
        // newDiv.innerHTML = "<h1>Привет!</h1>";
        let newComment = readyComment.cloneNode(true)
        //const codeComment = readyComment.outerHTML

        console.log("3-й элемент из 3 блока коммента: ", newComment.childNodes[3].childNodes[3])

        //определяем и удаляем textarea из готового коммента
        let commentTextNode = newComment.childNodes[3].childNodes[3].childNodes[1]

        newComment.childNodes[3].childNodes[3].removeChild(commentTextNode)

        ////определяем и удаляем button из готового коммента
        let commentReadyButton = newComment.childNodes[3].childNodes[3].childNodes[2]

        newComment.childNodes[3].childNodes[3].removeChild(commentReadyButton)


        //newComment.removeChild(commentContentNode)
        console.log("создан клон элемента")
        console.log("клон. нода содержит элементов: ", newComment.childNodes.length)
        form.appendChild(newComment)
        // form.innerHTML += codeComment
        console.log("клон элемента добавлен на страницу")
        this.elements.push({
            author: this.author,
            text: this.text,
            rating: this.rating,
            time: this.time
            })
        console.log("клон элемента добавлен в массив:")
        console.log(this.elements)

        
        //newComment.querySelector(".comment")//
        
        
        // const container = newComment.querySelector(".comment_container")
    // Добавляем только что созданный элемент в дерево DOM

    // my_div = document.getElementById("org_div1");
    // document.body.insertBefore(newDiv, my_div);
    }

    public clear(comment:HTMLTextAreaElement | null):void {
        if (comment) {
            comment.value = "";

        }

    }
}