const tariff = Array.from(document.querySelectorAll(".tariff"));
const option = Array.from(document.querySelectorAll(".option"));
const total = document.querySelector("#total");
const time = document.querySelector("#time");
const calc = document.querySelector("#calc");

const priceInfo = {
    tariff: {
        economy: 1000,
        comfort: 1500,
        business: 3000,
        premium: 5000,
    },
    option: {
        option1: 1500,
        option2: 5000,
    },
};

let currentSet = {
    tariff: "comfort",
    time: 2,
    option: [],
    getTarrifPrice() {
        return priceInfo.tariff[this.tariff];
    },
    getOtionPrice() {
        let optionPrice = 0;
        if (this.option.length != 0) {
            this.option.forEach((el) => {
                optionPrice += priceInfo.option[el];
            });
        }
        return optionPrice;
    },
};

function updatePrice() {
    const tariffPrice = currentSet.getTarrifPrice();
    const optionPrice = currentSet.getOtionPrice();
    const totalPrice = (tariffPrice + optionPrice) * currentSet.time;
    total.value = totalPrice;
}

time.addEventListener("input", () => {
    let val = parseInt(time.value);
    if (isNaN(val)) return;
    if (val < 2) time.value = 2;
    if (val > 720) time.value = 720;
});

calc.addEventListener("click", () => {
    const hours = parseInt(time.value);
    if (hours < 2 || hours > 720 || isNaN(hours)) {
        alert("Количество часов должно быть от 2 до 720");
        return;
    }
    currentSet.tariff = document.querySelector(".tariff:checked").value;
    currentSet.time = hours;
    currentSet.option = option.filter((el) => el.checked).map((el) => el.id);
    updatePrice();
});