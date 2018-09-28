
   
      

     $(document).ready(function(){
        

          if ( $(window).width() < 768) {      
            $(".sub_txt").click(function(){
                 $(".list_price").toggleClass("show");
                 $(this).find(".down_img1").toggleClass("rotate");

             });
             $(".dnload_txt").click(function(){
                 $(".dnload_div").toggleClass("show");
                $(this).find(".down_img1").toggleClass("rotate");
             });
              $(".bill_txt").click(function(){
                 $(".bill_Div").toggleClass("show");
                 $(this).find(".down_img1").toggleClass("rotate");
             });


          } 


           $(".select-items div").click(function(){
             $(this).parents(".expand_box").siblings(".data-table").addClass("overlay");
              $(this).parents(".sub_div").siblings(".sub_div").find(".data-table").removeClass("overlay");


             $(this).parents(".status_box").addClass("overlay");
             $(this).parents(".sub_div").siblings(".sub_div").find(".status_box").removeClass("overlay");
             $(this).parents(".expand_box").siblings(".show_Div").show();
             $(this).parents(".sub_div").siblings(".sub_div").find(".show_Div").removeClass("show");
             $(this).parents(".status_box").after($(".show_Div"));
           });

            $(".btn_sv").click(function(){
             $(this).parents(".show_Div").siblings(".data-table").find(".succ_Div").show();
             $(this).parents(".show_Div").addClass("bg");
             // $(".show_Div ul").hide();
              $(this).parents(".show_Div").addClass("hide");
             $(".succ_Div").delay(1000).fadeOut();

           });
        
    });




   


      // $(".view-txt").click(function(){
      //   $('body').find('.expand_box').show();
      //   $(this).parents(".table").after($('.expand_box'));
      //   $(this).parents(".table").addClass('current');
      //   $(this).parents(".table").siblings().removeClass('current');
      // });
      // $(".close-txt").click(function(){
      //   $('body').find('.expand_box').hide();
      //   $(this).parents(".table").removeClass('current');
      // });
    


       $(".view-txt").click(function(){
        $(this).parents(".sub_div").siblings().children(".data-table").removeClass("overlay");
        $(this).parents(".sub_div").siblings().children(".data-table").siblings(".expand_box").find(".status_box").removeClass("overlay");
        $('body').find('.expand_box').show();
        $(this).parents(".data-table").after($('.expand_box'));


        $(this).parents(".sub_div").children(".data-table").addClass('current');
        $(this).parents(".sub_div").siblings().children(".data-table").removeClass('current');
      });
      $(".close-txt").click(function(){
         $('body').find('.expand_box').hide();
        $(this).parents(".data-table").removeClass('current');
      });


        


