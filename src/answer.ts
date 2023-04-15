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

    public show(form: HTMLElement | null, readyComment: HTMLElement | null, accounts: any[]): void {
        
    }

    public prepare(inputBlockComment:HTMLElement | null) {
        if (!inputBlockComment) {return}
        let newAnswerInputBlock = document.createElement("div")
        newAnswerInputBlock.outerHTML = inputBlockComment.outerHTML
        
        newAnswerInputBlock.classList.add("answer_input_block")
        
        console.log(newAnswerInputBlock)
    }
}