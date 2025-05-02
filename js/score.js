const scoreRange = document.getElementById("scoreRange");
const scoreOutput = document.getElementById("scoreOutput");

scoreOutput.textContent = scoreRange.max / 2;

scoreRange.addEventListener("input", () => {
    scoreOutput.textContent = scoreRange.value;
});