$(document).ready(function(){
    $('.spoon i').on('click',function (element) {
    var _id = $(this).data("id");
    var forkedItem =$('.fork i[data-id="'+_id+'"]');
    if($(this).hasClass("Spooned")) return element.preventDefault();
    if(forkedItem.hasClass("Forked"))
    {
    $(this).attr("disabled","disabled");
    forkedItem.removeAttr("disabled");
    forkedItem.removeClass("Forked");
    forkedItem =$('.countDataForks[data-id="'+_id+'"]');
    forkedItem.text(parseInt(forkedItem.text()) - 1 + " Forks");
    }
    var spoonedItem =$('.countDataSpoons[data-id="'+_id+'"]');
    spoonedItem.text(parseInt(spoonedItem.text()) + 1 + " Spoons");
    $(this).addClass("Spooned");
    $(this).attr("disabled", true);
    console.log(_id);
    // $.ajax({
    //   type: "PUT",
    //   url: `/optionsBarActions/SpoonIt/${_id}`,
    //   data: {id: _id},
    //   success: function(data){
    //     console.log("data: ",data); 
    //   },
    //   error: function(error){
    //       console.log(error);
    //   }
    // });
  });
  $('.fork i').on('click',function (element) {
    var _id = $(this).data("id");
    var spoonedItem =$('.spoon i[data-id="'+_id+'"]');
    if($(this).hasClass("Forked")) return element.preventDefault();
    if(spoonedItem.hasClass("Spooned"))
    {
    spoonedItem.removeClass("Spooned");
    spoonedItem =$('.countDataSpoons[data-id="'+_id+'"]');
    spoonedItem.text(parseInt(spoonedItem.text()) - 1 + " Spoons");
    }
    var forkedItem =$('.countDataForks[data-id="'+_id+'"]');
    forkedItem.text(parseInt(forkedItem.text()) + 1 + " Forks");
    $(this).addClass("Forked");
    console.log(_id);
    // $.ajax({
    //   type: "PUT",
    //   url: `/optionsBarActions/SpoonIt/${_id}`,
    //   data: {id: _id},
    //   success: function(data){
    //     console.log("data: ",data); 
    //   },
    //   error: function(error){
    //       console.log(error);
    //   }
    // });
  });
  $('.bookmark i').on('click',function (element) {
    var _id = $(this).data("id");
    $(this).removeClass("far");
    $(this).addClass("fas")
    $(this).addClass("Bookmarked");
    console.log(_id);
    // $.ajax({
    //   type: "PUT",
    //   url: `/optionsBarActions/SpoonIt/${_id}`,
    //   data: {id: _id},
    //   success: function(data){
    //     console.log("data: ",data); 
    //   },
    //   error: function(error){
    //       console.log(error);
    //   }
    // });
  });
});