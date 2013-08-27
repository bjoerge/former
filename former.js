var dotty = require("dotty");
var tryparse = function(val) {
  try {
    return JSON.parse(val);
  } catch (e) {}
  return val;
};

module.exports = {
  serialize: function($form, toNative) {
    if (typeof toNative == 'undefined') toNative = false;
    var $ = $form.constructor;
    var serialized = {};
    var $elements = $form.find("input[name], textarea[name]");
    for (var i = 0, len = $elements.length; i < len; i++) {
      var $el = $($elements[i]);
      var name = $el.attr("name");
      var value = $el.val();
      if (!dotty.exists(serialized, name)) {
        dotty.put(serialized, name, "");
      }
      if ($el.is("input[type=radio]") && !$el.prop("checked")) {
        continue;
      }
      if (toNative) {
        value = tryparse(value)
      }
      dotty.put(serialized, name, value);
    }
    return serialized;
  },
  deserialize: function($form, data, opts) {
    opts || (opts = {});
    var $ = $form.constructor;
    var $elements = $form.find("input[name], textarea[name]");
    for (var i = 0, len = $elements.length; i < len; i++) {
      var $el = $($elements[i]);
      var name = $el.attr("name");
      var value = dotty.get(data, name);
      if ($el.is("input[type=radio]")) {
        $el.prop("checked", value === $el.val());
      } else {
        if (value || opts.blank === true) {
          $el.val(value);
        }
      }
    }
    return data;
  }
};