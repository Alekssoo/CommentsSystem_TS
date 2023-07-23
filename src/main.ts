import MyComment from "./comment.js";
import Answer from "./answer.js";
import User from "./user.js";

export default class Main {
    public quantity:Number;

    constructor() {
        this.quantity = 0
    }

    public prepare():void {
        let section = document.createElement("section")
        this.prepareForm(section)
        document.body.appendChild(section)

        // const formComment:HTMLElement | null = document.querySelector(".comment_form")
        const blockComment:HTMLElement | null = document.querySelector(".comment_block")
        let blockCommentAll = document.querySelectorAll(".comment_block")
        const lenAllCommentsElem:HTMLElement | null = document.querySelector(".comments_params_quantity")
        const sortComment:HTMLSelectElement | null = document.querySelector(".comments_params_sort")
        // const sortCommentList:NodeListOf<Element> = document.querySelectorAll(".comments_sort_item")
        // const container = document.querySelector(".comment_container")
        const commentTextElem:HTMLTextAreaElement | null = document.querySelector(".comment")
        // const submitAlert:HTMLButtonElement | null = document.querySelector(".comment_submit_alarm")
        const button:HTMLButtonElement | null = document.querySelector(".comment_submit_button")
        const lengthComment:HTMLElement | null = document.querySelector(".comment_length")
        // const commentAnswerButton:HTMLElement | null = document.querySelector(".comment_answer_button")
        
        const user = new User();
        const comment = new MyComment();
        const answer = new Answer();

        this.prepareUsers(user, comment, answer, blockComment, lenAllCommentsElem)

        this.prepareInputElem(comment, commentTextElem, button, lengthComment)
        this.prepareSelectSort(sortComment)
        this.prepareButtons(blockComment, comment, user, answer, commentTextElem, lengthComment, lenAllCommentsElem, button) 
        


        document.addEventListener("DOMContentLoaded", () => {
            if (blockComment) {
                // Подгружаем все комменты после загрузки пользователей
                comment.showAll(blockComment, user.accounts)
                answer.showAll(blockCommentAll[1], user.accounts)
                // указываем общее количество комментариев на странице
                this.prepareQuantity(lenAllCommentsElem, comment.elements, answer.elements)
                // this.prepareButtons(blockComment, comment, user, answer, commentTextElem, lengthComment, lenAllCommentsElem, button) 
            }
            

        });    
    }

    prepareForm(container:HTMLElement):void {
        let select = `
            <div class="comments_params_wrapper">     
                <select class="comments_params_sort opacity_text">
                    <option value="date" class="comments_sort_item">По дате</option>
                    <option value="ratings" class="comments_sort_item">По количеству оценок</option>
                    <option value="actual" class="comments_sort_item" selected>По актуальности</option>
                    <option value="answers" class="comments_sort_item">По количеству ответов</option>
                </select>
            </div>`
    
        let params = `
            <div class="comments">
                <ul class="comments_params">
                    <li class="comments_params_item">
                        <span class="comments_params_main">Комментарии <span class="comments_params_quantity"></span></span>
                    </li>
                    <li class="comments_params_item">
                        ${select}
                    </li>
                    <li class="comments_params_item"><a href="" class="comments_params_link opacity_text small_text">Избранное</a></ul>
                </ul>
            </div>`

        let commentMain = `
            <div class="comment_main">
                <div class="comment_main_head">
                    <img src="/sources/user.png" width="50" height="50" alt="user_photo" class="comment_head_item comment_photo_mob">
                    <label for="comment" class ="comment_head_item comment_username">Ник_пользователя</label>
                    <span class="comment_length opacity_text small_text"><em>Макс. 1000 символов</em></span>
                </div>
                <textarea placeholder="Введите текст сообщения..." name="comment" class="comment"></textarea>
            </div>`

        let commentSubmit = `
            <div class="comment_submit">       
                <button type="submit" class="comment_submit_button" disabled>Отправить</button>
                <!-- <p class="comment_submit_alarm alarm_text">Слишком длинное сообщение</p> -->
            </div>`
        

        container.innerHTML = `
            <form action="./" class ="comment_form">
                <hr class="comments_line">
                ${params}
                <div class="comment_block" id="input_block">
                    <div class="comment_photo">
                        <img src="/sources/user.png" width="61" height="61" alt="user_photo" class="comment_photo_img">
                    </div>
                    <div class="comment_content">
                            ${commentMain}
                            ${commentSubmit}
                    </div>
                </div>
            </form>`
    }


