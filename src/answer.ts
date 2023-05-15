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

        console.log("id для нового ответа равен = ", this.id)
        
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

   

    public prepareInputBlock(parentBlock:Element, inputBlockComment:Element | null) {
        if (!inputBlockComment) {return}
        // let parentComment = document.getElementById(idParent)
        let newAnswerInputBlock = document.createElement("div")
        // newAnswerInputBlock.outerHTML = inputBlockComment.outerHTML
        
        
        
        newAnswerInputBlock.classList.add("comment_block", "answer_input_block")
        newAnswerInputBlock.innerHTML =  inputBlockComment.innerHTML;
        // console.log(newAnswerInputBlock)
        let answerButton = newAnswerInputBlock.querySelector(".comment_submit_button")
        if (answerButton) {
            answerButton.classList.add("answer_submit_button")
        }

        let answerTextElem = newAnswerInputBlock.querySelector(".comment")
        if (answerTextElem) {
            answerTextElem.classList.add("answer_input")
        }

        

        if (parentBlock) {
            parentBlock.insertAdjacentHTML('afterend', newAnswerInputBlock.outerHTML);
        }


        
    }

    public show(form: HTMLElement | null, readyblockComment: HTMLElement | null, accounts: any[]): void {
        let answerInputBlock:HTMLElement |null = document.querySelector(".answer_input_block")
        super.show(form, answerInputBlock, accounts)
        if (answerInputBlock) {answerInputBlock.remove()}
        // let answerInputBlock = document.querySelector(".answer_input_block")
        
        
        // form?.querySelector()
    }
}