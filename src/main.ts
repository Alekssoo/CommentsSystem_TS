import MyComment from "./comment.js";
import Answer from "./answer.js";
import User from "./user.js";

export default class Main {
    constructor() { 
    }

    public prepare():void {
        let section = document.createElement("section")
        this.prepareForm(section)
        document.body.appendChild(section)

        const formComment:HTMLElement | null = document.querySelector(".comment_form")
        const blockComment:HTMLElement | null = document.querySelector(".comment_block")
        // const blockCommentAll = document.querySelectorAll(".comment_block")
        const lenAllComments:HTMLElement | null = document.querySelector(".comments_params_quantity")
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

        this.prepareUsers(user, comment, answer, formComment, blockComment, lenAllComments)

        // commentTextElem?.addEventListener("input", () =>
        //     // this.setButton(commentTextElem, button))
        //     comment.checkLength(commentTextElem, button, lengthComment))
        
        // commentTextElem?.addEventListener('keyup', function() {
        //     if (this.scrollTop > 0){
        //         this.style.height = `${this.scrollHeight}px`;
        //     }
        // });
        this.prepareInputElem(comment, commentTextElem, blockComment, button, lengthComment)
        
        this.prepareSelectSort(sortComment)
        this.prepareButton(formComment, blockComment, comment, user, answer, commentTextElem, lengthComment, lenAllComments, button)
        
        // if (commentAnswerButton && blockComment) {
        //     commentAnswerButton.addEventListener("click", (event) => {
        //         console.log("зашли в реакцию на клик кнопки ответа")
        //         event.preventDefault()
        //         answer.prepare(blockComment.id, blockComment)
                
        //     })
        // }  
        
        document.addEventListener("DOMContentLoaded", () => {
            if (blockComment) {

                // if (commentAnswerButton && blockComment) {
                //     commentAnswerButton.addEventListener("click", (event) => {
                //         event.preventDefault()
                //         answer.prepare(blockComment.id, blockComment)
                        
                //     })
                // }   
                // Подгружаем все комменты после загрузки пользователей
                comment.show(formComment, blockComment, user.accounts)
                // указываем общее количество комментариев на странице
                this.prepareQuantity(lenAllComments, comment.elements)

                // answer.prepare(blockComment)
            }
            

        });    


        // document.addEventListener("load", () => {
        //     if (blockComment) {
        //         // Подгружаем все комменты после загрузки пользователей
        //         comment.show(formComment, blockComment, user.accounts)
        //         // указываем общее количество комментариев на странице
        //         this.prepareQuantity(lenAllComments, comment.elements)
        //     }
        // });
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
                        <div class="comment_container">
                            ${commentMain}
                            ${commentSubmit}
                        </div>
                    </div>
                    
                </div>
            </form>`
    }


    private prepareQuantity(quantity:HTMLElement | null, elements:Array<any>): void {
        if (quantity) {
            quantity.textContent = `(${elements.length})`
        }       
    }


    private prepareButton(formComment:HTMLElement | null , blockComment:HTMLElement | null, comment: MyComment, user: User, answer:Answer, textArea:HTMLTextAreaElement | null, lengthTextElem:HTMLElement | null, lenAllComments:HTMLElement | null, button:HTMLButtonElement | null): void {
        //добавляем создание коммента с условиями по нажатию кнопки
        // const buttonsSubmit = document.querySelectorAll(".comment_submit_button")

        // for(let buttonSubmit of buttonsSubmit) {
        //     buttonSubmit?.addEventListener ("click", (event) => {
        //         event?.preventDefault();
                
        //         let textComment  = textArea?.value

        //         if (blockComment && textComment && textArea) {
        //             if (buttonSubmit.classList.contains("answer_submit_button")) {
        //                 answer.create(textComment, user.name)
        //             } else {
        //                 comment.create(textComment, user.name)
        //                 comment.show(formComment, blockComment, user.accounts)
        //                 comment.clear(textArea)
        //                 comment.checkLength(textArea, button, lengthComment)
        //                 textArea.style.height = "61px" 
        //             }
        //         }
    
        //         //меняем состояние кнопки в зависимости от длины введенного текста польз-м
        //         let lenComment = textArea?.value?.length
                    
        //         if (buttonSubmit) {
        //             if (!lenComment || lenComment && lenComment > comment.maxlength) {
        //                 buttonSubmit.setAttribute('disabled', '');
        //             } else { 
        //                 buttonSubmit.removeAttribute("disabled")
        //             }
        //         }
        //         this.prepareQuantity(lenAllComments, comment.elements)
    
        //         this.prepareAnswers(answer, user, comment, blockComment, lenAllComments)
        //     })
        // }
        
        button?.addEventListener ("click", (event) => {
            event?.preventDefault();
            
            let textComment  = textArea?.value
            
            if (blockComment && textComment && textArea) {
                comment.create(textComment, user.name)
                comment.show(formComment, blockComment, user.accounts)
                comment.clear(textArea)
                comment.checkLength(textArea, button, lengthTextElem)
                textArea.style.height = "61px" 
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
            this.prepareQuantity(lenAllComments, comment.elements)

            this.prepareAnswers(answer, user, comment, blockComment, lenAllComments)
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

    private prepareUsers(user:User, comment:MyComment, answer:Answer, formComment:HTMLElement | null, blockComment:HTMLElement | null, lenAllComments:HTMLElement | null):void {
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
            
            this.prepareComments(user, comment, answer, formComment, blockComment, lenAllComments)
            this.prepareAnswers(answer, user, comment, blockComment, lenAllComments)
        }) .catch(() => {
            if (commentPhoto && commentPhotoMob) {
                commentPhoto.src = "/sources/user.png"
                commentPhotoMob.src = "/sources/user.png"
            }
        })

    } 

    private prepareComments(user:User, comment:MyComment, answer:Answer, formComment:HTMLElement | null, blockComment:HTMLElement | null, quantity:HTMLElement | null):void {
        //создаем и публикуем комментарии других пользователей
        // для примера ограничимся максимум 50-ю ком-ми
        const commentAnswerButtons = document.querySelectorAll(".comment_answer_button")
        // const blockCommentAll = document.querySelectorAll(".comment_block")    
        for (let account of user.accounts) {
            if (comment.elements.length < 50) {
                comment.create(comment.prepareText(), account.name)
            } else {
                break
            }
        }

        comment.show(formComment, blockComment, user.accounts)
        


        // if (commentAnswerButtons && blockComment) {
        //     commentAnswerButtons.forEach((button)=>{
        //         // console.log("кнопка ответа = ", button)
        //         button.addEventListener("click", (event) => {
        //             console.log("зашли в реакцию на клик кнопки ответа")
        //             event.preventDefault()
        //             answer.prepare(blockComment.id, blockComment)                   
        //         })
        //     })  
        // }
        this.prepareQuantity(quantity, comment.elements)
    }

    private prepareAnswers(answer:Answer, user: User, comment:MyComment, blockComment:HTMLElement | null, lenAllComments: HTMLElement | null) {
        const formComment:HTMLElement | null = document.querySelector(".comment_form")
        const blockCommentAll = document.querySelectorAll(".comment_block") 
        // добавляем отображение формы ответа по кнопке в комментах
        if (blockCommentAll) {
            for (let block of blockCommentAll) {
                if (block.id == "input_block") {continue}

                const commentAnswerButton:HTMLButtonElement | null = block.querySelector(".comment_answer_button")
                
                if (!commentAnswerButton) return;
                let prepareAnswerInputForm = () => {
                    // если блок ввода ответа на коммента уже существует, завершаем, не создавая новый
                    if (document.querySelector(".answer_input_block")) {return}

                    answer.prepare(block, blockComment)
                    
                    const answerInputBlock = document.querySelector(".answer_input_block")
                    if (!answerInputBlock) {
                        console.log("Нет блока ввода коммента в искомом блоке")
                        return;
                    }

                    console.log("Нашли блок ввода коммента в искомом блоке: ", answerInputBlock)

                    const textArea:HTMLTextAreaElement | null  = answerInputBlock.querySelector(".answer_input")
                    const answerSubmitButton:HTMLButtonElement | null = answerInputBlock.querySelector(".answer_submit_button")
                    if (!answerSubmitButton) {
                        console.log("Нет кнопки, не заходим в обработку клика")
                        return;
                    }

                    const lengthAnswerElem:HTMLElement | null = answerInputBlock.querySelector(".comment_length")
                    if (!lengthAnswerElem) {
                        console.log("Нет элемента с длиной ответа")
         
                    }

                    console.log("Нашли кнопку в блоке ответа: ", answerSubmitButton)
                    console.log("Нашли textArea в форме ответа: ", textArea)

                    // let textComment  = textArea?.value

                    this.prepareButton(formComment, blockComment, comment, user, answer, textArea, lengthAnswerElem, lenAllComments, answerSubmitButton)

                    // answerSubmitButton.addEventListener ("click", (event) => {
                    //     event?.preventDefault();
                    //     console.log("заходим в обработку клика")
                        
        
                    //     if (blockComment && textComment && textArea) {
                    //         answer.create(textComment, user.name)
                    //         textArea.style.height = "61px" 
                    //     }
            
                    //     //меняем состояние кнопки в зависимости от длины введенного текста польз-м
                    //     let lenComment = textArea?.value?.length
                            
                    //     if (!lenComment || lenComment && lenComment > answer.maxlength) {
                    //         answerSubmitButton.setAttribute('disabled', '');
                    //         console.log("блокируем кнопку")
                    //     } else { 
                    //         answerSubmitButton.removeAttribute("disabled")
                    //         console.log("разблокируем кнопку")
                    //     }

                    //     this.prepareQuantity(lenAllComments, comment.elements)
            
                    //     this.prepareAnswers(answer, user, comment, blockComment, lenAllComments)

                        

                    // })

                    this.prepareInputElem(answer, textArea, blockComment, answerSubmitButton, lengthAnswerElem)
                }
                commentAnswerButton.addEventListener("click", prepareAnswerInputForm)
                commentAnswerButton.addEventListener("click", () => {
                    commentAnswerButton.removeEventListener("click", prepareAnswerInputForm)
                })
                // подготовка реакции кнопки в форме ответа на нажатие, ввод и т.п. 

                // const answerSubmitButton = block.querySelector(".answer_submit_button")
                // if (!answerSubmitButton) {
                //     console.log("Нет кнопки, не заходим в обработку клика")
                //     return;
                
                // }

                // answerSubmitButton.addEventListener ("click", (event) => {
                //     event?.preventDefault();
                //     console.log("заходим в обработку клика")
                //     let textComment  = textArea?.value
    
                //     if (blockComment && textComment && textArea) {
                //         answer.create(textComment, user.name)
                //         textArea.style.height = "61px" 
                //     }
        
                //     //меняем состояние кнопки в зависимости от длины введенного текста польз-м
                //     let lenComment = textArea?.value?.length
                        
                //     if (!lenComment || lenComment && lenComment > answer.maxlength) {
                //         answerSubmitButton.setAttribute('disabled', '');
                //     } else { 
                //         answerSubmitButton.removeAttribute("disabled")
                //     }

                //     this.prepareQuantity(lenAllComments, comment.elements)
        
                //     this.prepareAnswers(answer, user, comment, blockComment, lenAllComments)
                

            }

        }
    }

    private prepareInputElem(comment:MyComment | Answer, commentTextElem:HTMLTextAreaElement | null, blockComment:HTMLElement | null, button:HTMLButtonElement | null, lengthCommentElem:HTMLElement | null):void {
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




