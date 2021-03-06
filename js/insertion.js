async function insertionSort() {
  const inputArr = document.querySelectorAll(".bar");
  let length = inputArr.length;
  for (let i = 1; i < length; i++) {
    let key = inputArr[i].style.height;
    inputArr[i].style.background = "rgb(208, 230, 9)";
    let j = i - 1;
    await setDelay(delay);
    while (j >= 0 && parseInt(inputArr[j].style.height) > parseInt(key)) {
      inputArr[j].style.background = "red";
      inputArr[j + 1].style.height = inputArr[j].style.height;
      j = j - 1;
      await setDelay(delay);
      for (let k = i; k >= 0; k--) {
        inputArr[k].style.background = "green";
      }
    }
    inputArr[j + 1].style.height = key;
    inputArr[i].style.background = "green";
  }
}
const inSortbtn = document.querySelector("#insertion_sort");
inSortbtn.addEventListener("click", async function () {
  disabledInputs();
  startFun();
  await insertionSort();
  stop();
  totalDelay = 0;
  for (let i = 0; i < length; i++) {
    inputArr[i].style.background = "red";
    await specDelay(50);
    inputArr[i].style.background = "green";
  }
  enabledInputs();
});
