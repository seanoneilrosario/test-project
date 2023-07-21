function addQuantities(arr:any) {
    // Create a temporary object to store the accumulated quantities based on the unique sizes
    const tempObj:any = {};
  
    // Iterate through the array of objects
    arr.forEach((obj:any) => {
        const { title, size, image, price, quantity } = obj;
        const key = `${title}-${size}-${image}-${price}`;

        // Check if the key (combination of title, size, image, and price) already exists in the temporary object
        if (tempObj.hasOwnProperty(key)) {
          // If it exists, add the current object's quantity to the accumulated quantity
          tempObj[key].quantity += quantity;
        } else {
          // If it doesn't exist, create a new entry with the current object's details
          tempObj[key] = { title, size, image, price, quantity };
        }
    });
  
    // Convert the temporary object back to an array of objects (if necessary)
    const resultArr = Object.values(tempObj);
    return resultArr;
  }

export default addQuantities;