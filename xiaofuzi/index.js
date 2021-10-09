window.onload=function(){
    var banner=document.getElementById("banner");
    var bannerList=document.getElementById("banner-list");
    var a=0;
    var speed=0
    var timer=null;
    var target=0;
    var timer1=null;
    var i=0;
    timer=setInterval(autoPlay,4000);   //图片移动间隔时间
    function autoPlay(){
        if(target<=-300){
            a=0;
            target=-100;
        }else{
            target-=100;
        }
        sport(target);
    }
    var olli=document.getElementById("ol").getElementsByTagName("li");
    btnBottom(i);
    function btnBottom(){
        i=-(target/100);
        i==3?i=0:i;
        for(var j=0;j<olli.length;j++){
            olli[j].style.background="";
        }
        olli[i].style.background="#FFFFFF";
    }
    for(var j=0;j<olli.length;j++){
        olli[j].index=j;
        olli[j].onclick=function(){
            target=-(this.index*100);
            sport(target);
            btnBottom();
        }
    }
    function sport(tar){
        clearInterval(timer1);
        timer1=setInterval(play,30);
        function play(){
            if(a==tar){
                clearInterval(timer1);
            }else{
                speed=(tar-a)/7;    //图片移动速度
                speed=speed>0?Math.ceil(speed):Math.floor(speed);
                a+=speed;
                bannerList.style.left=a+"%";
            }
        }
    }
    banner.onmouseover=function(){
        clearInterval(timer);
    }
    banner.onmouseout=function(){
        timer=setInterval(autoPlay,2000);
    }
}