# main-application-object
Main application object for creating architecture on Jquery

Add Jquery to your project 

# how to add new module

```javascript

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
```
