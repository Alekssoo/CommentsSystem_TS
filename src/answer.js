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
    show(form, readyComment, accounts) {
    }
    prepare(inputBlockComment) {
        if (!inputBlockComment) {
            return;
        }
        let newAnswerInputBlock = document.createElement("div");
        newAnswerInputBlock.outerHTML = inputBlockComment.outerHTML;
        newAnswerInputBlock.classList.add("answer_input_block");
        console.log(newAnswerInputBlock);
    }
}
