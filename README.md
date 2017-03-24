# Ready architecture for a project based on Jquery

Main application object for creating architecture on Jquery

Necessarily add Jquery to your project.

# How to add new module

1. Add new file to project.
2. Copy code below.
3. Add new name for your module (change 'YourModuleName' ).

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
