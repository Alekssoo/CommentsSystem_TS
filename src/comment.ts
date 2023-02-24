export default class MyComment {
    public text: string | null; 
    public rating: number; 
    public maxlength: number;
    public elements: Array<any> = new Array(); 
    public time: string;
    public author: string;
    private id: number;

    constructor() {
        this.rating = 0;
        this.maxlength = 1000;
        this.elements = []
        this.text = ""
        this.author = ""
        this.time = ""
        this.id = 0
    }

    public create(text: string):void {
        // сначала подгружаем из localstorage массив с комментами
        // устанавливаем текущий id = его длине
        this.id = this.elements.length
        this.setTime(Math.floor(Date.now()/1000))
        this.text = text

        console.log("id для нового элемента равен = ", this.id)

        this.elements.push({
            id: this.id,
            author: this.author,
            text: this.text,
            rating: this.rating,
            time: this.time
            })
        
        //this.id++;
        

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

        // создаем новый абзац из отправленного комментария
        
        for (let i = this.id; i <= this.elements.length-1;i++){
            //console.log("зашли в цикл для переобра элементов массива")
            let newText = document.createElement("p");
            newText.textContent = this.elements[i].text
            //console.log(this.elements[i-1])
            newText.classList.add("comment_text")
            newText.id = "commentReadyText"
            
            //клонируем и переделываем контэйнер с комментарием для показа
            let newComment = readyComment.cloneNode(true)
            

            // определяем и удаляем, блок для ввода,отправки из введ-го коммента 
            // и уведомление о длине, заменяем на текстовый абзац
            for (const item of newComment.childNodes) {
                const parentBlock = item.parentElement
                let containerElem = parentBlock?.querySelector(".comment_container")
                let commentLengh = parentBlock?.querySelector(".comment_length")
                let contentElem:HTMLElement | null | undefined = parentBlock?.querySelector(".comment_content")
                if (containerElem && contentElem && commentLengh) {
                    containerElem.remove()
                    commentLengh.remove()
                    contentElem.appendChild(newText)
                    //console.log(newText)

                    // оформляем имя польз-ля(label) с датой (псевдоэлемент dataset.el)
                    const labelName:HTMLLabelElement | null = contentElem.querySelector(".comment_username");
                    if (labelName) {
                        labelName.classList.add("comment_ready_username")
                        labelName.htmlFor = "commentReadyText"
                        labelName.dataset.el = this.time
                    }
                    break

                    // return
                }
            }

            // и добавляем итоговый блок в форму
            form.appendChild(newComment)
        }
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