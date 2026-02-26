document.addEventListener("DOMContentLoaded", function () {

    const checkboxes = document.querySelectorAll(".feature-check");

    function updateScore() {

        let renewScore = 0;
        let recreatedScore = 0;

        let renewMissing = [];
        let recreatedMissing = [];

        document.querySelectorAll(".feature-row").forEach(row => {

            const checkbox = row.querySelector(".feature-check");

            if (!checkbox || !checkbox.checked) {
                return; // Ignore si non coché
            }

            const featureName = row.querySelector(".feature-name").innerText.trim();

            const renewCell = row.querySelector('[data-mod="renew"]');
            const recreatedCell = row.querySelector('[data-mod="recreated"]');

            const renewValue = parseFloat(renewCell.dataset.value || 0);
            const recreatedValue = parseFloat(recreatedCell.dataset.value || 0);

            renewScore += renewValue;
            recreatedScore += recreatedValue;

            if (renewValue === 0) {
                renewMissing.push(featureName);
            }

            if (recreatedValue === 0) {
                recreatedMissing.push(featureName);
            }

        });

        document.getElementById("score-renew").innerText = renewScore;
        document.getElementById("score-recreated").innerText = recreatedScore;

        const renewList = document.getElementById("missing-renew");
        const recreatedList = document.getElementById("missing-recreated");

        renewList.innerHTML = "";
        recreatedList.innerHTML = "";

        renewMissing.forEach(item => {
            const li = document.createElement("li");
            li.innerText = item;
            li.style.color = "red";
            renewList.appendChild(li);
        });

        recreatedMissing.forEach(item => {
            const li = document.createElement("li");
            li.innerText = item;
            li.style.color = "red";
            recreatedList.appendChild(li);
        });

    }

    checkboxes.forEach(cb => {
        cb.addEventListener("change", updateScore);
    });

});