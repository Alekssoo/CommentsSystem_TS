import MyComment from "./comment.js";

export default class Answer extends MyComment {
    public elements: any[];

    constructor() {
        super ()
        this.elements = []
    }


    public create(text: string, author: string):void {
        // console.log("зашли в создание ответа")
        this.load()
 
        this.setTime(Math.floor(Date.now()/1000))
        this.text = text
        this.author = author
        let parentBlock = document.querySelector(".answer_input_block")?.parentElement?.parentElement?.parentElement

        if (parentBlock) {
            console.log("id родит.блока равен = ", parentBlock.id)
            let lenAnswers = parentBlock.querySelectorAll(".answer_block").length + 1
            this.id = Number(`${parentBlock.id}.${lenAnswers}`)
            console.log(this.id)
            this.elements.push({
                id: this.id,
                author: this.author,
                text: this.text,
                rating: this.rating,
                time: this.time,
            })
        }
        
        this.save()
        // console.log("id для нового ответа равен = ", this.id)
    }

    public load(): void {
        if (localStorage.getItem("answers")) {
            this.elements = JSON.parse(localStorage.getItem("answers") as string)
        }
    }

    public save():void {
        localStorage.setItem("answers", JSON.stringify(this.elements))
    }

    public prepareInputBlock(inputBlock: HTMLElement | null, parentBlock:Element) {
        console.log("зашли в метод подготовки инпута ответа")
        if (document.querySelector(".answer_input_block")) {return}

        let newAnswerInputBlock = document.createElement("div")

        if (!inputBlock) {return}
        let photoInput:HTMLImageElement | null = inputBlock.querySelector(".comment_photo_img")
        let nameInput:HTMLElement | null = inputBlock.querySelector(".comment_username")
        if (!photoInput) {return}
        newAnswerInputBlock.innerHTML = `
                <div class="comment_photo">
                    <img src="${photoInput.src}" width="61" height="61" alt="user_photo" class="comment_photo_img">
                </div>
                <div class="comment_content">       
                    <div class="comment_main">
                        <div class="comment_main_head">
                            <img src="${photoInput.src}" width="50" height="50" alt="user_photo" class="comment_head_item comment_photo_mob">
                            <label for="comment" class="comment_head_item comment_username">${nameInput?.textContent}</label>
                            <span class="comment_length opacity_text small_text"><em>Макс. 1000 символов</em></span>
                        </div>
                        <textarea placeholder="Введите текст сообщения..." name="comment" class="comment answer_input" style="height:61px;"></textarea>
                    </div>
                                    
                    <div class="comment_submit">       
                        <button type="submit" class="comment_submit_button answer_submit_button" data-el="" disabled>Отправить</button>
                    </div>

                </div>
            `
        
        //добавляем классы созданному блоку
        newAnswerInputBlock.classList.add("comment_block", "answer_input_block")

        // console.log("id родит-го блока = ", parentBlock.id)
        let answersBlock = parentBlock.querySelector(".comment_answers")

        if (answersBlock) {
            answersBlock.insertAdjacentHTML('afterbegin', newAnswerInputBlock.outerHTML);
        }
        
    }

    public prepareReadyBlockComment(answer:any, accounts:Array<any>): HTMLDivElement {
        let readyAnswerBlock = super.prepareReadyBlockComment(answer, accounts)
        readyAnswerBlock.classList.add("answer_block")
        // удаляем кнопку ответа для блока ответа
        let answerButton = readyAnswerBlock.querySelector(".comment_answer_button")
        if (answerButton) {answerButton.remove()}

        return readyAnswerBlock
    }

    public show(parentBlock: Element | null, accounts: any[], answer:any): void {
        // console.log("зашли в метод show для answer")
        if (!parentBlock) {return}

        const answerInputBlock:HTMLElement |null = parentBlock.querySelector(".answer_input_block")
        if (answerInputBlock) {answerInputBlock.remove() } 
        
        let readyBlockComment = this.prepareReadyBlockComment(answer, accounts)
        readyBlockComment.id = answer.id

        const answersBlock:HTMLElement |null = parentBlock.querySelector(".comment_answers")
        if (answersBlock) {
            answersBlock.insertAdjacentHTML('afterbegin', readyBlockComment.outerHTML);
        }
        
    }

    public showAll(readyBlockComment:Element | null, accounts:Array<any>): void {
        this.load()
        for (let answer of this.elements) {
            if (document.getElementById(`${answer.id}`)) {
                console.log('уже есть элемент с таким id = ', answer.id)
                continue
            }

            let blocks = document.querySelectorAll(".comment_block")
            for (let parentBlock of blocks){
                if (parentBlock && (String(answer.id).split(".")[0] == parentBlock.id)) {
                    this.show(parentBlock, accounts, answer)
                }
            }

        }
    }
}