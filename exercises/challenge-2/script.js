const amountInput = document.querySelector(".amount__input");
const tipButton = document.querySelectorAll(".tip");
const customInput = document.querySelector(".custom__input");
const peopleInput = document.querySelector(".people__input");
const perPerson = document.querySelector(".tip-amount__value");
const total = document.querySelector(".total__value");
const amountError = document.querySelector(".amount__error");
const peopleError = document.querySelector(".people__error");
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
    customInput.value = "";
    calculator();
  })
});

customInput.addEventListener("input", () => {
  if (customInput.value >= 0) {
    tipButton.forEach(click => {
      click.classList.remove("selected");
    })
    tip = customInput.value;
    calculator();
  }
})

amountInput.addEventListener("input", () => {
  amt = Number(amountInput.value);
  if (amt <= 0 && amt !== "") {
    turnErrorVisible(amountInput, amountError)
    return;
  }
  removeAndHideError(amountInput, amountError)
  calculator();
})

peopleInput.addEventListener("input", () => {
  ppl = peopleInput.value;
  if (ppl <= 0 && ppl !== "") {
    turnErrorVisible(peopleInput, peopleError)
    return;
  }
  removeAndHideError(peopleInput, peopleError)
  calculator();
})

reset.addEventListener("click", resetValues);

function resetValues() {
  amountInput.value = "";
  peopleInput.value = "1";
  customInput.value = "";
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

function turnErrorVisible(element, error) {
  element.classList.add("error");
  error.style.visibility = "visible";
}

function removeAndHideError(element, error) {
  element.classList.remove("error");
  error.style.visibility = "hidden";
}

function unselectButton(button) {
  button.classList.remove("selected");
  button.classList.add("unselected");
}

function selectButton(button) {
  button.classList.remove("unselected");
  button.classList.add("selected");
}
