import MyComment from "./src/comment.js";

const readyComment:HTMLElement | null = document.querySelector(".comment_block")
const container = document.querySelector(".comment_container")
const commentElem:HTMLTextAreaElement | null = document.querySelector(".comment")
const button = document.querySelector(".comment_submit")

let lenComment = commentElem?.value?.length
let textComment  = commentElem?.value
commentElem?.addEventListener("input", () => {
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
    if (readyComment) {
        // button.removeAttribute("disabled")
        const comment = new MyComment();
        // if (readyComment) {
        comment.create(readyComment)
        // } 
     
    } 
    // else {
    //     button.setAttribute('disabled', '');
    // }
})

// const game = new Game();
// game.prepare().then(() => {
//     game.start()
// })

