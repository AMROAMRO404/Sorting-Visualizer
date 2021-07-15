// Reference: https://www.guru99.com/quicksort-in-javascript.html
function swap(arr, leftIndex, rightIndex) {
  var temp = arr[leftIndex].style.height;
  arr[leftIndex].style.height = arr[rightIndex].style.height;
  arr[rightIndex].style.height = temp;
}
async function partition(arr, left, right) {
  var pivot = arr[Math.floor((right + left) / 2)].style.height, //middle element
    i = left, //left pointer
    j = right; //right pointer
  arr[Math.floor((right + left) / 2)].style.background = "white";
  await setDelay(delay + 60);
  totalDelay += delay + 60;
  arr[Math.floor((right + left) / 2)].style.background = "";

  while (i <= j) {
    while (parseInt(arr[i].style.height) < parseInt(pivot)) {
      arr[i].style.background = "red";
      await setDelay(delay);
      totalDelay += delay;
      arr[i].style.background = "";
      i++;
    }
    while (parseInt(arr[j].style.height) > parseInt(pivot)) {
      arr[j].style.background = "rgb(12, 175, 240)";
      await setDelay(delay);
      totalDelay += delay;
      arr[j].style.background = "";
      j--;
    }
    if (i <= j) {
      await setDelay(delay);
      totalDelay += delay;
      swap(arr, i, j); //sawpping two elements
      i++;
      j--;
    }
  }
  return i;
}

async function quickSort(arr, left, right, length) {
  var index;
  if (length > 1) {
    index = await partition(arr, left, right); //index returned from partition
    if (left < index - 1) {
      //more elements on the left side of the pivot
      await setDelay(delay);
      totalDelay += delay;
      await quickSort(arr, left, index - 1, length);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      await setDelay(delay);
      totalDelay += delay;
      await quickSort(arr, index, right, length);
    }
  }
}
// first call to quick sort
// var sortedArray = quickSort(arr, 0, arr.length - 1);
const quickSortbtn = document.querySelector("#quick_sort");
quickSortbtn.addEventListener("click", async function () {
  const arr = document.querySelectorAll(".bar");
  let length = arr.length;
  disabledInputs();
  totalDelay = 0;
  var start = window.performance.now();
  await quickSort(arr, 0, length - 1, length);
  var end = window.performance.now();
  for (let i = 0; i < length; i++) {
    arr[i].style.background = "red";
    await setDelay(50);
    totalDelay += 50;
    arr[i].style.background = "green";
  }
  writeTime(end, start);
  enabledInputs();
});
