const form = document.getElementById("contact-form");

const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();
  let mail = new FormData(form);
  sendMail(mail);
});

const sendMail = (mail) => {
 /* fetch("https://nodemailer-vic-lo.herokuapp.com/send", {*/
  fetch("http://localhost:5000/send", {
    method: "post",
    body: mail,
  }).then((response) => {
    return response.json();
  });
};
window.onload = ()=>{changing_model()}





let Product=document.getElementById("Product")
let Number_of_stops_ZE=document.getElementById("Number_of_stops_ZE")
let Elevator_model=document.getElementById("Elevator_model")
let picture_div=document.getElementById("picture_div")

let Control_system=document.getElementById("Control_system");

let Group_stops_NOT_served_by_lift=document.getElementById("Group_stops_NOT_served_by_lift");
let Num_of_stops_served_by_group=document.getElementById("Num_of_stops_served_by_group");

let Designation_within_group=document.getElementById("Designation_within_group")
let Unequeal_nb_floors_at_hoistway=document.getElementById("Unequeal_nb_floors_at_hoistway")
let Commission_number_of_lift_A=document.getElementById("Commission_number_of_lift_A")
let Dispo_layout_for_group_elevator=document.getElementById("Dispo_layout_for_group_elevator")

/*Control_system.addEventListener("click", (event) =>{console.log(event)});*/

Product.addEventListener("change", changing_model);
Number_of_stops_ZE.addEventListener("change", filteringQuantityHE);
/*let Elevator_model_list = document.getElementById("Elevator_model").getElementsByTagName("option");*/

Elevator_model.addEventListener("change",addingCustomText);
Control_system.addEventListener("change", changing_attribute);


/*||Control_system.value==="2KA"||Control_system.value==="2KS"||Control_system.value==="3KS"*/

function changing_model() {

  if (Product.value === "Schindler 3100 Elevator") {
    for (let i = 1; i < Elevator_model.options.length; i++) {
      Elevator_model.options[i].style.visibility = "hidden"
    }
    Elevator_model.options[0].style.visibility = "visible"
  } else if (Product.value === "Schindler 3300 Elevator") {
    for (let i = 0; i < 1; i++) {
      Elevator_model.options[i].style.visibility = "hidden"
    }
    for (let i = 1; i < Elevator_model.options.length; i++) {
      Elevator_model.options[i].style.visibility = "visible"
    }
  }
}
function addingCustomText(){

  if (Elevator_model.value==="GQ 400 BK1000 TK1100 T2 BT750"){
    /*picture_div.insertAdjacentHTML('afterend', '<p>GQ 400 BK1000 TK1100 T2 BT750</p>')*/
    picture_div.innerHTML =' <img class="fit-picture"\n' +
    '     src="400kgTL.JPG"\n' +
        '     alt="GQ 400 BK1000 TK1100 T2L BT750" width="500" height="600">' +
        '<img class="fit-picture"\n' +
        '     src="400kgTR.JPG"\n' +
        '     alt="GQ 400 BK1000 TK1100 T2R BT750" width="500" height="600">'
  }
  else if
  (Elevator_model.value==="GQ 535 BK1050 TK1250 T2 BT800"){
   /* picture_div.insertAdjacentHTML('afterend', '<p>GQ 535 BK1050 TK1250 T2 BT800</p>')*/
    picture_div.innerHTML =' <img class="fit-picture"\n' +
        '     src="535kgTL.JPG"\n' +
        '     alt="GQ 535 BK1050 TK1250 T2 BT800" width="500" height="600">' +
        '<img class="fit-picture"\n' +
        '     src="535gTL.JPG"\n' +
        '     alt="GQ 535 BK1050 TK1250 T2 BT800" width="500" height="600">'
  }
}
function changing_attribute() {
  if (Control_system.value === "2PI" || Control_system.value === "2KA" || Control_system.value === "2KS" || Control_system.value === "3KS") {
    Designation_within_group.removeAttribute("disabled");
    Unequeal_nb_floors_at_hoistway.removeAttribute("disabled");
    Num_of_stops_served_by_group.removeAttribute("disabled");
    Group_stops_NOT_served_by_lift.style.display = "block";
    Commission_number_of_lift_A.removeAttribute("disabled");
    Dispo_layout_for_group_elevator.removeAttribute("disabled");
  } else {
    Designation_within_group.setAttribute("disabled", "disabled");
    Unequeal_nb_floors_at_hoistway.setAttribute("disabled", "disabled");
    Group_stops_NOT_served_by_lift.style.display = "none";
    Num_of_stops_served_by_group.setAttribute("disabled", "disabled");
    Commission_number_of_lift_A.setAttribute("disabled", "disabled");
    Dispo_layout_for_group_elevator.setAttribute("disabled", "disabled");
  }
}
/*parseInt(Number_of_stops_ZE.value).length*/
const collectionOfInputsHE = document.querySelectorAll(`input[name^=HE]`);

function filteringQuantityHE(){
  /*for (let u=20; u>5; u--){
    console.log(u)
  }*/
  for (let u =19-(parseInt(Number_of_stops_ZE.value));  u>=0; u--) {
    collectionOfInputsHE[u].style.visibility = "hidden"
    console.log(u)

  }
}

function addingDisabledAttribute(elementForDisable){
  elementForDisable.setAttribute("disabled", "disabled")
}


