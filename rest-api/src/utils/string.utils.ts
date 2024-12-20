export function concatString(s,n) {
  var cut= s.indexOf(' ', n);
  if(cut== -1) return s;
  return s.substring(0, cut)+'...'
}
export function capitalizeFirstLetter(str) {
  return str.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
}

export function getDateTime() {
  let monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
  let date = new Date();
  let month = monthNames[date.getMonth()]
  let day = date.getDate()
  let year = date.getFullYear()
  let newDate = month + ' ' + day + ', ' + year

  // let currentTime = this.time()
  return `${newDate}`;

}

export function getTime() {
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();
  return `${h}:${m}:${s}`;
}
