const amount = document.querySelector(".amount");
const tipButton = document.querySelectorAll(".tip");
const custom = document.querySelector(".custom");
const people = document.querySelector(".people");
const perPerson = document.querySelector(".tip-amount-value");
const total = document.querySelector(".total-value");
const amountError = document.querySelector(".amount-error");
const peopleError = document.querySelector(".people-error");
const reset = document.querySelector(".reset");

resetValues()
let tip = 0, amt = 0, ppl = 1;

tipButton.forEach(button => {
  button.addEventListener("click", () => {
    if (button.classList.contains("selected")) {
      tip = 0;
      unselectButton(button)
    } else {
      tipButton.forEach(click => {
        click.classList.remove("selected");
      })
      tip = button.value;
      selectButton(button)
    }
    custom.value = "";
    calculator();
  })
});

custom.addEventListener("input", () => {
  if (custom.value >= 0) {
    tipButton.forEach(click => {
      click.classList.remove("selected");
    })
    tip = custom.value;
    calculator();
  }
})

amount.addEventListener("input", () => {
  amt = Number(amount.value);
  if (amt <= 0 && amt !== "") {
    turnErrorVisible(amount, amountError)
    return;
  }
  removeAndHideError(amount, amountError)
  calculator();
})

people.addEventListener("input", () => {
  ppl = people.value;
  if (ppl <= 0 && ppl !== "") {
    turnErrorVisible(people, peopleError)
    return;
  }
  removeAndHideError(people, peopleError)
  calculator();
})

reset.addEventListener("click", resetValues);

function resetValues() {
  amount.value = "";
  people.value = "1";
  custom.value = "";
  perPerson.innerHTML = "$0.00";
  total.innerHTML = "$0.00";

  tipButton.forEach(click => {
    click.classList.remove("selected");
    click.classList.add("unselected");
  })
}

function calculator() {
  if (amt >= 0 && ppl >= 1) {
    let totalTip = (tip * amt) / (100);
    let totalAmt = amt + totalTip;
    perPerson.innerHTML = `$${((totalTip) / (ppl)).toFixed(2)}`;
    total.innerHTML = `$${((totalAmt) / (ppl)).toFixed(2)}`;
  }
}

function turnErrorVisible (element, error){
  element.classList.add("error");
  error.style.visibility = "visible";
}

function removeAndHideError (element, error){
  element.classList.remove("error");
  error.style.visibility = "hidden";
}

function unselectButton(button){
  button.classList.remove("selected");
  button.classList.add("unselected");
}

function selectButton(button){
  button.classList.remove("unselected");
  button.classList.add("selected");
}
