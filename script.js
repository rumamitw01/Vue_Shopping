var vm=new Vue({
      el:"#app",
      data:{
            //建立一個容器,讓外部的資料可以先放在這裡
            smartphone:[],
            cart:[],
            currentBook:null,
            isCartOpen:false,
            keyword:"",
            inControl:false,
            isCheckout:false,
            name:"",
            address:"",
            phone:"",
      },
      methods:{
            bgcss(url){
                  return{
                        'background-image':'url('+url+')',
                        'background-position':'center center',
                        'background-size':"cover"      
                  }
            },
            wheel(evt){
                  TweenMax.to(".cards",0.8,{
                        left: "-=" + evt.deltaY*5+"px"
                  })
                  if($(".cards").css("left").slice(0,-2)>=1){
                        TweenMax.to(".cards",0.8,{
                              left: "0px"
                        })
                  }
                  if($(".cards").css("left").slice(0,-2)<=-3501){
                        TweenMax.to(".cards",0.8,{
                              left: "-3500px"
                        })
                  }
            },
            addCart(book,evt){
                  this.currentBook= book;
                  
                  if(this.cart.indexOf(book)==-1){
                        this.currentBook.amount+=parseInt($("#amount").val());
                        let target = evt.target
                        this.$nextTick(()=>{
                              TweenMax.from(".buybox",0.6,{
                                    left: $(evt.target).offset().left,
                                    top: $(evt.target).offset().top,
                                    opacity:1
                              })
                              setTimeout(()=>{
                                    this.cart.push(book)
                              },600)
                        })
                  }
                  else{
                        alert("已加入購物車!欲修改數量請至購物車!")
                  }
            },
            delCart(book,evt){
                  if(this.cart.indexOf(book)!=-1){
                        this.cart.splice(this.cart.indexOf(book),1);
                        book.amount=0;
                  }
            },
            clearCart(){
                  this.cart=[];
                  this.cart.map(book=>{book.amount=0;book=null;});
                  this.currentBook.amount=0;
                  this.currentBook=null;
            }

      },
      //use axios 
      created(){
            let apiUrl="./smartphone.json" //資料讀取來源
            
            axios.get(apiUrl).then(res=>{
                  this.smartphone=res.data
            })
      },
      watch: {
            cart(){
              TweenMax.from(".fa-shopping-cart",0.3,{
                scale: 0.5
              })
            }
          },
      computed:{
            totalPrice(){
                  return this.cart
                  .map(book=>book.price*book.amount)
                  .reduce((total,p)=>total+p,0)


    },
            totalAmount(){
                  return parseInt(this.cart
                  .map(book=>book.amount)
                  .reduce((total,p)=>parseInt(total)+parseInt(p),0))
            }
  },

});

