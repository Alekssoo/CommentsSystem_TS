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
        // const container = document.querySelector(".comment_container")
        const commentTextElem:HTMLTextAreaElement | null = document.querySelector(".comment")
        const submitAlert:HTMLButtonElement | null = document.querySelector(".comment_submit_alarm")
        const button:HTMLButtonElement | null = document.querySelector(".comment_submit_button")
        const lengthComment:HTMLElement | null = document.querySelector(".comment_length")
        //checkButton()
        const comment = new MyComment();
        commentTextElem?.addEventListener("input", () =>
            // this.setButton(commentTextElem, button))
            comment.checkLength(commentTextElem, button, lengthComment, submitAlert))
        
        
        
        

        button?.addEventListener ("click", (event) => {
            event?.preventDefault();
            let textComment  = commentTextElem?.value
            
            if (readyComment && textComment) {
                
                comment.create(textComment)
                comment.show(formComment, readyComment)
                comment.clear(commentTextElem) 
            }
            this.setButton(commentTextElem, button); 
        })

    }

    private setButton(textArea:HTMLTextAreaElement | null, button:HTMLElement | null): void {
        
        let lenComment = textArea?.value?.length
                
                if (button) {
                    console.log("длина введенного коммента: ", lenComment)
                    if (!lenComment || lenComment && lenComment > 1000) {
                        button.setAttribute('disabled', '');
                    } else { 
                        button.removeAttribute("disabled")
                    }
                }
        
    }

}









// const game = new Game();
// game.prepare().then(() => {
//     game.start()
// })

