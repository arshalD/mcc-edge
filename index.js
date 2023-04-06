const express = require('express');

const app = express()


// read static files
app.use(express.static('public'))
// app.use(bodyParser.json())

// receive post body data from index.html in the public folder
app.use(express.json({extended: true, limit: '100mb'}))

// api endpoint
app.post('/checkSpeed', (req, res) => {
    const { username, email } = req.body
    console.log(req.body)

    // resend json data
    res.status(200).json({ username, email })
})


// function for Merge Sort
function merge_Arrays(left_sub_array, right_sub_array) {
    let array = []
    while (left_sub_array.length && right_sub_array.length) {
       if (left_sub_array[0] < right_sub_array[0]) {
          array.push(left_sub_array.shift())
       } else {
          array.push(right_sub_array.shift())
       }
    }
    return [ ...array, ...left_sub_array, ...right_sub_array ]
 }
 function mergeSort(unsorted_Array) {
    const middle_index = unsorted_Array.length / 2
    if(unsorted_Array.length < 2) {
       return unsorted_Array
    }
    const left_sub_array = unsorted_Array.splice(0, middle_index)
    return merge_Arrays(mergeSort(left_sub_array),mergeSort(unsorted_Array))
 }
  
 function selectionSort(arr,  n)
 {
     var i, j, min_idx;
  
     // One by one move boundary of unsorted subarray
     for (i = 0; i < n-1; i++)
     {
         // Find the minimum element in unsorted array
         min_idx = i;
         for (j = i + 1; j < n; j++)
         if (arr[j] < arr[min_idx])
             min_idx = j;

             let temp = arr[min_idx];
             arr[min_idx] = arr[i];
             arr[i] = temp;
         // Swap the found minimum element with the first element
         // swap(arr,min_idx, i);
     }
     return arr;
 }

app.get('/runMergeFn', (req, res) => {
    let startTime = Date.now()
    console.log(startTime)
    const array = req.body.array
    console.log(typeof(array))
    var arr = array;
	arr=selectionSort(arr, array.length);
    let time = Date.now() - startTime
    console.log("Time taken: ", time,"ms")
    res.status(200).send(JSON.stringify(arr));

})
app.listen(process.env.PORT||3000,()=>{
    console.log('listening on 3000')
})