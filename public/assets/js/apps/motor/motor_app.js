define(["ros_ui", "./controller"],
    function (RosUi, controller) {
        RosUi.module("MotorApp", function (MotorApp, RosUi, Backbone, Marionette, $, _) {
            MotorApp.on("start", function () {
                controller.show();
            });
        });

        return RosUi.MotorApp;
    }
);
