const amountInput = document.getElementById("amount-input");
const tipButtons = document.querySelectorAll(".tip");
const customInput = document.getElementById("custom-tip-input");
const peopleInput = document.getElementById("people-input");
const perPerson = document.getElementById("total-tip-amount");
const total = document.getElementById("total-amount");
const amountError = document.querySelector(".input__amount-error");
const peopleError = document.querySelector(".input__people-error");
const reset = document.querySelector(".tip--reset-button");

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