    private prepareQuantity(quantity:HTMLElement | null, commentElements:Array<any>, answerElements:Array<any>): void {
        this.quantity = commentElements.length + answerElements.length
        console.log("количество коментов", commentElements.length)
        console.log("количество ответов", answerElements.length)
        if (quantity) {
            quantity.textContent = `(${this.quantity})`
        }       
    }


    private prepareButtons(blockComment:HTMLElement | null, comment: MyComment, user: User, answer:Answer, textArea:HTMLTextAreaElement | null, lengthTextElem:HTMLElement | null, lenAllComments:HTMLElement | null, button:HTMLButtonElement | null): void {
        // if (blockComment) {
        //     const commentRatingPlusButton = blockComment.querySelector(`.comment_rating_button[data-change="plus"]`)
        //     const commentRatingMinusButton = blockComment.querySelector(`.comment_rating_button[data-change="minus"]`)
        //     // for (let ratingButton of commentRatingButtons) {
        //     if (commentRatingPlusButton && commentRatingMinusButton) {
        //         commentRatingPlusButton.addEventListener("click", ()=> {
        //             console.log("зашли в обработку плюса")         
        //             comment.changeRating(blockComment, <HTMLElement>commentRatingPlusButton) 
        //         })
        //         commentRatingMinusButton.addEventListener("click", ()=> {
        //             console.log("зашли в обработку минуса")          
        //             comment.changeRating(blockComment, <HTMLElement>commentRatingMinusButton) 
        //         })
        //     }
        //         // }
        // }

        button?.addEventListener ("click", (event) => {
            
            let textComment  = textArea?.value
            
            if (blockComment && textComment && textArea) {
                if (button.classList.contains("answer_submit_button")) {
                    answer.create(textComment, user.name)
                    answer.showAll(blockComment, user.accounts)
                
                } else {
                    comment.create(textComment, user.name)
                    comment.showAll(blockComment, user.accounts)
                    comment.clear(textArea)
                    comment.checkLength(textArea, button, lengthTextElem)
                    textArea.style.height = "61px" 
                }
            }

            //меняем состояние кнопки в зависимости от длины введенного текста польз-м
            let lenComment = textArea?.value?.length
                
            if (button) {
                if (!lenComment || lenComment && lenComment > comment.maxlength) {
                    button.setAttribute('disabled', '');
                } else { 
                    button.removeAttribute("disabled")
                }
            }
            this.prepareQuantity(lenAllComments, comment.elements, answer.elements)

            this.prepareComments(user, comment, answer, blockComment, lenAllComments)
            this.prepareAnswers(answer, user, comment, blockComment, lenAllComments)
        })

       
        
    }

    private prepareRatingButtons(blockComment:HTMLElement | null, comment: MyComment, answer:Answer, button:HTMLButtonElement | null): void {
        // if (button && button.classList.contains("comment_rating_button")){
        //     button?.addEventListener ("click", (event) => {
        //         event?.preventDefault();
        //         return
        //     })
        // }
        button?.addEventListener ("click", (event) => {
            event?.preventDefault();

        })
    }


