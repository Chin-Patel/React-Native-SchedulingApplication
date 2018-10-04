export function getTodaysDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    dd = formatDays(dd);
    mm = formatMonths(mm);
    return dd + '-' + mm + '-' + yyyy;
  }


/*
  * Formats days so if the day is 7, it will return 07
  */
 function formatDays(dd) {
    if (dd < 10) return '0' + dd;
    return dd;
  }

  /*
  * Formats motns so if the month is 7, it will return 07
  */
  function formatMonths(mm) {
    if (mm < 10) return '0' + mm;
    return mm;
  }


  export function getCompletetionTime() {
    var currentdate = new Date();
    var datetime = "Completed On " + currentdate.getDate() + "/" + (currentdate.getMonth() + 1)
      + "/" + currentdate.getFullYear() + " at "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes();
    return datetime;
  }