window.onload = function () {
    const display = document.getElementById('display');
    const basicButtons = document.getElementById('basic-buttons');
    const advancedButtons = document.getElementById('advanced-buttons');

    function appendValue(value) {
        display.value += value;
    }

    function clearDisplay() {
        display.value = '';
    }

    function calculateResult() {
        try {
            display.value = eval(display.value);
        } catch (error) {
            display.value = 'Error';
        }
    }

    function toggleAdvanced(event) {
        if (event) event.stopPropagation();
        advancedButtons.style.display = advancedButtons.style.display === 'none' ? 'grid' : 'none';
    }

    function calculateDiscount() {
        let amount = prompt("Enter original amount:");
        let discount = prompt("Enter discount percentage:");
        if (amount && discount) {
            let finalPrice = amount - (amount * discount / 100);
            display.value = finalPrice.toFixed(2);
        }
    }

    function backspace() {
        display.value = display.value.slice(0, -1);
    }

    // Attach event listeners dynamically to all buttons
    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", function (event) {
            let value = this.innerText;

            // Prevent "Advanced" button from adding text to the display
            if (this.classList.contains("rotate-btn")) {
                toggleAdvanced(event);
                return;
            }

            if (value === "C") {
                clearDisplay();
            } else if (value === "=") {
                calculateResult();
            } else if (value === "⌫") {
                backspace();
            } else if (value === "Discount") {
                calculateDiscount();
            } else {
                appendValue(value);
            }
        });
    });

    // Handle keyboard input
    document.addEventListener("keydown", function (event) {
        const key = event.key;

        // Allow numbers, operators, and some special keys
        if (/[0-9+\-*/().%]/.test(key)) {
            appendValue(key);
        } else if (key === "Enter") {
            calculateResult();
        } else if (key === "Backspace") {
            backspace();
        } else if (key === "Escape") {
            clearDisplay();
        } else if (key === "a" || key === "A") {
            toggleAdvanced();
        }
    });
};
