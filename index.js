$(function(){
    var kongbai={};
    for(var i=0;i<15;i++){
        $('<b>').addClass('hang').appendTo('.qipan')
        $('<i>').addClass('lie').appendTo('.qipan')
        for(var j=0;j<15;j++){
            kongbai[i+'-'+j]={x:i,y:j};
            $('<div>')
                .addClass('qizi')
                .attr('id',i+'-'+j)
                .data('pos',{x:i,y:j})
                .appendTo('.qipan')
        }
    }
    var hei={};
    var bai={};
    var kaiguan=true;

    var panduan=function(pos,biao){
        var h= 1,s= 1,zx= 1,yx=1;
        var tx, ty;
        //横向
        tx=pos.x;ty=pos.y;
        while(biao[tx + '-' + (ty-1)]){
            h++;ty--;
        }
        tx=pos.x;ty=pos.y;
        while(biao[tx + '-' + (ty+1)]){
            h++;ty++;
        }
        //纵向
        tx=pos.x;ty=pos.y;
        while(biao[(tx-1) + '-' + ty]){
            s++;tx--;
        }
        tx=pos.x;ty=pos.y;
        while(biao[(tx+1)+ '-' + ty]){
            s++;tx++;
        }
        //左斜
        tx=pos.x;ty=pos.y;
        while(biao[(tx+1) + '-' + (ty-1)]){
            zx++;tx++;ty--
        }
        tx=pos.x;ty=pos.y;
        while(biao[(tx-1)+ '-' + (ty+1)]){
            zx++;tx--;ty++
        }
        //右斜
        tx=pos.x;ty=pos.y;
        while(biao[(tx+1) + '-' + (ty+1)]){
            yx++;tx++;ty++;
        }
        tx=pos.x;ty=pos.y;
        while(biao[(tx-1)+ '-' + (ty-1)]){
            yx++;tx--;ty--;
        }
         return Math.max(h,s,zx,yx)
    }
    var ai=function(){
        var max1=-Infinity;
        var zuobiao1;
        for( var i in kongbai){
            var weixie=panduan(kongbai[i],hei);
            if(weixie>max1){
                max1=weixie;
                zuobiao1=kongbai[i];
            }
        }
        var max2=-Infinity;
        var zuobiao2;
        for( var i in kongbai){
            var weixie=panduan(kongbai[i],bai);
            if(weixie>max2){
                max2=weixie;
                zuobiao2=kongbai[i];
            }
        }
        return (max1>max2)?zuobiao1:zuobiao2;
    }

    var isAi;
    //人机对战
    $(".qipan .renji").on("click",function(){
        isAi=true;
        $(this).css({transform:"scale(1.1,1.1)",background:"#40F743"});
        $(".qipan .renren, .qipan .restart").css({
            transform:"scale(1,1)",
            background: "rgba(0,0,0,0.2)"
        });
    })
    //人人对战
    $(".qipan .renren").on("click",function(){
        isAi=false;
        $(this).css({transform:"scale(1.1,1.1)",background:"#40F743"});
        $(".qipan .restart, .qipan .renji").css({
            transform:"scale(1,1)",
            background: "rgba(0,0,0,0.2)"
        })
    })
    //重新开始
    $(".qipan .restart").on("click",function(){
        window.location.reload();
    })
    $('.qizi').on('click',function(){
        audio.src="images/762.mp3";
        audio.play();
        var pos=$(this).data('pos');

        if($(this).hasClass('hei')||$(this).hasClass('bai')){
           return;
        }
        if(kaiguan) {
            $(this).addClass('hei');
            hei[pos.x + '-' + pos.y] = true;
            delete kongbai[pos.x + '-' + pos.y];
            if (panduan(pos, hei)>=5) {
                $(".qipan .baiying").text("黑棋赢了☺").slideToggle(1000);
                $('.qipan .qizi').off('click');
            }
            if(isAi){
                var pos=ai();
                $('#'+ pos.x + '-' + pos.y).addClass('bai');
                bai[pos.x + '-' + pos.y] = true;
                delete kongbai[pos.x + '-' + pos.y];
                if (panduan(pos, bai)>=5) {
                    $(".qipan .baiying").text("白棋赢了☺").slideToggle(1000);
                    $('.qipan .qizi').off('click');
                }
                return;
            }
        }else {
                $(this).addClass('bai');
                bai[pos.x + '-' + pos.y] = true;
                if (panduan(pos, bai)>=5) {
                    $(".qipan .baiying").text("白棋赢了☺").slideToggle(1000);
                    $('.qipan .qizi').off('click');
                }
            }
        kaiguan = !kaiguan;
    })
})