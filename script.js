const furday = {
  day: "furday",
  amount: 255.5,
};

// const postData = async () => {
//     await fetch("http://localhost:3000/data", {
//         method: "POST",
//         // headers: "application/json",
//         body: JSON.stringify(furday)
//     })
// }
// postData();

// const getData = async () => {
//   let response = await fetch("http://localhost:3000/data").then((res) =>
//     res.json()
//   );
//   console.log(response);
//   return response;
// };

const bars = document.getElementsByClassName("bar");

const days = document.getElementsByClassName("day");
const ourDays = [];

Array.from(days).forEach((day) => {
  ourDays.push(day.innerText);
});
const jsDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

console.log(ourDays);

fetch("data.json")
  .then((response) => {
    //apres le fetch, on aura une promesse qui va contenir des infos comme des en-têtes http, etat de la reponse
    if (!response.ok) {
        // si la reponse a pu être recuperé on la resout avec response.json pour qu'elle puisse être utilisable dans le second then
      throw new Error("Fetching data failed");
    }
    //A ce niveau, on aura une nouvelle promesse
    /*
    Cette promesse est en état "en attente" tant que le corps de la réponse HTTP n'a pas été entièrement lu et analysé. Une fois que le corps de la réponse a été lu et analysé avec succès, la promesse est résolue avec les données JSON parsées, et elle passe à l'état "résolue".*/
    return response.json();
  })
  .then((data) => {
    console.log(data);
    let jsonData = data;
    console.log(jsonData);
    let datas = jsonData.data;
    console.log(datas);
    amounts = [];
    amounts = datas.map(day => day.amount);

    console.log(amounts);

    let todayInfo = new Date();
    let day = todayInfo.getDay();

    /*convertir une HTMLCOLLECTION en array
    car getElementsByClassName retourne une HTMLCollection pas un tableau
    */

    Array.from(bars).forEach((bar, index) => {
      const dayIndex = jsDays.indexOf(ourDays[index]);
      let barsArray = Array.from(bars);
      for (let index = 0; index < barsArray.length; index++) {
        barsArray[index].setAttribute('data-amount',amounts[index]);
        barsArray[index].style.height = amounts[index]+"px";
      }
      if (dayIndex === day) {
        bar.style.backgroundColor = "rgb(15, 147, 147)";
      }
      bar.addEventListener('mouseover',()=>{
        const amount = bar.getAttribute('data-amount');

        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.textContent  = amount;

        bar.appendChild(tooltip);
      });

      bar.addEventListener('mouseout',()=>{
        const tooltip = bar.querySelector('.tooltip');
        if (tooltip) {
          bar.removeChild(tooltip);
        }
      }
      
    );
  })
  .catch((error) => {
    // ici on logguera les erreurs liées à l'utilisation de la promesse dans le second then
    console.error("Erreur: ", error);
  });
});
