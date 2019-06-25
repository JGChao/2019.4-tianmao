window.onload = function(){
    // 轮播图
    let imgBox = document.querySelectorAll(".beijintu .bannernk .banner img");    //获取轮播图片
    let dianBox = document.querySelectorAll(".beijintu .bannernk .banner .lunbod .dian"); //获取轮播点
    
    
    imgBox[0].style.opacity=1;   //默认显示第一张图片
    let index=0;                //保存默认的下标

   let time = setInterval(()=>{              //时间函数需要轮播图的图片动起来     把时间函数赋值给一个变量
        index++;                                //图片的下标在递增
        if(index>imgBox.length-1){                //给图片下标一个条件，下标的递增的最大值小于图片长度-1，当下标最大时。下标为0，就是第一个
            index=0;
        }

        imgBox.forEach((v ,i)=>{               //对图片进行遍历，对所以图片进行隐藏利用opacity（透明度）
            v.style.opacity=0;
            dianBox[i].classList.remove("dian1");   //清除轮播点选中
        })
        imgBox[index].style.opacity=1;             //播放到哪张图哪张图显示。利用下标
        dianBox[index].classList.add("dian1");     //轮播点和图一一对应，对轮播图进行选中。但是会都选中。需要清除选中。只留一个

    } ,2000)

    //当鼠标移入大盒子时轮播图和轮播点都不动。鼠标移出反之
    let bigBOX = document.querySelector(".beijintu .bannernk .banner");    //获取轮播图和轮播点外的大盒子    
    
    bigBOX.onmouseover=function(){      //鼠标移入停止
        clearInterval(time)            
    }
    bigBOX.onmouseout=function(){    //鼠标移出动
        time=setInterval(()=>{
            over()                //调用时间函数
        } ,2000)
    }

    //轮播点的操作
    dianBox.forEach((v ,i)=>{                   //遍历轮播点
       v.onmouseover=(()=>{                    //做鼠标移入
           index=i;                               //图片的下标等于轮播点的下标
            dianBox.forEach((m ,n)=>{           
                m.classList.remove("dian1");         //清除轮播点选中状态
                imgBox[n].style.opacity=0;            //全部图片隐藏
            })
            v.classList.add("dian1");             //选择轮播点的选中状态
            imgBox[index].style.opacity=1;         //移入轮播点对应的轮播图显示利用下标（index）
        })
    })


    //封装函数
    function over(){
            index++;
            if(index>imgBox.length-1){
                index=0;
            }
    
            imgBox.forEach((v ,i)=>{
                v.style.opacity=0;
                dianBox[i].classList.remove("dian1");
            })
            imgBox[index].style.opacity=1;
            dianBox[index].classList.add("dian1");
    
       
    }

    // 侧导航
    let cleft = document.querySelectorAll(".beijintu .bannernk .berleft .p6");
    let cright = document.querySelectorAll(".beijintu .bannernk .berleft .cehua .cehuadakuai");

    let csleft = document.querySelectorAll(".beijintu .bannernk .berleft ");
    let csright = document.querySelectorAll(".beijintu .bannernk .berleft .cehua ");

    csleft.forEach((v , i)=>{
        v.onmouseover=()=>{
            csright[i].style.display="block";
        }
        v.onmouseout=()=>{
            csright[i].style.display="none";
        }

    })
    cleft.forEach((m , n)=>{
        m.onmouseover=()=>{
            cright.forEach((b)=>{
                b.style.display="none";
            })
            cright[n].style.display="block";
        }
    })



    //广告
    let BOX = document.querySelector(".adver");

    let speedx = 10;
    let speedy = 10;

    let offsetL = BOX.offsetLeft;
    let offsetT = BOX.offsetTop;

    let timer = setInterval(()=>{
        offsetL += speedx;
        offsetT += speedy;
        if(offsetL > window.innerWidth - BOX.offsetWidth || offsetL < 0){
            speedx = -speedx;
        }
        if(offsetT > window.innerHeight - BOX.offsetHeight || offsetT <= 0){
            speedy = -speedy;
        }
        BOX.style.left=offsetL + "px";
        BOX.style.top=offsetT + "px";
    }, 200)

    BOX.onmouseover=()=>{
        clearInterval(timer);
    }
    BOX.onmouseout=()=>{
        timer = setInterval(()=>{
            overr();
        }, 200)
    }
    BOX.onclick=()=>{
        BOX.style.display="none";
    }

    //封装函数
    function overr(){
        offsetL += speedx;
        offsetT += speedy;
        if(offsetL > window.innerWidth - BOX.offsetWidth || offsetL < 0){
            speedx = -speedx;
        }
        if(offsetT > window.innerHeight - BOX.offsetHeight || offsetT <= 0){
            speedy = -speedy;
        }
        BOX.style.left=offsetL + "px";
        BOX.style.top=offsetT + "px";
    }


    //楼层跳转
    let floorBox = document.querySelectorAll(".floor");
    let btnBox = document.querySelectorAll(".btn");

    let arr = [];

    floorBox.forEach((v)=>{
        arr.push(v . offsetTop);
    })

    let speed;
    let scrollT;
    let timeer;

    btnBox.forEach((m , n)=>{
        m.onclick=()=>{
            btnBox.forEach((j)=>{
                j.classList.remove("hot");
            })
            btnBox[n].classList.add("hot");
            clearInterval(timeer);
            timeer = setInterval(()=>{
                scrollT = document.documentElement.scrollTop;
                speed = (arr[n] - scrollT)/10;
                speed = speed > 0? Math.ceil(speed) : Math.floor(speed);
                scrollT += speed;
                scrollTo(0 , scrollT);
            }, 20)
            if(scrollT == arr[n]){
                clearInterval(timeer);
            }
        }
    })
    onwheel=()=>{
        clearInterval(timeer);
    }

    let Bigbox = document.querySelector(".ftop");
    window.onscroll=()=>{
        if(scrollY > 1500){
            Bigbox.style.display="block";
            setTimeout(()=>{
                Bigbox.style.width="36" + "px";
                Bigbox.style.height="370" + "px";
            }, 20)
        }else{
            // Bigbox.style.display="none";
            // setTimeout(()=>{
                Bigbox.style.width=0;
                Bigbox.style.height=0; 
        // }, 20)
        }

        arr.forEach((m , n)=>{
            if(scrollY >= arr[n]){
                btnBox.forEach((b)=>{
                    b.classList.remove("hot");
                })
                btnBox[n].classList.add("hot");
            }
        })
    }

    let top = document.querySelector(".ftop .top");
    
    // let Htop = document.querySelector(".dtu");

    top.onclick=()=>{
        clearInterval(timeer)
        setInterval(()=>{
            let juli = document.documentElement.scrollTop;
            
           scrollTo(0 , )
        }, 20)
    }
    
















}