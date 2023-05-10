import MyComment from "./comment.js";
export default class Answer extends MyComment {
    constructor() {
        super();
        this.elements = [];
    }
    create(text, author) {
        this.load();
        this.id = this.elements.length;
        this.setTime(Math.floor(Date.now() / 1000));
        this.text = text;
        this.author = author;
        console.log("id для нового ответа равен = ", this.id);
        this.elements.push({
            id: this.id,
            author: this.author,
            text: this.text,
            rating: this.rating,
            time: this.time,
        });
        this.save();
        console.log(`создали ответ с id = ${this.id}`);
    }
    prepare(parentBlock, inputBlockComment) {
        if (!inputBlockComment) {
            return;
        }
        // let parentComment = document.getElementById(idParent)
        let newAnswerInputBlock = document.createElement("div");
        // newAnswerInputBlock.outerHTML = inputBlockComment.outerHTML
        newAnswerInputBlock.classList.add("comment_block", "answer_input_block");
        newAnswerInputBlock.innerHTML = inputBlockComment.innerHTML;
        // console.log(newAnswerInputBlock)
        let answerButton = newAnswerInputBlock.querySelector(".comment_submit_button");
        if (answerButton) {
            answerButton.classList.add("answer_submit_button");
        }
        let answerTextElem = newAnswerInputBlock.querySelector(".comment");
        if (answerTextElem) {
            answerTextElem.classList.add("answer_input");
        }
        if (parentBlock) {
            parentBlock.insertAdjacentHTML('afterend', newAnswerInputBlock.outerHTML);
        }
    }
    show(form, readyComment, accounts) {
    }
}
