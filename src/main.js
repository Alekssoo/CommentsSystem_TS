import MyComment from "./comment.js";
export default class Main {
    // public name: string; 
    // public photo: string; 
    constructor() {
        // this.name = "";
        // this.photo = ""; // возможно, позже сделать fetch
    }
    prepare() {
        const readyComment = document.querySelector(".comment_block");
        const container = document.querySelector(".comment_container");
        const commentElem = document.querySelector(".comment");
        const button = document.querySelector(".comment_submit");
        commentElem === null || commentElem === void 0 ? void 0 : commentElem.addEventListener("input", () => {
            var _a;
            let lenComment = (_a = commentElem === null || commentElem === void 0 ? void 0 : commentElem.value) === null || _a === void 0 ? void 0 : _a.length;
            if (button) {
                if (lenComment && lenComment > 1000) {
                    button.setAttribute('disabled', '');
                }
                else {
                    button.removeAttribute("disabled");
                }
            }
        });
        button === null || button === void 0 ? void 0 : button.addEventListener("click", (event) => {
            event === null || event === void 0 ? void 0 : event.preventDefault();
            let textComment = commentElem === null || commentElem === void 0 ? void 0 : commentElem.value;
            if (readyComment && textComment) {
                const comment = new MyComment();
                comment.create(readyComment, textComment);
            }
        });
    }
}
// const game = new Game();
// game.prepare().then(() => {
//     game.start()
// })
