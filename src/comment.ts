export default class MyComment {
    public text: string | null; //
    public rating: number; //
    public maxlength: number;
    public elements: Array<any> = new Array(); 
    public time: string;
    public author: string;


    constructor() {
        this.rating = 0;
        this.maxlength = 1000;
        this.elements = []
        this.text = ""
        this.author = ""
        this.time = ""
        
    }

    public create(text: string):void {
        
        this.setTime(Math.floor(Date.now()/1000))

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

    public load(): void {
        if (localStorage.getItem("comments")) {
            this.elements = JSON.parse(localStorage.getItem("comments") as string)
        }
    }

    public show(form:HTMLElement | null, readyComment:HTMLElement):void {
        if (!form) { return }

        this.elements.forEach(element => {
            let newText = document.createElement("p");
            newText.textContent = element.text
            newText.classList.add("comment_text")
            newText.id = "commentReadyText"
            

            let newComment = readyComment.cloneNode(true)
            //const codeComment = readyComment.outerHTML

            // определяем и удаляем, блок для ввода,отправки из введ-го коммента 
            // и уведомление о длине, заменяем на текстовый абзац
            for (const item of newComment.childNodes) {

            
            // newComment.childNodes.forEach((item) =>{
                let containerElem = item.parentElement?.querySelector(".comment_container")
                let commentLengh = item.parentElement?.querySelector(".comment_length")
                let contentElem:HTMLElement | null | undefined = item.parentElement?.querySelector(".comment_content")
                if (containerElem && contentElem && commentLengh) {
                    containerElem.remove()
                    commentLengh.remove()
                    contentElem.appendChild(newText)
                    //contentElem.style.gap = "0";
                    console.log(newText)
                    break
                    // return
                }
            }
            // let newCommentContent = newComment.childNodes[3]
            // let contentToRemove = newCommentContent.childNodes[3]

            // console.log(newComment.childNodes[3])
            //это label, нужно заменить ему for и сделать отдельный класс
            // как для этого найти именно элемент, а не ноду ?
            
            // newCommentContent.removeChild(contentToRemove)

            // newCommentContent.appendChild(newText)

            
            // оформляем имя польз-ля(label) с датой (псевдоэлемент dataset.el)
            if (newText.parentElement) {
                // newText.parentElement.style.gap = "0";
                const labelName:HTMLLabelElement | null = newText.parentElement.querySelector(".comment_username");
                if (labelName) {
                    labelName.classList.add("comment_ready_username")
                    labelName.htmlFor = "commentReadyText"
                    labelName.dataset.el = this.time
                    // labelName.dataset.el.
                    
                    //labelName.classList.add("opacity_text") нужно добавить не самому имени пользователя, а послед. элементам
                    
                    //window.getComputedStyle(labelName,':after').content = this.time;
                }


            }
            
            //newText.parentNode?.querySelector(".comment_container")?.classList.remove("comment_container")
            //newComment.removeChild(commentContentNode)
            //console.log("создан клон элемента")
            //console.log("клон. нода содержит элементов: ", newComment.childNodes.length)
            form.appendChild(newComment)
        });

        // let newText = document.createElement("p");
        // newText.textContent = this.text
        // newText.classList.add("comment_text")
        

        // let newComment = readyComment.cloneNode(true)
        

        // //определяем и удаляем ,блок для ввода и отправки из введ-го коммента
        // let commentContentToRemove = newComment.childNodes[3].childNodes[3]
        // let newCommentContent = newComment.childNodes[3]
        // newCommentContent.removeChild(commentContentToRemove)
        

        // newCommentContent.appendChild(newText)

        // //сделать норм расстояние между элемента флекса:
        // if (newText.parentElement) {
        //     newText.parentElement.style.gap = "0";
        // }
    
        // form.appendChild(newComment)
    }

    private setTime(UNIC_timestamp:number): void {
        let now = new Date(UNIC_timestamp * 1000)
        const months: Array<string> = ["Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
        let year = now.getFullYear();
        let month = months[now.getMonth()]
        let date = now.getDate()
        let hour = now.getHours()
        let min = now.getMinutes()
        let sec = now.getSeconds()
        let time = `${date} ${month} ${year} ${hour}:${min}:${sec}`
        this.time = time
    }

    public checkLength(commentTextElem: HTMLTextAreaElement | null, button: HTMLButtonElement | null):void {
        let lenComment = commentTextElem?.value?.length
                
                if (button) {
                    console.log("длина введенного коммента: ", lenComment)
                    if (!lenComment || lenComment && lenComment > 1000) {
                        button.setAttribute('disabled', '');
                    } else { 
                        button.removeAttribute("disabled")
                    }
                }
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