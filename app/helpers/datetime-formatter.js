const {format} = require("date-fns");
const {fr} = require("date-fns/locale");

module.exports = dateFormatter = (date, dateFormat = 'eee dd MMMM yyyy, HH:mm') => {
  return format(date, dateFormat, {
    locale: fr
  });
}
