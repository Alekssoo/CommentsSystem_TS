import MyComment from "./comment.js";
import User from "./user.js";

export default class Main {
    // public name: string; 
    // public photo: string; 
    constructor() { 
        // this.name = "";
        // this.photo = ""; // возможно, позже сделать fetch
    }

    public prepare():void {
        const readyComment:HTMLElement | null = document.querySelector(".comment_block")
        const container = document.querySelector(".comment_container")
        const commentElem:HTMLTextAreaElement | null = document.querySelector(".comment")
        const button = document.querySelector(".comment_submit")

        commentElem?.addEventListener("input", () => {
            let lenComment = commentElem?.value?.length
            
            if (button) {
                if (lenComment && lenComment > 1000) {
                    button.setAttribute('disabled', '');
                } else { 
                    button.removeAttribute("disabled")
                }
            }
        
        })

        button?.addEventListener ("click", (event) => {
            event?.preventDefault();
            let textComment  = commentElem?.value
            if (readyComment && textComment) {
                const comment = new MyComment();
                comment.create(readyComment, textComment) 
            } 
        })

    }

}









// const game = new Game();
// game.prepare().then(() => {
//     game.start()
// })

