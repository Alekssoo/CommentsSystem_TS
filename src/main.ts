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
        const sortCommentList:NodeListOf<Element> = document.querySelectorAll(".comments_sort_item")
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
            
            if (readyComment && textComment && commentTextElem) {
                
                comment.create(textComment)
                comment.show(formComment, readyComment)
                comment.clear(commentTextElem)
                comment.checkLength(commentTextElem, button, lengthComment, submitAlert)
                commentTextElem.style.height = "61px" 
            }
            this.setButton(commentTextElem, button); 
        })

        
        

        if (sortComment){
            sortComment.addEventListener ("click", (event) => {
                if(!sortComment.classList.contains("active")){
                    sortComment.classList.add("active")
                } else {
                    sortComment.classList.remove("active")
                }

                sortCommentList.forEach((sortType) => {
                    let replacedSort = sortType.textContent?.replace(/✔ /gi, "");
                    sortType.textContent = replacedSort || sortType.textContent
                    console.log("на замену галочки: ", replacedSort)

                    if (!sortType.classList.contains("active")) {
                        sortType.classList.add("active")
                        sortType.textContent = `\u00A0\u00A0\u00A0\u00A0${sortType.textContent}`
                    } else {
                        sortType.classList.remove("active")
                        // sortComment.textContent = sortType.textContent?.replace(/\u00A0\u00a0/g, "") || sortType.textContent;
                        // console.log("на замену пробелов: ", sortType.textContent?.replace(/\u00a0\u00A0/g, ""))
                        sortType.textContent = sortType.textContent?.trim() || sortType.textContent
                    }


                })

                if (sortComment.options[sortComment.selectedIndex] && sortComment.options[sortComment.selectedIndex].classList.contains("active")) {
                    let replacedCurrentSort = sortComment.options[sortComment.selectedIndex].textContent?.replace(/\u00A0\u00A0\u00A0\u00A0/g,"✔ ");
                
                    console.log("с добавленной галочкой: ", replacedCurrentSort)
                    sortComment.options[sortComment.selectedIndex].textContent = replacedCurrentSort || sortComment.options[sortComment.selectedIndex].textContent;  
                }


            })

            sortComment.addEventListener("focusout", () => {
                if(sortComment.classList.contains("active")){
                    sortComment.classList.remove("active")
                }
                sortCommentList.forEach((sortType) => {
                    if (sortType.classList.contains("active")) {
                        sortType.textContent = sortType.textContent?.replace(/✔ /gi, "") || sortType.textContent;
                        sortType.textContent = sortType.textContent?.trim() || sortType.textContent
                        sortType.classList.remove("active")
                    }
                });
                
            })

            commentTextElem?.addEventListener('keyup', function(){
                if(this.scrollTop > 0){
                  this.style.height = `${this.scrollHeight}px`;
                }
              });

            // sortComment.addEventListener ("change", (event) => {
            //     sortCommentList.forEach((sortType) => {
            //         let replacedSort = sortType.textContent?.replace(/✔ /gi, "");
            //         sortType.textContent = replacedSort || null
            //     })
            //     let currentOptionText = sortComment.options[sortComment.selectedIndex].textContent
                    
            //     let currentSort = "✔ " + sortComment.options[sortComment.selectedIndex].textContent;
            //     sortComment.options[sortComment.selectedIndex].textContent = currentSort;
                
            // })

            // sortComment.dataset.el = "✔";
        }
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

