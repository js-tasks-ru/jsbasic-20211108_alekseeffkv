function factorial(n) {
  if ( (n ^ 0) !== n || n < 0) {
    return 'n должно быть целое неотрицательное число';
  } else if (n == 0) {
    return 1;
  } else {
    let factorialN = 1;
    for (let i = 0; i < n; i++) {
      factorialN *= n - i;
    }
    return factorialN;
  }
}