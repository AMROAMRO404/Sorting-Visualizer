// Reference: https://www.geeksforgeeks.org/bubble-sort-algorithms-by-using-javascript/
// Creating the bblSort function
async function bblSort(arr, length) {
  let x = length;
  for (var i = 0; i < length; i++) {
    // Last i elements are already in place
    await setDelay(delay);
    totalDelay += delay;
    for (var j = 0; j < length - i - 1; j++) {
      // Checking if the item at present iteration
      // is greater than the next iteration
      await setDelay(delay);
      totalDelay += delay;
      if (parseInt(arr[j].style.height) > parseInt(arr[j + 1].style.height)) {
        // If the condition is true then swap them
        var temp = arr[j].style.height;
        arr[j].style.height = arr[j + 1].style.height;

        arr[j + 1].style.height = temp;
      }
    }
    arr[length - i - 1].style.background = "red";
  }
}

const bblSortbtn = document.querySelector("#bubble_sort");
bblSortbtn.addEventListener("click", async function () {
  const arr = document.querySelectorAll(".bar");
  let length = arr.length;
  disabledInputs();
  totalDelay = 0;
  var start = window.performance.now();
  await bblSort(arr, length);
  var end = window.performance.now();
  for (let i = 0; i < length; i++) {
    arr[i].style.background = "red";
    await setDelay(50);
    totalDelay += delay;
    arr[i].style.background = "green";
  }
  writeTime(end, start);
  enabledInputs();
});
