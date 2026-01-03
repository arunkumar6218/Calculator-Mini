    const display = document.getElementById('display');
    const historyList = document.getElementById('history-list');
    const historyPanel = document.getElementById('history-panel');
    let historyData = [];

    function toggleHistory() {
        historyPanel.classList.toggle('open');
    }

    function appendToDisplay(input) {
        if (display.value === "Error") clearDisplay();
        if (display.value === "" && ['/','*','+'].includes(input)) return;
        display.value += input;
    }

    function clearDisplay() { display.value = ""; }

    function backspace() { display.value = display.value.slice(0, -1); }

    function calculate() {
        try {
            const exp = display.value;
            if (!exp) return;
            const res = eval(exp);
            
            historyData.unshift({ exp, res });
            if (historyData.length > 10) historyData.pop();
            
            updateHistoryUI();
            display.value = res;
        } catch {
            display.value = "Error";
        }
    }

    function updateHistoryUI() {
        historyList.innerHTML = historyData.length ? "" : '<li class="text-muted small text-center mt-5">No calculations yet</li>';
        historyData.forEach((item) => {
            const li = document.createElement('li');
            li.className = "history-item";
            li.innerHTML = `<div class="small opacity-50">${item.exp}</div><div class="fw-bold text-info">= ${item.res}</div>`;
            li.onclick = () => {
                display.value = item.res;
                toggleHistory();
            };
            historyList.appendChild(li);
        });
    }

    function clearHistory() {
        historyData = [];
        updateHistoryUI();
    }