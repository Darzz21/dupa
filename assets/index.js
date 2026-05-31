// --- 4. PRZYCISK "WEJDŹ" + GENERATOR LOSOWEJ SERII I PESEL (FIXED) ---
const goBtn = document.querySelector(".go");

if (goBtn) {
  goBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let empty = [];
    let data = {};
    data.sex = sex;

    // IMAGE
    if (upload && upload.hasAttribute("selected")) {
      data.image = upload.getAttribute("selected");
    } else {
      empty.push("image");
      upload.classList.add("error_shown");
    }

    // DATE + PESEL
    const dayI = document.getElementById("day");
    const monI = document.getElementById("month");
    const yeaI = document.getElementById("year");

    if (dayI.value && monI.value && yeaI.value) {
      data.day = dayI.value;
      data.month = monI.value;
      data.year = yeaI.value;

      let y = yeaI.value.toString();
      let m = parseInt(monI.value);

      if (parseInt(y) >= 2000) m += 20;

      const randomP = Math.floor(10000 + Math.random() * 90000);
      data.pesel =
        y.slice(-2) +
        m.toString().padStart(2, "0") +
        dayI.value.padStart(2, "0") +
        randomP;
    } else {
      empty.push("date");
    }

    // SERIES NUMBER (FIXED KEY)
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomSeria =
      chars[Math.floor(Math.random() * 26)] +
      chars[Math.floor(Math.random() * 26)] +
      chars[Math.floor(Math.random() * 26)];

    const randomNumer = Math.floor(100000 + Math.random() * 900000);

    data.seriesNumber = randomSeria + " " + randomNumer;

    // DATES
    const today = new Date();
    const issueDate = new Date();
    issueDate.setFullYear(today.getFullYear() - 1);

    const expiryDate = new Date(issueDate);
    expiryDate.setFullYear(issueDate.getFullYear() + 10);

    data.givenDate = issueDate.toLocaleDateString("pl-PL");
    data.expiryDate = expiryDate.toLocaleDateString("pl-PL");

    // INPUTS
    document.querySelectorAll(".input_holder").forEach((element) => {
      const input = element.querySelector(".input");

      if (input) {
        if (!input.value.trim()) {
          empty.push(input.id);
          element.classList.add("error_shown");
        } else {
          data[input.id] = input.value.trim();
        }
      }
    });

    // SAVE OR STOP
    if (empty.length === 0) {
      const oldData = JSON.parse(localStorage.getItem("userData") || "{}");

      const finalData = {
        ...oldData,
        ...data,
      };

      localStorage.setItem("userData", JSON.stringify(finalData));

      window.location.href = "./card.html";
    } else {
      document.getElementById(empty[0])?.scrollIntoView({ behavior: "smooth" });
    }
  });
}
