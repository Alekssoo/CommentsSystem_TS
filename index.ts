import Main from "./src/main.js";

const main = new Main()
// main.prepare().then(() => {
       main.prepare()
    // })



// const readyComment:HTMLElement | null = document.querySelector(".comment_block")
// const commentElem:HTMLTextAreaElement | null = document.querySelector(".comment")
// const button = document.querySelector(".comment_submit")

// let lenComment = commentElem?.value?.length

// commentElem?.addEventListener("input", () => {
//     if (button) {
//         if (lenComment && lenComment > 1000) {
//             button.setAttribute('disabled', '');
//         } else { 
//             button.removeAttribute("disabled")
//         }
//     }

// })

// button?.addEventListener ("click", (event) => {
//     event?.preventDefault();
//     let textComment  = commentElem?.value
//     if (readyComment && textComment) {
//         const comment = new MyComment();
//         comment.create(readyComment, textComment)
//     } 
// })

// const game = new Game();
// game.prepare().then(() => {
//     game.start()
// })

