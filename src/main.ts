import MyComment from "./comment.js";
import User from "./user.js";

export default class Main {
    constructor() { 
    }

    public prepare():void {
        
        const lenAllComments:HTMLElement | null = document.querySelector(".comments_params_quantity")
        const sortComment:HTMLSelectElement | null = document.querySelector(".comments_params_sort")
        // const sortCommentList:NodeListOf<Element> = document.querySelectorAll(".comments_sort_item")
        // const container = document.querySelector(".comment_container")
        
        const commentTextElem:HTMLTextAreaElement | null = document.querySelector(".comment")
        // const submitAlert:HTMLButtonElement | null = document.querySelector(".comment_submit_alarm")
        const button:HTMLButtonElement | null = document.querySelector(".comment_submit_button")
        const lengthComment:HTMLElement | null = document.querySelector(".comment_length")
        
        //checkButton()
        const user = new User();
        this.prepareUser(user)
        
        const comment = new MyComment();

        // указываем общее количество комментариев на странице
        this.prepareQuantity(lenAllComments, comment.elements)

        commentTextElem?.addEventListener("input", () =>
            // this.setButton(commentTextElem, button))
            comment.checkLength(commentTextElem, button, lengthComment))
        
        commentTextElem?.addEventListener('keyup', function(){
            if(this.scrollTop > 0){
                this.style.height = `${this.scrollHeight}px`;
            }
        });
        
        this.prepareSelectSort(sortComment)
        this.prepareButton(comment, user, commentTextElem, lengthComment, lenAllComments, button)
        
    }


    private prepareQuantity(quantity:HTMLElement | null, elements:Array<any>): void {
        if (quantity) {
            quantity.textContent = `(${elements.length})`
        }       
    }


    private prepareButton(comment:MyComment,user: User, textArea:HTMLTextAreaElement | null, lengthComment:HTMLElement | null, lenAllComments:HTMLElement | null, button:HTMLButtonElement | null): void {
        const formComment:HTMLElement | null = document.querySelector(".comment_form")
        const blockComment:HTMLElement | null = document.querySelector(".comment_block")
        
        button?.addEventListener ("click", (event) => {
            event?.preventDefault();
            
            let textComment  = textArea?.value
            
            if (blockComment && textComment && textArea) {
                comment.create(textComment, user.name)
                comment.show(formComment, blockComment)
                comment.clear(textArea)
                comment.checkLength(textArea, button, lengthComment)
                textArea.style.height = "61px" 
            }
            let lenComment = textArea?.value?.length
                
            if (button) {
                if (!lenComment || lenComment && lenComment > comment.maxlength) {
                    button.setAttribute('disabled', '');
                } else { 
                    button.removeAttribute("disabled")
                }
            }
            this.prepareQuantity(lenAllComments, comment.elements)
        })

        
    }


    private prepareSelectSort(sortComment:HTMLSelectElement | null): void {
        
        if (sortComment){
             
            const sortCommentList:NodeListOf<Element> = sortComment.querySelectorAll("option")
            // добавляем и убираем класс по первому(открытие) и второму клику (закрытие) 
            sortComment.addEventListener ("click", (event) => {
                if(!sortComment.classList.contains("active")){
                    sortComment.classList.add("active")
                } else {
                    sortComment.classList.remove("active")
                }

                sortCommentList.forEach((sortType) => {
                    // и также по кликам перебираем каждый option, добавляем/убираем галочки и отступы
                    let replacedTextOption = sortType.textContent?.replace(/✔ /gi, "");
                    sortType.textContent = replacedTextOption || sortType.textContent
                    // console.log("на замену галочки: ", replacedSort)

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

                // заменяем на галочку отступ в текущем option

                if (sortComment.options[sortComment.selectedIndex] && sortComment.options[sortComment.selectedIndex].classList.contains("active")) {
                    let replacedCurrentSort = sortComment.options[sortComment.selectedIndex].textContent?.replace(/\u00A0\u00A0\u00A0\u00A0/g,"✔ ");
                
                    // console.log("с добавленной галочкой: ", replacedCurrentSort)
                    sortComment.options[sortComment.selectedIndex].textContent = replacedCurrentSort || sortComment.options[sortComment.selectedIndex].textContent;  
                }


            })

            //убираем лишнее в option также при потере фокуса с select

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
        }
        
    }


    private prepareUser(user:User):void {
        const userName:HTMLElement | null = document.querySelector(".comment_username")
        const commentPhoto:HTMLImageElement | null = document.querySelector(".comment_photo_img")
        const commentPhotoMob:HTMLImageElement | null = document.querySelector(".comment_photo_mob")

        user.create("Ivan3000")
        if (userName) {
            userName.textContent = user.name
        }
        user.addPhoto('https://picsum.photos/61/61')
        .then(() => {
            if (commentPhoto && commentPhotoMob) {
                commentPhoto.src = user.photo
                commentPhotoMob.src = user.photo
                console.log("user.photo = ", user.photo)
            }
        }) .catch(() => {
            if (commentPhoto && commentPhotoMob) {
                commentPhoto.src = "/sources/user.png"
                commentPhotoMob.src = "/sources/user.png"
            }
        })
    } 

}