    private prepareSelectSort(sortComment:HTMLSelectElement | null): void {
        
        if (sortComment) {
             
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

    private prepareUsers(user:User, comment:MyComment, answer:Answer, blockComment:HTMLElement | null, lenAllComments:HTMLElement | null):void {
        const userName:HTMLElement | null = document.querySelector(".comment_username")
        const commentPhoto:HTMLImageElement | null = document.querySelector(".comment_photo_img")
        const commentPhotoMob:HTMLImageElement | null = document.querySelector(".comment_photo_mob")

        //обрабатываем промис для создания пользователей
        // и оформляем 
        user.create('https://randomuser.me/api/?results=5')
        .then(() => {
            if (userName) {
                userName.textContent = user.name
            }
            if (commentPhoto && commentPhotoMob) {
                    commentPhoto.src = user.photo
                    commentPhotoMob.src = user.photo
                    // console.log("user.photo = ", user.photo)
            }

           
            this.generateComments(user, comment)
            this.prepareComments(user, comment, answer, blockComment, lenAllComments)
            this.generateAnswers(answer, user, comment, blockComment)
            this.prepareAnswers(answer, user, comment, blockComment, lenAllComments)
        }) .catch(() => {
            if (commentPhoto && commentPhotoMob) {
                commentPhoto.src = "/sources/user.png"
                commentPhotoMob.src = "/sources/user.png"
            }
        })

    } 

    private generateComments(user:User, comment:MyComment):void {
        //создаем и публикуем комментарии других пользователей
        let randInd:number = Math.floor(Math.random()*((user.accounts.length-1)+1))
        comment.create(comment.prepareText(), user.accounts[randInd].name)
        //повторяем, чтобы сгенерить больше комментариев
        let randInd2:number = Math.floor(Math.random()*((user.accounts.length-1)+1))
        comment.create(comment.prepareText(), user.accounts[randInd2].name)
        let randInd3:number = Math.floor(Math.random()*((user.accounts.length-1)+1))
        comment.create(comment.prepareText(), user.accounts[randInd3].name)
    }

    private prepareComments(user:User, comment:MyComment, answer:Answer, blockComment:HTMLElement | null, quantity:HTMLElement | null):void {

        comment.showAll(blockComment, user.accounts)

         // подготавливаем кнопки рейтинга комментов 
         const blockCommentAll = document.querySelectorAll(".comment_block")
         if (blockCommentAll) {
             for (let block of blockCommentAll) {
                 //пропускаем основной блок ввода
                 if (block.id == "input_block" || block.classList.contains("answer_block")) { continue }

                 comment.changeRating(block, <HTMLElement>blockComment, user.rated)
                //  user.changeRated(String(block.id)) 
                //  console.log("зашли в обработку блока коммента и возможно проставили рейтинг и его цвет")  
 
                 const commentRatingPlusButton = block.querySelector(`.comment_rating_button[data-change="plus"]`)
                 const commentRatingMinusButton = block.querySelector(`.comment_rating_button[data-change="minus"]`)
                 // for (let ratingButton of commentRatingButtons) {
                 if (commentRatingPlusButton && commentRatingMinusButton) {
                     commentRatingPlusButton.addEventListener("click", ()=> {
                        //  console.log("зашли в обработку плюса")
                        // user.load()      
                        comment.changeRating(block, <HTMLElement>commentRatingPlusButton, user.rated)
                        user.changeRated(String(block.id)) 
                        // user.save() 
                     })
                     commentRatingMinusButton.addEventListener("click", ()=> {
                        //  console.log("зашли в обработку минуса")
                        // user.load()          
                        comment.changeRating(block, <HTMLElement>commentRatingMinusButton, user.rated)
                        user.changeRated(String(block.id)) 
                        // user.save() 
                     })
                 }
                 
                 const commentFavorButton = block.querySelector(`.comment_favor`)
                 if (commentFavorButton) {
                     commentFavorButton.addEventListener("click", ()=> {
                        //  console.log("зашли в обработку клика избранного")
                        // user.load() 
                        user.changeFavorites(String(block.id))         
                        comment.changeFavorButton(block, <HTMLElement>commentFavorButton)
                        // user.save() 
                     })
                 }
             }
         }

        
        this.prepareQuantity(quantity, comment.elements, answer.elements)
    }

    private generateAnswers(answer:Answer, user: User, comment:MyComment, blockComment:HTMLElement | null) {
        //генерим случайные ответы на случайные комменты
        answer.createRandom(answer.prepareText(), comment.elements.length, user.accounts)
        answer.showAll(blockComment, user.accounts)
        answer.createRandom(answer.prepareText(), comment.elements.length, user.accounts)
        answer.showAll(blockComment, user.accounts)
    }

    private prepareAnswers(answer:Answer, user: User, comment:MyComment, blockComment:HTMLElement | null, lenAllComments: HTMLElement | null) {

        const blockCommentAll = document.querySelectorAll(".comment_block") 
        const inputBlock:HTMLElement | null = document.getElementById("input_block")
        // добавляем отображение формы ответа по кнопке в комментах
        if (blockCommentAll) {
            for (let block of blockCommentAll) {
                //пропускаем основной блок ввода
                if (block.id == "input_block") { continue }

                
                if (block.classList.contains("answer_block")) {
                    //подготовка кнопок рейтингов (цикл нужен так как кнопка рейтинга не одна)
                    comment.changeRating(block, <HTMLElement>blockComment, user.rated) 
                    const commentRatingButtons = block.querySelectorAll(".comment_rating_button")
                    for (let ratingButton of commentRatingButtons) {
                        ratingButton.addEventListener("click", ()=> {  
                            // console.log("зашли в обработку клика кнопки рейтинга для ответа")
                                   
                            // user.load() 
                            answer.changeRating(block, <HTMLElement>ratingButton, user.rated)
                            user.changeRated(String(block.id))
                            // user.save() 
                        })
                    }

                    //подготовка кнопок избранного
                    const commentFavorButtons = block.querySelectorAll(`.comment_favor`)
                    for (let commentFavorButton of commentFavorButtons) {
                        commentFavorButton.addEventListener("click", ()=> {
                            // console.log("зашли в обработку избранного для ответа")
                            // user.load()
                            user.changeFavorites(String(block.id))          
                            answer.changeFavorButton(block, <HTMLElement>commentFavorButton)
                            // user.save() 
                        })
                    }

                    // еще прописать свойство избранного в пользователе и проверку
                }



                //подготовка кнопок ответа
                const commentAnswerButton:HTMLButtonElement | null = block.querySelector(".comment_answer_button")
                
                if (!commentAnswerButton) { continue }
                let prepareAnswerInputForm = () => {
                    // если блок ввода ответа на коммента уже существует, завершаем, не создавая новый
                    // console.log("зашли в подготовку инпута ответа")
                    // if(document.querySelector(".answer_input_block")) {document.querySelector(".answer_input_block")?.remove()}
                    answer.prepareInputBlock(inputBlock, block)
                    
                    
                    const answerInputBlock = block.querySelector(".answer_input_block")
                    if (!answerInputBlock) { return }

                    // console.log("Нашли блок ввода коммента в искомом блоке: ", answerInputBlock)

                    const textArea:HTMLTextAreaElement | null  = answerInputBlock.querySelector(".answer_input")
                    const answerSubmitButton:HTMLButtonElement | null = answerInputBlock.querySelector(".answer_submit_button")

                    if (!answerSubmitButton) {
                        // console.log("Нет кнопки, не заходим в обработку клика")
                        return;
                    }

                    const lengthAnswerElem:HTMLElement | null = answerInputBlock.querySelector(".comment_length")

                    this.prepareButtons(blockComment, comment, user, answer, textArea, lengthAnswerElem, lenAllComments, answerSubmitButton)
                    this.prepareInputElem(answer, textArea, answerSubmitButton, lengthAnswerElem)
                } 

                commentAnswerButton.addEventListener("click", prepareAnswerInputForm)
            } 

        }
    }

    private prepareInputElem(comment:MyComment | Answer, commentTextElem:HTMLTextAreaElement | null, button:HTMLButtonElement | null, lengthCommentElem:HTMLElement | null):void {
        commentTextElem?.addEventListener("input", () =>
        // this.setButton(commentTextElem, button))
        comment.checkLength(commentTextElem, button, lengthCommentElem))
    
        commentTextElem?.addEventListener('keyup', function() {
            if (this.scrollTop > 0) {
                this.style.height = `${this.scrollHeight}px`;
            }
        });
    }



}




