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

            $("#btnCompleteTask").unbind("click").bind("click", function(){
                $.ajax({
                    type: "POST",
                    url:"http://localhost:3000/complete",
                    data: {
                        "amountToTransfer": 1,
                        "sourceAccountNumber": 2,
                        "targetAccountNumber": 3
                    },
                    success: function(response){
                        console.log("successfully complete the task");
                    },
                    error: function(err){
                        console.log("erro in completing the task");
                    }
                })
            });
        }
    }
})();