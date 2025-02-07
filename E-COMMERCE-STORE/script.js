document.addEventListener('DOMContentLoaded',()=>{
    let products =[
        {id:1, name:"Product 1", price:29.99},
        {id:2, name:"Product 2", price:19.99},
        {id:3, name:"Product 3", price:24.99}
    ];
    // let prod = JSON.parse(localStorage.getItem('prods'));
    
    // localStorage.setItem

    let cart = [];
    const ProductList = document.getElementById('product-list');
    const cartList = document.getElementById('shopping-cart');
    const emptycartmsg = document.getElementById('empty-cart');
    const checkoutbox = document.getElementById('checkout-box');
    const totalpricedisplay = document.getElementById('total-price');
    const checkoutbtn = document.getElementById('checkout');



    // to render all these products in the products array :
    products.forEach((item) =>{
        // create product item: 
        const productdiv = document.createElement('div');
        productdiv.classList.add("product");
        productdiv.innerHTML = `
        <span>${item.name}  - $${item.price.toFixed(2)}</span>
        <button class = "add"  data-id = "${item.id}">Add to cart</button>
        `;
        ProductList.appendChild(productdiv);
        console.log(item.name);
        // products.push(item);
        // localStorage.setItem('products',JSON.stringify(products));


    });


    ProductList.addEventListener('click',(e)=>{
        if(e.target.tagName === 'BUTTON'){
            // to get attribute of the target : 
            const prodId = parseInt(e.target.getAttribute('data-id'));
            // as data-id it will give is string , we have to parse it to int to use it 
            const product = products.find(p => p.id == prodId);
            
            // find - returns the first value in the array where predicate is true 
            addtoCart(product);
            // renderCart(product)
            // this function will add the product to the cart 
        }
    })

    function saveprod() {
        localStorage.setItem('cartitems',JSON.stringify(cart));
    }
    function addtoCart(product){
        cart.push(product);
        saveprod();
        
        renderCart();
        

    }



    function renderCart() {
        cartList.innerText = "";
        let totalprice = 0;
        
        let cartlocal = JSON.parse(localStorage.getItem('cartitems')) || [];

        if(cartlocal.length > 0){
            // let citem  = JSON.parse(localStorage.getItem('cartitems')) || [];
            emptycartmsg.classList.add('hidden')
            checkoutbox.classList.remove('hidden');
            
            console.log(cart);
            cart.forEach((item, index)=>{
                totalprice+=item.price;
                const cartdiv = document.createElement('div');
                cartdiv.innerHTML = `<span class = 'hidden'>${item.id}</span>
                <span>${item.name} - $</span><span>${item.price.toFixed(2)}</span><button class = "removebtn">DELETE</button>
                `;
                cartList.appendChild(cartdiv);
                totalpricedisplay.textContent = `$ ${totalprice.toFixed(2)}`;
                // console.log(totalprice)
                // console.log(cartlocal.length)
                console.log(`total is ${totalprice}`)
                
                // console.log(prod.id);


                // ----
                cartList.addEventListener('click',(e) =>{
                    // to stop event bubbling
                    if(e.target.className === 'removebtn'){
                        
                        e.stopPropagation
                        
                    // let localprod = JSON.parse(localStorage.getItem('cartitems'));
                    // console.log(localprod.id)
                    let divchild = e.target.parentElement.children;
                    let divid = parseInt(divchild[0].innerHTML);
                    let divprice = parseFloat(divchild[2].innerHTML);
                    
                    console.log(`divprice is ${divprice}`)
                    cart.forEach((item1)=>{
                        
                        
                            // console.log(typeof(divid));
                        if(item1.id == divid){
                            
                            // console.log(prod);
                            // let final = parseFloat(item1.price)
                            
        
                            // console.log(totalprice);
                            // saveprod();
                            
                    // savetask(
                        cart = cart.filter(t => t.id != divid);
                        // console.log(cart)
                        cartdiv.remove();
                        saveprod();
                        renderCart();
                        console.log(cartList)
                        }

                            
                    }); 
                    let n = cartlocal.length;
                    if(n>=1){
                        totalprice-=divprice/n;
                    }
                    
                    
                    totalpricedisplay.innerText = `$${totalprice.toFixed(2)}`;
                    }
        
                });
                // ----
         
                    
                })
                saveprod();


                

        }else{
            emptycartmsg.classList.remove('hidden');
            totalpricedisplay.textContent = `$ 0.00`;
            
        }



    }
            
                    
            // filter array method -  learn more from  docs 
    
    
            // let a = products.filter(t=> t.id = prod.id);
            // console.log(a);
        



     


        //         cartList.querySelector('.removebtn').addEventListener('click',(e)=>{
        //             e.stopPropagation;
        //             const divitem = e.target;
        //             const divparent = divitem.parentElement;
        //             const divchild = divparent.children;
        //             const final = parseFloat(divchild[1].innerHTML);
        //             totalprice-=final;
        //             totalpricedisplay.textContent = `$ ${totalprice.toFixed(2)}`;
                    
        //             // console.log(typeof(divchild[1].innerHTML))
        //             console.log(item)
        //             divparent.classList.add('hidden');


        //             // const prodId = parseInt(e.target.getAttribute('data-id'));
        //             // cart = cart.filter(i => i.id!=prodId);
        //             // cartList.remove();
                    
                
        // });


    


    checkoutbtn.addEventListener('click',()=>{
        cart.length = 0;
        const finalprice = totalpricedisplay.textContent
        alert(`Checked out successfully \n your bill amount is : ${finalprice}`);
        renderCart();
    })

});