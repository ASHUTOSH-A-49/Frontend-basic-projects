document.addEventListener('DOMContentLoaded',()=>{
    const que = document.getElementById('question-text');
    const choices = document.getElementById('options');
    const nextbtn = document.getElementById('next-btn');
    const startbtn = document.getElementById('start-btn');
    const restartbtn = document.getElementById('restart-btn');
    const resultdiv = document.getElementById('result-cont');
    const scoreDisplay = document.getElementById('score');
    const quecont = document.getElementById('quiz-cont');
    const marksdisplay = document.getElementById('marks')



    const quearray = [
        {question:"What is the capital of Germany?",
         options:["Paris","Berlin","Rome","Amsterdam"],
         answer:"Berlin",
        },
        {
            question:"Which country is known as Land of rising Sun?",
            options:["Greenland","Finland","South Korea","Japan"],
            answer:"Japan", 
        },
        {
            question:"Which country was the reason of Hiroshima and nagasaki Bombings in WW2?",
            options:["USA","Germany","China","Russia"],
            answer:"USA",
        },
    ];

    let CurrentQueIndex = 0;
    // to dynamically update que index to show it 
    let score = 0;
    let marks = 0;

    startbtn.addEventListener('click',startQuiz);
    // created a function to do when start quiz is clicked 


    nextbtn.addEventListener('click',()=>{
        CurrentQueIndex++;
        let optselected = choices.querySelector('.selected');
        if (CurrentQueIndex<quearray.length){

            // ----
            const correctAns = quearray[CurrentQueIndex-1].answer;
            // console.log(correctAns);
            calcscore(optselected.textContent,correctAns);
            
            // console.log(optselected.textContent);
            // ----
            showque();
        }else{
            // ----
            const correctAns = quearray[quearray.length-1].answer;
            // console.log(correctAns);
            calcscore(optselected.textContent,correctAns);
            // console.log(optselected.textContent);
            // ----
            showresult();
        }
    })



    restartbtn.addEventListener('click',()=>{
        CurrentQueIndex = 0;
        startQuiz();
        score = 0;
        marks = 0;
    })

    function calcscore(option,ans){

        // console.log(option === ans);
        if (option === ans){
            score++;
            marks+=4;
        }else{
            marks-=1;
        }

    }

    function startQuiz(){
        startbtn.classList.add('hidden');
        resultdiv.classList.add('hidden');
        quecont.classList.remove('hidden');
        showque();

        // create another function to show auestions 
    };


    function showque(){
        nextbtn.classList.add('hidden');
        que.textContent = quearray[CurrentQueIndex].question;

        choices.innerHTML = "";

        // clear the ul before appending new elements  as this same function will be used for the next question too

                    


        // selecting an option 
        let opt = quearray[CurrentQueIndex].options;
        opt.forEach(option => {
            const li  = document.createElement('li');
            li.innerHTML = `${option}`;
            // li.classList.add('selected');
            // li.addEventListener('click',()=>selectopt(option));
            li.addEventListener('click',()=>{
                const elements = document.querySelectorAll('li'); 
                elements.forEach(element => { 
                    element.classList.remove('selected'); 
                }); 
                li.classList.toggle('selected');
                // -------
                // const correctAns = quearray[CurrentQueIndex].answer;
                // console.log(option.parentElement)
                // if (option === correctAns){
                //     score++;
                //     marks+=4;
                // }else{
                //     marks-=1;
                // }
                // ---------
                nextbtn.classList.remove('hidden');
        
            })
            // appending the child 
                    choices.appendChild(li);





        });


    };


    function showresult(){
        quecont.classList.add('hidden');
        resultdiv.classList.remove('hidden');
        restartbtn.classList.remove('hidden');
        let totalmarks = quearray.length*4;
        scoreDisplay.textContent = `your score is ${score} out of ${quearray.length}`;
        
        marksdisplay.textContent = `Your secured ${marks} marks out of ${totalmarks}`;
    }

});