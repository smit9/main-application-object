# main-application-object
Main application object for creating architecture on Jquery

# how to add new module

MainApplication.register('YourModuleName', function (app, mediator) {
    return {
        initialize: function () {
            $(document).ready(function () {
              // your code
            });
        },
        destroy: function () {
        }
    }
});

