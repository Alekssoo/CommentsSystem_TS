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

    public create(text: string):void {
        
        this.time = Math.floor(Date.now())
        this.text = text
        
        console.log("клон элемента добавлен на страницу")
        this.elements.push({
            author: this.author,
            text: this.text,
            rating: this.rating,
            time: this.time
            })
        

        //this.save() //метод готов, но чуть позже начнем сохранять
        
    // document.body.insertBefore(newDiv, my_div);
    }

    public show(form:HTMLElement | null, readyComment:HTMLElement):void {
        if (!form) { return }

        let newText = document.createElement("p");
        newText.textContent = this.text
        newText.classList.add("comment_text")
        

        let newComment = readyComment.cloneNode(true)
        //const codeComment = readyComment.outerHTML

        //определяем и удаляем ,блок для ввода и отправки из введ-го коммента
        let commentContentToRemove = newComment.childNodes[3].childNodes[3]
        let commentContent = newComment.childNodes[3]
        commentContent.removeChild(commentContentToRemove)
        //commentContent

        commentContent.appendChild(newText)

        //сделать норм расстояние между элемента флекса:
        if (newText.parentElement) {
            newText.parentElement.style.gap = "0";
        }
        
        //newText.parentNode?.querySelector(".comment_container")?.classList.remove("comment_container")
        //newComment.removeChild(commentContentNode)
        //console.log("создан клон элемента")
        //console.log("клон. нода содержит элементов: ", newComment.childNodes.length)
        form.appendChild(newComment)
    }

    public clear(comment:HTMLTextAreaElement | null):void {
        if (comment) {
            comment.value = "";

        }

    }

    public save():void {
        localStorage.setItem("comments", JSON.stringify(this.elements))

    }
}