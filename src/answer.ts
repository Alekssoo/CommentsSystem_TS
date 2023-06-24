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
        // console.log("зашли в метод подготовки инпута ответа")
        if (document.querySelector(".answer_input_block")) {document.querySelector(".answer_input_block")?.remove()}

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

    public prepareReadyBlockComment(parentBlock:Element | null, answer:any, accounts:Array<any>): HTMLDivElement {
        let readyAnswerBlock = super.prepareReadyBlockComment(parentBlock, answer, accounts)
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
        
        let readyBlockComment = this.prepareReadyBlockComment(parentBlock, answer, accounts)
        readyBlockComment.id = answer.id

        const answersBlock:HTMLElement |null = parentBlock.querySelector(".comment_answers")
        if (answersBlock) {
            answersBlock.insertAdjacentHTML('afterbegin', readyBlockComment.outerHTML);
        }
        
    }

    protected prepareLabelPart(parentBlock: Element | null, labelElem:HTMLLabelElement | null, newReadyCommentBlock:HTMLElement, comment:any, accounts:any) {
        super.prepareLabelPart(parentBlock, labelElem, newReadyCommentBlock, comment, accounts)
        if (labelElem && labelElem.dataset.el) {
            labelElem.dataset.el = ""
        // console.log("родит. блок ответа: ", parentBlock)
        if (!parentBlock) {return}
        let authorParent = parentBlock.querySelector(".comment_username")?.textContent
        // console.log("автор родит. блока ответа: ", authorParent)
        // let authorParentElem = document.createElement("span")
        labelElem.innerHTML = `
            <span class="comment_label_content">${labelElem.textContent} <span class="comment_datetime_mobile opacity_text small_text">${comment.time}</span>
                <span class ="comment_labelIcon opacity_text">    
                    <svg width='21' height='20' id='svg7384' xmlns:osb='http://www.openswatchbook.org/uri/2009/osb' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#' xmlns='http://www.w3.org/2000/svg' viewBox="0 0 14 14" style="margin-right:10px">
                        <g id='layer12' style='display:inline' transform='translate(-265.00039,-60.996639)'>
                            <path d='m 272.0004,62.5 -6.46875,4.5 6.46875,4.5 0,-2.5 2,0 c 1.36491,0 2.5716,0.87335 2.9375,2 0.43763,1.34754 -1.4375,4 -1.4375,4 0,0 4,-1.5 4,-4.75 0,-3.12352 -2,-5.25 -5,-5.25 l -2.5,0 z' id='path4400-3' sodipodi:nodetypes='ccccsscsscc' style='color:#bebebe;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:normal;font-family:Sans;-inkscape-font-specification:Sans;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;letter-spacing:normal;word-spacing:normal;text-transform:none;direction:ltr;block-progression:tb;writing-mode:lr-tb;baseline-shift:baseline;text-anchor:start;display:inline;overflow:visible;visibility:visible;opacity:0.5;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0;marker:none;enable-background:accumulate'/>
                        </g>
                    </svg>
                    ${authorParent}
                    <span class="comment_datetime small_text">${comment.time}</span>
                </span>
            </span>`
        // authorParentElem.classList.add("comment_labelIcon", "opacity_text")
        // labelElem.innerHTML += authorParentElem.innerHTML
        // labelElem?.insertAdjacentElement("afterend", authorParentElem)
        }
    }

    public showAll(readyBlockComment:Element | null, accounts:Array<any>): void {
        this.load()
        for (let answer of this.elements) {
            if (document.getElementById(`${answer.id}`)) {
                // console.log('уже есть элемент с таким id = ', answer.id)
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