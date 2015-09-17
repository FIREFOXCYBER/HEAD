define(['application', 'lib/api'], function (App, api) {
    App.module('Performances.Entities', function (Entities, App, Backbone, Marionette, $, _) {
        Entities.Node = Backbone.Model.extend({
            call: function () {
                switch (this.get('name')) {
                    case 'gesture':
                        api.setGesture(this.get('gesture'), 1, this.get('speed'), this.get('magnitude'));
                        break;
                    case 'emotion':
                        api.setEmotion(this.get('emotion'), this.get('magnitude'), parseFloat(this.get('duration')));
                        break;
                    case 'look_at':
                        api.setFaceTarget(-this.get('x'), 3, -this.get('y'));
                        break;
                    case 'speech':
                        api.robotSpeech(this.get('text'));
                        break;
                }
            },
            toJSON: function () {
                var json = Backbone.Model.prototype.toJSON.call(this);
                if (this.get('el')) delete json['el'];

                return json;
            },
            destroy: function () {
                // remove an associated element
                if (this.get('el'))
                    $(this.get('el')).remove();

                Backbone.Model.prototype.destroy.call(this);
            }
        });
        Entities.NodeCollection = Backbone.Collection.extend({
            model: Entities.Node,
            comparator: 'start_time'
        });
    });
});
