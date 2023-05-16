import MyComment from "./comment.js";

export default class Answer extends MyComment {
    public elements: any[];

    constructor() {
        super ()
        this.elements = []
    }


    public create(text: string, author: string):void {
        this.load()
        
        this.id = this.elements.length
        this.setTime(Math.floor(Date.now()/1000))
        this.text = text
        this.author = author

        // console.log("id для нового ответа равен = ", this.id)
        
        this.elements.push({
            id: this.id,
            author: this.author,
            text: this.text,
            rating: this.rating,
            time: this.time,
        })

        this.save()

        console.log(`создали ответ с id = ${this.id}`)
    }

    public load(): void {
        if (localStorage.getItem("answers")) {
            this.elements = JSON.parse(localStorage.getItem("answers") as string)
        }
    }

    public save():void {
        localStorage.setItem("answers", JSON.stringify(this.elements))
    }
   

    public prepareInputBlock(parentBlock:Element, inputBlockComment:Element | null) {
        if (!inputBlockComment) {return}
        // let parentComment = document.getElementById(idParent)
        let newAnswerInputBlock = document.createElement("div")
        // newAnswerInputBlock.outerHTML = inputBlockComment.outerHTML
        
        
        //добавляем классы и содержимое созданному блоку
        newAnswerInputBlock.classList.add("comment_block", "answer_input_block")
        newAnswerInputBlock.innerHTML =  inputBlockComment.innerHTML;
        newAnswerInputBlock.id = `${parentBlock.id}.${this.id}`
        // console.log(newAnswerInputBlock)
        let answerButton = newAnswerInputBlock.querySelector(".comment_submit_button")
        if (answerButton) {
            answerButton.classList.add("answer_submit_button")
        }

        let answerTextElem = newAnswerInputBlock.querySelector(".comment")
        if (answerTextElem) {
            answerTextElem.classList.add("answer_input")
        }


        //создаем блок ответов и добавляем в него ответ

        // parentBlock.insertAdjacentHTML('afterend', newAnswerInputBlock.outerHTML);
        console.log("id родит-го блока = ", parentBlock.id)
        let answersBlock = parentBlock.querySelector(".comment_answers")

        if (!answersBlock) {
            let newAnswersBlock = document.createElement("div")
            newAnswersBlock.classList.add("comment_answers")
            let contentBlock = parentBlock.querySelector(".comment_content")
            contentBlock?.appendChild(newAnswersBlock)
            newAnswersBlock.insertAdjacentHTML('beforeend', newAnswerInputBlock.outerHTML);
        } else {
            answersBlock.insertAdjacentHTML('beforeend', newAnswerInputBlock.outerHTML);
        }

        //нужно взять айдишник родителя и присваивать блокам ответов с подпунктом номера ответа к комменту
        
    }

    public show(form: HTMLElement | null, readyblockComment: HTMLElement | null, accounts: any[]): void {
        let answerInputBlock:HTMLElement |null = document.querySelector(".answer_input_block")
        
        super.show(form, answerInputBlock, accounts)
        

        if (answerInputBlock && answerInputBlock.parentElement && answerInputBlock.nextElementSibling) {
            
            let answerReadyBlock = answerInputBlock.nextElementSibling
            answerReadyBlock.classList.add("answer_block")
            answerReadyBlock.id = answerInputBlock.id
            this.id = Number(answerInputBlock.id)
            // this.save()

            let answerBlocks = answerInputBlock.parentElement.querySelectorAll(".comment_block")
            answerBlocks.forEach((answerBlock) => {
                // if (!answerInputBlock) {return}
                if (!answerBlock.classList.contains("answer_block")) {
                    answerBlock.classList.add("answer_block")
                }
            }

            )

            
            answerInputBlock.remove()
            
        }

        

        let answerReadyBlocks = document.querySelectorAll(".answer_block")
        if (!answerReadyBlocks) {return}
        answerReadyBlocks.forEach((answerReadyBlock) => {
            let answerButton = answerReadyBlock.querySelector(".comment_answer_button")
            if (answerButton) {answerButton.remove()}
        })
        

        // let answerInputBlock = document.querySelector(".answer_input_block")
        
        
        // form?.querySelector()
    }
}