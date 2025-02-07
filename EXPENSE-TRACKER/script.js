document.addEventListener('DOMContentLoaded',()=>{
    const expense_name = document.getElementById('expense-title');
    const expense_amt = document.getElementById('expense-cost');
    const addbtn = document.getElementById('add');
    const expense_list = document.getElementById('expense-list');
    const totalamt = document.getElementById('total-amt');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(item => {  
       renderlist(item);
    });

    addtotal();

    addbtn.addEventListener('click',(e)=>{
        e.preventDefault();

        const expense_title_inp = expense_name.value.trim();
        const expense_amt_inp = expense_amt.value.trim();
        if(expense_title_inp === "" || expense_amt_inp === "")return;

        if(expense_title_inp!="" && !isNaN(expense_amt_inp) && expense_amt_inp>0){
        //creating expense element
        const expensedesc = {
            id: Date.now(),
            title: expense_title_inp,
            amount: expense_amt_inp
        };

        //pushing it into array
        expenses.push(expensedesc);
        
        savelist();
        addtotal();
        renderlist(expensedesc);

        expense_amt.value = "";
        expense_name.value = "";

        }
    });

    function addtotal(){
        let totalprice1 = 0;
        expenses.forEach(item=>{
        totalprice1+=parseFloat(item.amount);
        
        
        // console.log(totalprice);
        })
        totalamt.innerText = ` ${totalprice1} `;
        savelist();
    }

    function savelist(){
        // to set the localstorage array 
        localStorage.setItem('expenses',JSON.stringify(expenses));
    }

    function renderlist(item) {
        
        // creating li element and storing data of item into it to display it 
        const li = document.createElement('li');
        li.setAttribute('data-id',item.id);
        li.innerHTML = `<span>${item.title} - $ ${item.amount}</span><button class = "deletebtn">DELETE</button>`;

        //adding to array and saving into the local storage 
        expense_list.appendChild(li);
        savelist();

        // function of delete btn 
        li.querySelector('.deletebtn').addEventListener('click',(e)=>{
            e.stopPropagation;
            expenses = expenses.filter(t=>t.id!= item.id);
            li.remove();
            addtotal();
            savelist();

        })
    }
})