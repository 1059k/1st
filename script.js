const input = document.getElementById("memoInput");
const addButton = document.getElementById("addButton");
const memoList = document.getElementById("memoList");
const doneList = document.getElementById("doneList");

let memos = JSON.parse(localStorage.getItem("memos")) || [];

for (let i = 0; i < memos.length; i++) {
  if (typeof memos[i] === "string") {
    memos[i] = {
      text: memos[i],
      done: false,
    };
  }
}

function saveMemos() {
  localStorage.setItem("memos", JSON.stringify(memos));
}

function showMemos() {
  memoList.innerHTML = "";
  doneList.innerHTML = "";

  for (let i = 0; i < memos.length; i++) {
    const li = document.createElement("li");
    const text = document.createElement("span");
    text.textContent = memos[i].text;

    const buttonArea = document.createElement("div");
    buttonArea.className = "button-area";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.className = "delete-button";

    deleteButton.addEventListener("click", function () {
      memos.splice(i, 1);
      saveMemos();
      showMemos();
    });

    li.appendChild(text);

    if (memos[i].done === false) {
      const doneButton = document.createElement("button");
      doneButton.textContent = "達成";
      doneButton.className = "done-button";

      doneButton.addEventListener("click", function () {
        memos[i].done = true;
        saveMemos();
        showMemos();
      });

      buttonArea.appendChild(doneButton);
      buttonArea.appendChild(deleteButton);
      li.appendChild(buttonArea);
      memoList.appendChild(li);
    } else {
      const returnButton = document.createElement("button");
      returnButton.textContent = "戻す";
      returnButton.className = "return-button";

      returnButton.addEventListener("click", function () {
        memos[i].done = false;
        saveMemos();
        showMemos();
      });

      buttonArea.appendChild(returnButton);
      buttonArea.appendChild(deleteButton);
      li.appendChild(buttonArea);
      doneList.appendChild(li);
    }
  }
}

function addMemo() {
  const text = input.value.trim();

  if (text === "") {
    return;
  }

  memos.push({
    text: text,
    done: false,
  });
  saveMemos();
  showMemos();

  input.value = "";
}

addButton.addEventListener("click", function () {
  addMemo();
});

input.addEventListener("keydown", function (event) {
  if (event.isComposing === true) {
    return;
  }

  if (event.key === "Enter") {
    addMemo();
  }
});

showMemos();

console.log("メモが追加されました");
