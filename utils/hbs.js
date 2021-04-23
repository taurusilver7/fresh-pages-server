// a helper to wrap around date to format it.
// register the helper with handlebars in server to use it in templates (dashboard.hbs)
const moment = require("moment");

module.exports = {
  formatDate: function (date, format) {
    return moment(date).format(format);
  },
  truncate: function (string, len) {
    if (string.length > len && string.length > 0) {
      let new_string = string + "";
      new_string = string.substring(0, len);
      new_string = string.substring(0, new_string.lastIndexOf(" "));
      new_string =
        new_string.length > 0 ? new_string : string.substring(0, len);
      return new_string + "...";
    }
    return string;
  },
  stripTags: function (input) {
    return input.replace(/<(?:.|\n)*?>/gm, "");
  },
};
