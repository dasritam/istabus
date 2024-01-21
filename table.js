let reftable;
let selected_courses = [];
let all_courses = [];


/* EVEN SEM */
let all_packages = {'Heiligenstadt':['5:28', '5:55', '6:08', '6:38', '7:08', '7:38', '8:08', '8:38', '9:10', '9:40', '10:10', '10:40', '11:10', '11:40', '12:10', '12:40', '13:10', '13:40', '14:10', '14:40', '15:06', '15:36', '16:06', '16:36', '17:06', '17:36', '18:06', '18:36', '19:06', '19:38', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '0:00', '0:47', '6:00', '6:30', '7:10', '7:40', '8:10', '8:40', '9:10', '9:40', '10:10', '10:40', '11:10', '11:40', '12:10', '12:40', '13:10', '13:40', '14:10', '14:40', '15:10', '15:40', '16:10', '16:40', '17:10', '17:40', '18:10', '18:40', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '0:00', '0:47', '6:30', '7:30', '8:30', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '21:00', '22:00', '23:00', '0:00', '0:47'], 
                    'IST-Austria':['4:59', '5:14', '5:34', '5:44', '6:04', '6:14', '6:34', '6:44', '7:04', '7:14', '7:34', '7:44', '8:04', '8:14', '8:34', '9:14', '9:44', '10:14', '10:44', '11:14', '11:44', '12:14', '12:44', '13:14', '13:44', '14:14', '14:44', '15:14', '15:44', '16:04', '16:14', '16:34', '16:44', '17:04', '17:34', '17:44', '18:04', '18:34', '18:44', '19:04', '19:34', '20:09', '20:39', '21:09', '21:39', '22:09', '22:39', '23:09', '23:39', '0:09', '5:19', '5:49', '6:14', '6:44', '7:14', '7:44', '8:14', '8:44', '9:14', '9:44', '10:14', '10:44', '11:14', '11:44', '12:14', '12:44', '13:14', '13:44', '14:14', '14:44', '15:14', '15:44', '16:14', '16:44', '17:14', '17:44', '18:14', '18:44', '19:14', '19:39', '20:09', '20:39', '21:09', '21:39', '22:09', '22:39', '23:09', '23:39', '0:09', '6:14', '7:14', '8:14', '9:14', '10:14', '10:44', '11:14', '11:44', '12:14', '12:44', '13:14', '13:44', '14:14', '14:44', '15:14', '15:44', '16:14', '16:44', '17:14', '17:44', '18:14', '18:44', '19:14', '19:354', '20:09', '21:09', '22:09', '23:09', '0:09']}

let package_courses = Object.keys(all_packages);
let tbl;

/* HTML Table Construction helper functions*/
  function addCell(tr, val) {
    var td = document.createElement('td');
    td.innerHTML = val;
    tr.appendChild(td)
  }

  function addHeadCell(tr, val) {    
    var th = document.createElement('th');
    th.innerHTML = val;
    tr.appendChild(th)
  }

  function addRow(tbl, first, vals) {
    var tr = document.createElement('tr');
    var tbody = tbl.children[1];

    addHeadCell(tr, first);

    for(let val of vals)
    {
        addCell(tr, val);
    }

    tbody.appendChild(tr);
  }

  function addHead(tbl, first, vals) {
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    
    addHeadCell(tr, first);

    for(let val of vals)
    {
        addHeadCell(tr, val);
    }

    thead.appendChild(tr);
    tbl.appendChild(thead)
  }

  function createBody(tbl){
    var tbody = document.createElement('tbody');
    tbl.appendChild(tbody);
  }
/* HTML Table Construction helper functions END*/

/* Parses the input csv format into a reference table*/
  function makeRefTable(){
    let ref_table = document.getElementById('reftable').innerHTML.replaceAll(' ', '').trim();
    let ref_rows_raw = ref_table.split("\n");
    let ref_rows = [];
    for(row_raw of ref_rows_raw){

      row_formatted = row_raw.split(",");
      row_final = [];

      for(elt of row_formatted){
        row_final.push(elt.split("|"));
        all_courses = all_courses.concat(elt.split("|"));
      }

      ref_rows.push(row_final);
    }

    all_courses = [...new Set(all_courses)].filter(item => item !== "").filter(item => item !== "-");
    return ref_rows;
}




