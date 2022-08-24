const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// instantiate an express app
const app = express();
// cors
app.use(cors({ origin: "*" }));

app.use("/public", express.static(process.cwd() + "/public")); //make public static

const transporter = nodemailer.createTransport({
  host: `smtp.ukr.net`, //replace with your email provider https://wiki.ukr.net/ManageIMAPAccess
  port: 2525,//insert port 465 or 2525 (from ukr.net) https://wiki.ukr.net/ManageIMAPAccess
  secure: true,
  auth: {
    user: `leader_i@ukr.net`,
    pass: `CpRKOQQpq2kvQJKE`//you receive this password from https://mail.ukr.net/desktop#security/appPasswords
  },
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

app.post("/send", (req, res) => {
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    console.log(data);
    const mail = {
      from:'leader_i@ukr.net',
      /*from: `${data.name} <${data.email}>`,*/
      to: `<${data.email}>`, // receiver email,
      subject: data.object_latin,
      html:`
<table border="1">
  <table border="1">
  <tr>
    <th>Ключ</th>
    <th>Значення</th>
  </tr>
  <tr>
    <td>Імя</td>
    <td>${data.name}</td>
  </tr>
  <tr>
    <td>Email</td>
    <td>${data.email}</td>
  </tr>
  <tr>
    <td>Назва об'єкта латинськими літерами:</td>
    <td>${data.object_latin}</td>
  </tr>
  <tr>
    <td>Назва об'єкта кирилецею:</td>
    <td>${data.object_cyrylic}</td>
  </tr>
   <tr>
    <td>Адреса об'єкта:</td>
    <td>${data.object_adress}</td>
  </tr>
   </table>
</table>

  <table border="1">
   <h3>Main Data</h3>
  <table border="1">
   
   <tr>
    <td>Product :</td>
    <td>${data.Product}</td>
  </tr>
  <tr>
    <td>Product Application:</td>
    <td>${data.Product_Application}</td>
  </tr>
  <tr>
    <td>Quotation- / Order type:</td>
    <td>Order registration</td>
  </tr>
   <tr>
    <td>KG / Customer / Country:</td>
    <td>Ukraine-Schindler Ukraine</td>
  </tr>
     <tr>
    <td>Country of installation:</td>
    <td>UA</td>
  </tr>
  <tr>
    <td>EN81-70 Relevance:</td>
    <td>${data.EN81_70_Relevance}</td>
  </tr> 
  <tr>
    <td>Accessibility code :</td>
    <td>EN 81-70:2003 + A1:2004</td>
  </tr>  
  <tr>
    <td>Elevator model:</td>
    <td>${data.Elevator_model}</td>
  </tr>
  <tr>
    <td>Number of access sides:</td>
    <td>${data.Rated_speed_VKN}</td>
  </tr>
  <tr>
    <td>Number of access sides:</td>
    <td>${data.Number_of_access_sides}</td>
  </tr>
  <tr>
    <td>Number of stops (ZE):</td>
    <td>${data.Number_of_stops_ZE}</td>
  </tr>
  <tr>
    <td>Control system:</td>
    <td>${data.Control_system}</td>
  </tr>
  <tr>
    <td>Designation within group:</td
    <td>${data.Designation_within_group||" "}</td>
  </tr>
  <tr>
    <td>Unequeal nb floors at hoistway:</td>
    <td>${data.Unequeal_nb_floors_at_hoistway||" "}</td>
  </tr>
  
   <tr>
    <td>Num. of stops served by group (2 - 35):</td>
    <td>${data.Num_of_stops_served_by_group||" "}</td>
  </tr>
  
  <tr>
    <td>Group stops NOT served by lift:</td>
    <td>${data.Group_stops_NOT_served_by_lift_1_1||" "},
${data.Group_stops_NOT_served_by_lift_2_1||" "},
${data.Group_stops_NOT_served_by_lift_3_1||" "},
${data.Group_stops_NOT_served_by_lift_4_1||" "},
${data.Group_stops_NOT_served_by_lift_5_1||" "},
${data.Group_stops_NOT_served_by_lift_6_1||" "},
${data.Group_stops_NOT_served_by_lift_7_1||" "},
${data.Group_stops_NOT_served_by_lift_8_1||" "},
${data.Group_stops_NOT_served_by_lift_9_1||" "},
${data.Group_stops_NOT_served_by_lift_10_1||" "},
${data.Group_stops_NOT_served_by_lift_11_1||" "},
${data.Group_stops_NOT_served_by_lift_12_1||" "},
${data.Group_stops_NOT_served_by_lift_13_1||" "},
${data.Group_stops_NOT_served_by_lift_14_1||" "},
${data.Group_stops_NOT_served_by_lift_15_1||" "},
${data.Group_stops_NOT_served_by_lift_16_1||" "},
${data.Group_stops_NOT_served_by_lift_17_1||" "},
${data.Group_stops_NOT_served_by_lift_18_1||" "},
${data.Group_stops_NOT_served_by_lift_19_1||" "},
${data.Group_stops_NOT_served_by_lift_20_1||" "}
</td>
  </tr>
  <tr>
    <td>Commission number of lift A :</td>
    <td>${data.Commission_number_of_lift_A||" "}</td>
  </tr>
  
   <tr>
    <td>Dispo layout for group elevat:</td>
    <td>${data.Dispo_layout_for_group_elevator||" "}</td>
  </tr>
  
  <tr>
    <td>Height door HT:</td>
    <td>${data.Height_door_HT}</td>
  </tr>
  
  <tr>
    <td>Car height HK:</td>
    <td>${data.Car_height_HK}</td>
  </tr>
  
  <tr>
    <td>Landing door:</td>
    <td>auto filled</td>
  </tr>
  
  <tr>
    <td>Main power supply voltage:</td>
    <td>380</td>
  </tr>
  
  <tr>
    <td>Supply power net type:</td>
    <td>TN-S (3L+PE+N)</td>
  </tr>
  </table>
</table>
  <table border="1">
  
  <h3>Shaft</h3>
  
  <table border="1">
  <tr>
    <td>Landing ident. (served stops):</td>
    <td>
${data.Landing_ident_served_stops_1_1||" "},
${data.Landing_ident_served_stops_1_2||" "},
${data.Landing_ident_served_stops_2_1||" "},
${data.Landing_ident_served_stops_2_2||" "},
${data.Landing_ident_served_stops_3_1||" "},
${data.Landing_ident_served_stops_3_2||" "},
${data.Landing_ident_served_stops_4_1||" "},
${data.Landing_ident_served_stops_4_2||" "},
${data.Landing_ident_served_stops_5_1||" "},
${data.Landing_ident_served_stops_5_2||" "},
${data.Landing_ident_served_stops_6_1||" "},
${data.Landing_ident_served_stops_6_2||" "},
${data.Landing_ident_served_stops_7_1||" "},
${data.Landing_ident_served_stops_7_2||" "},
${data.Landing_ident_served_stops_8_1||" "},
${data.Landing_ident_served_stops_8_2||" "},
${data.Landing_ident_served_stops_9_1||" "},
${data.Landing_ident_served_stops_9_2||" "},
${data.Landing_ident_served_stops_10_1||" "},
${data.Landing_ident_served_stops_10_2||" "},
${data.Landing_ident_served_stops_11_1||" "},
${data.Landing_ident_served_stops_11_2||" "},
${data.Landing_ident_served_stops_12_1||" "},
${data.Landing_ident_served_stops_12_2||" "},
${data.Landing_ident_served_stops_13_1||" "},
${data.Landing_ident_served_stops_13_2||" "},
${data.Landing_ident_served_stops_14_1||" "},
${data.Landing_ident_served_stops_14_2||" "},
${data.Landing_ident_served_stops_15_1||" "},
${data.Landing_ident_served_stops_15_2||" "},
${data.Landing_ident_served_stops_16_1||" "},
${data.Landing_ident_served_stops_16_2||" "},
${data.Landing_ident_served_stops_17_1||" "},
${data.Landing_ident_served_stops_17_2||" "},
${data.Landing_ident_served_stops_18_1||" "},
${data.Landing_ident_served_stops_18_2||" "},
${data.Landing_ident_served_stops_19_1||" "},
${data.Landing_ident_served_stops_19_2||" "},
${data.Landing_ident_served_stops_20_1||" "},
${data.Landing_ident_served_stops_20_2||" "}
</td>
  </tr>
  
   <tr>
    <td>Main stop access:</td>
    <td>${data.Main_stop_access}</td>
  </tr>
  
    <tr>
    <td>Safety gear at counterweight:</td>
    <td>${data.Safety_gear_at_counterweight}</td>
  </tr>
  
  <tr>
    <td>Building tolerance</td>
    <td>auto +25mm/-25mm /+50mm/-0mm</td>
  </tr>
  
    <tr>
    <td>Elevation lowest (group) stop, FFL(+0.000)</td>
    <td>${data.Elevation_lowest_group_stop}</td>
  </tr>
  
  <tr>
    <td>Glass shaft relevance</td>
    <td>No</td>
  </tr>
  
  <tr>
    <td>Door opening direction</td>
    <td>${data.Door_opening_direction}</td>
  </tr>
  
   <tr>
    <td>H-frontwall to H-l-sill TSW:</td>
    <td>${data.H_frontwall_to_H_l_sill_TSW}</td>
  </tr>
  
   <tr>
    <td>Glass shaft relevance</td>
    <td>No</td>
  </tr>
  
  <tr>
    <td>Common hoistway:</td>
    <td>${data.Common_hoistway}</td>
  </tr>
  
  <tr>
    <td>Distance between shafts, mm:<</td>
    <td>${data.Distance_between_shafts_mm||" "}</td>
  </tr>
  
   <tr>
    <td>Installation method:<</td>
    <td>Scaffoldless w mobile top plat</td>
  </tr>
   
   <tr>
    <td>Distance between shafts, mm:<</td>
    <td>${data.Well_Slab}</td>
  </tr>
  
   <tr>
    <td>Dist hoistway1-door sill (TSW):<</td>
    <td>${data.Dist_hoistway1_door_sill_TSW||" "}</td>
  </tr>
  
   <tr>
    <td>Dist hoistway2-door sill (TSW):<</td>
    <td>${data.Dist_hoistway2_door_sill_TSW||" "}</td>
  </tr>
  
   <tr>
    <td>Headroom height HSK:</td>
    <td>${data.Headroom_height_HSK}</td>
  </tr>
  
  <tr>
    <td>Reduced headroom:</td>
    <td>auto filled</td>
  </tr>
  
   <tr>
    <td>HE20:</td>
    <td>${data.HE20||" "}</td>
  </tr>
   
   <tr>
    <td>HE19:</td>
    <td>${data.HE19||" "}</td>
  </tr>
  
  <tr>
    <td>HE18:</td>
    <td>${data.HE18||" "}</td>
  </tr>
  
   <tr>
    <td>HE17:</td>
    <td>${data.HE17||" "}</td>
  </tr>
  
   <tr>
    <td>HE16:</td>
    <td>${data.HE16||" "}</td>
  </tr>
  
  <tr>
    <td>HE15:</td>
    <td>${data.HE15||" "}</td>
  </tr>
  
   <tr>
    <td>HE14:</td>
    <td>${data.HE14||" "}</td>
  </tr>
  
  <tr>
    <td>HE13:</td>
    <td>${data.HE13||" "}</td>
  </tr>
  
  <tr>
    <td>HE12:</td>
    <td>${data.HE12||" "}</td>
  </tr>
  
  <tr>
    <td>HE11:</td>
    <td>${data.HE11||" "}</td>
  </tr>
  
  <tr>
    <td>HE10:</td>
    <td>${data.HE10||" "}</td>
  </tr>
  
  <tr>
    <td>HE9:</td>
    <td>${data.HE9||" "}</td>
  </tr>
  
  <tr>
    <td>HE8:</td>
    <td>${data.HE8||" "}</td>
  </tr>
  
  <tr>
    <td>HE7:</td>
    <td>${data.HE7||" "}</td>
  </tr>
  
   <tr>
    <td>HE6:</td>
    <td>${data.HE6||" "}</td>
  </tr>
  
   <tr>
    <td>HE5:</td>
    <td>${data.HE5||" "}</td>
  </tr>
  
   <tr>
    <td>HE4:</td>
    <td>${data.HE4||" "}</td>
  </tr>
  
   <tr>
    <td>HE3:</td>
    <td>${data.HE3||" "}</td>
  </tr>
  
   <tr>
    <td>HE2:</td>
    <td>${data.HE2||" "}</td>
  </tr>
  
  <tr>
    <td>HE1:</td>
    <td>${data.HE1||" "}</td>
  </tr>
  
  <tr>
    <td>Well pit height HSG:</td>
    <td>${data.HSG||" "}</td>
  </tr>
  
  <tr>
    <td>Well pit height HSG:</td>
    <td>${data.HSG||" "}</td>
  </tr>
  
  <tr>
    <td>Reduced pit:</td>
    <td>auto filled</td>
  </tr>
  
   <tr>
    <td>Travel height HQ, m:</td>
    <td>${data.HSG||" "}</td>
  </tr>
  
  </table>
</table>

`
    };
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("Email successfully sent to recipient!");
      }
    });
  });
});

//Index page (static HTML)
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});

/*************************************************/
// Express server listening...
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
