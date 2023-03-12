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
        const sortComment:HTMLSelectElement | null = document.querySelector(".comments_params_sort")
        // const sortComment:NodeListOf<Element> = document.querySelectorAll(".comments_sort_item")
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

        
        
        sortComment?.addEventListener ("click", (event) => {
            if (sortComment){
                let replacedSort = sortComment.options[sortComment.selectedIndex].textContent?.replace(/✔ /gi, "");
                sortComment.options[sortComment.selectedIndex].textContent = replacedSort || null
                let currentSort = "✔ " + sortComment.options[sortComment.selectedIndex].textContent;
                sortComment.options[sortComment.selectedIndex].textContent = currentSort;
            }
        })

        sortComment?.addEventListener ("change", (event) => {
            let currentOptionText = sortComment.options[sortComment.selectedIndex].textContent
            if (sortComment){
                let replacedSort = sortComment.options[sortComment.selectedIndex].textContent?.replace(/✔ /gi, "");
                sortComment.options[sortComment.selectedIndex].textContent = replacedSort || null
                // sortComment.options[sortComment.selectedIndex].textContent = currentSort;
                
                // let currentSort = "✔ " + sortComment.options[sortComment.selectedIndex].textContent;
                // sortComment.options[sortComment.selectedIndex].textContent = currentSort;
            }
        })
            // sortComment.dataset.el = "✔";
        
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

