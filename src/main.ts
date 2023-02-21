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
        const formComment:HTMLElement | null = document.querySelector(".comment_form")
        const readyComment:HTMLElement | null = document.querySelector(".comment_block")
        const container = document.querySelector(".comment_container")
        const commentElem:HTMLTextAreaElement | null = document.querySelector(".comment")
        const button = document.querySelector(".comment_submit")
        //checkButton()

        commentElem?.addEventListener("input", checkButton)

        function checkButton(): void {
            
                let lenComment = commentElem?.value?.length
                
                if (button) {
                    console.log("длина введенного коммента: ", lenComment)
                    if (!lenComment || lenComment && lenComment > 1000) {
                        button.setAttribute('disabled', '');
                    } else { 
                        button.removeAttribute("disabled")
                    }
                }
            
            
        }
        

        button?.addEventListener ("click", (event) => {
            event?.preventDefault();
            let textComment  = commentElem?.value
            if (readyComment && textComment) {
                const comment = new MyComment();
                comment.create(textComment)
                comment.show(formComment, readyComment)
                comment.clear(commentElem) 
            }
            checkButton(); 
        })

    }

}









// const game = new Game();
// game.prepare().then(() => {
//     game.start()
// })

