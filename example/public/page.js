var Page = function(){
    console.log("inside constructor");
    this.init();
}

Page.prototype = (function(){
    return {
        init: function(){
            $("#btnCreateInstance").unbind("click").bind("click", function(){
                $.ajax({
                    url:"http://localhost:3000/create",
                    success: function(response){
                        console.log("successfully created the instance");
                    },
                    error: function(err){
                        console.log("erro in creating the instance");
                    }
                })
            });
        }
    }
})();