// Reference: https://www.geeksforgeeks.org/merge-sort/
// JavaScript program for Merge Sort

// Merges two subarrays of arr[].
// First subarray is arr[l..m]
// Second subarray is arr[m+1..r]
async function merge(arr, l, m, r) {
  var n1 = m - l + 1;
  var n2 = r - m;

  // Create temp arrays
  var L = new Array(n1);
  var R = new Array(n2);

  // Copy data to temp arrays L[] and R[]
  for (var i = 0; i < n1; i++) {
    L[i] = arr[l + i].style.height;
    arr[l + i].style.background = "rgb(12, 175, 240)";
  }

  for (var j = 0; j < n2; j++) {
    R[j] = arr[m + 1 + j].style.height;
    arr[m + 1 + j].style.background = "rgb(240, 236, 12)";
  }

  // Merge the temp arrays back into arr[l..r]

  // Initial index of first subarray
  var i = 0;

  // Initial index of second subarray
  var j = 0;

  // Initial index of merged subarray
  var k = l;

  while (i < n1 && j < n2) {
    await setDelay(delay);
    if (parseInt(L[i]) <= parseInt(R[j])) {
      arr[k].style.height = L[i];

      i++;
    } else {
      arr[k].style.height = R[j];
      j++;
    }
    k++;
  }

  // Copy the remaining elements of
  // L[], if there are any
  while (i < n1) {
    await setDelay(delay);
    arr[k].style.height = L[i];
    i++;
    k++;
  }

  // Copy the remaining elements of
  // R[], if there are any
  while (j < n2) {
    await setDelay(delay);
    arr[k].style.height = R[j];
    j++;
    k++;
  }
}

// l is for left index and r is
// right index of the sub-array
// of arr to be sorted */

async function mergeSort(arr, l, r) {
  if (l >= r) {
    return; //returns recursively
  }
  var m = l + parseInt((r - l) / 2);
  await mergeSort(arr, l, m);
  await mergeSort(arr, m + 1, r);
  await merge(arr, l, m, r);
}
const mergeBtn = document.querySelector("#merge_sort");
mergeBtn.addEventListener("click", async function () {
  const arr = document.querySelectorAll(".bar");
  let length = arr.length;
  disabledInputs();
  var start = window.performance.now();
  await mergeSort(arr, 0, length - 1);
  var end = window.performance.now();
  writeTime(end, start);
  for (let i = 0; i < length; i++) {
    arr[i].style.background = "red";
    await setDelay(50);
    totalDelay += delay;
    arr[i].style.background = "green";
  }
  enabledInputs();
});
