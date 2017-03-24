# Ready architecture for a project based on Jquery

Main application object for creating architecture on Jquery

Necessarily add Jquery to your project.

# How to add new module

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
