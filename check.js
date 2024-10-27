// script.js
const valorTotal = 50.00;

document.getElementById("valor-total").innerText = valorTotal.toFixed(2);
document.getElementById("final-valor-total").innerText = valorTotal.toFixed(2);

function nextStep(step) {
    document.querySelectorAll(".checkout-step").forEach((stepDiv) => {
        stepDiv.style.display = "none";
    });
    document.getElementById(`step-${step}`).style.display = "block";

    if (step === 4) {
        document.getElementById("final-observacoes").innerText = document.getElementById("observacoes").value;
        document.getElementById("final-endereco").innerText = document.getElementById("endereco").value;
    }
}

function previousStep(step) {
    nextStep(step);
}

function confirmOrder() {
    alert("Pedido confirmado! Obrigado por escolher a Q'Delícia.");
}