/* Constructs new reference table (not html) based on selected course list*/

  function makeNewTable(selected_courses){
    var new_table = [];

    for(row of reftable){
      new_row = [];
      for(elt of row){
        intersect = elt.filter(i => selected_courses.includes(i)); 
        new_row.push((intersect.length > 0) ? intersect.join("<br>") : "-");
      }
      new_table.push(new_row);
    }

    return new_table;
  }

  /* Constructs new HTML table based on selected course list*/

  function constructTable(tbl, selected_courses){
    table_new = makeNewTable(selected_courses);

    while (tbl.hasChildNodes()) {
      tbl.removeChild(tbl.lastChild);
    }

    addHead(tbl, "", ["Weekdays", "Saturday", "Sunday (Holiday)"]);
    createBody(tbl);
    addRow(tbl, "05:00", table_new[0]);
    addRow(tbl, "06:00", table_new[1]);
    addRow(tbl, "07:00", table_new[2]);
    addRow(tbl, "08:00", table_new[3]);
    addRow(tbl, "09:00", table_new[4]);
    addRow(tbl, "10:00", table_new[5]);
    addRow(tbl, "11:00", table_new[6]);
    addRow(tbl, "12:00", table_new[7]);
    addRow(tbl, "13:00", table_new[8]);
    addRow(tbl, "14:00", table_new[9]);
    addRow(tbl, "15:00", table_new[10]);
    addRow(tbl, "16:00", table_new[11]);
    addRow(tbl, "17:00", table_new[12]);
    addRow(tbl, "18:00", table_new[13]);
    addRow(tbl, "19:00", table_new[14]);
    addRow(tbl, "20:00", table_new[15]);
    addRow(tbl, "21:00", table_new[16]);
    addRow(tbl, "22:00", table_new[17]);
    addRow(tbl, "23:00", table_new[18]);
    addRow(tbl, "00:00", table_new[19]);
  }

  /* Create master list of courses in dropdown*/

  function addDataList(){
    var options = '';
    // for(option of all_courses){
    //   options += '<option value="' + option + '" />';
    // }
    for(option of package_courses){
      options += '<option value="' + option + '" />';
    }
    document.getElementById("station-picker").innerHTML = options;
  }

  /* Update the selected course list display */

  function updateCourse(){
    var courselist = document.getElementById("selected-courses");
    courselist.innerHTML = "Selected courses: " + selected_courses.join(", "); 
  }


  /* Construct default table */

  function main() {
    tbl = document.getElementById('tbl');
    addHead(tbl, "", ["Weekdays", "Saturday", "Sunday (Holiday)"]);
    createBody(tbl);
    addRow(tbl, "05:00", ['-', '-', '-']);
    addRow(tbl, "06:00", ['-', '-', '-']);
    addRow(tbl, "07:00", ['-', '-', '-']);
    addRow(tbl, "08:00", ['-', '-', '-']);
    addRow(tbl, "09:00", ['-', '-', '-']);
    addRow(tbl, "10:00", ['-', '-', '-']);
    addRow(tbl, "11:00", ['-', '-', '-']);
    addRow(tbl, "12:00", ['-', '-', '-']);
    addRow(tbl, "13:00", ['-', '-', '-']);
    addRow(tbl, "14:00", ['-', '-', '-']);
    addRow(tbl, "15:00", ['-', '-', '-']);
    addRow(tbl, "16:00", ['-', '-', '-']);
    addRow(tbl, "17:00", ['-', '-', '-']);
    addRow(tbl, "18:00", ['-', '-', '-']);
    addRow(tbl, "19:00", ['-', '-', '-']);
    addRow(tbl, "20:00", ['-', '-', '-']);
    addRow(tbl, "21:00", ['-', '-', '-']);
    addRow(tbl, "22:00", ['-', '-', '-']);
    addRow(tbl, "23:00", ['-', '-', '-']);
    addRow(tbl, "00:00", ['-', '-', '-']);
  
    reftable = makeRefTable();
    addDataList();
    addSourceDataList();
    }


  /* onClick functions for the input buttons */

  function addCourse(){
    removeAll()
    var inputVal = document.getElementsByClassName("station-picker")[0].value.trim();
    var inputVal2 = document.getElementsByClassName("source-picker").value;
    console.log(inputVal2)
    console.log(inputVal)
    if((all_courses.includes(inputVal)) && !(selected_courses.includes(inputVal))) {
      selected_courses.push(inputVal);

      updateCourse();
      generate();
    }
    else if (package_courses.includes(inputVal)) {
      selected_courses = new Set(selected_courses.concat(all_packages[inputVal]));
      selected_courses = Array.from(selected_courses);

      updateCourse();
      generate();
    }

    source = document.getElementsByClassName("station-picker")[0].value;
    document.getElementById("selected-source").innerHTML = 'Showing Buses From: '.concat(source)

    document.getElementsByClassName("station-picker")[0].value = "";
    document.getElementsByClassName("source-picker")[0].value = "";
  }


  function removeCourse(){
    var inputVal = document.getElementsByClassName("station-picker")[0].value.trim();
    if(selected_courses.includes(inputVal)) {
      selected_courses = selected_courses.filter(item => item !== inputVal);

       updateCourse();
       generate();

    }
    else if(package_courses.includes(inputVal)) { 
      selected_courses = selected_courses.filter(item => !(all_packages[inputVal].includes(item)));
     
      updateCourse();
      generate();

    }

    document.getElementsByClassName("station-picker")[0].value = "";
  }
  
  function removeAll(){
    selected_courses = [];
    updateCourse();
    generate();
  }

  function addAll(){
    selected_courses = [...all_courses];
    var courselist = document.getElementById("selected-courses");
    courselist.innerHTML = "Selected courses: All";
 
    generate();
  }

  function generate(){
    constructTable(tbl, selected_courses);
  }


  