const add = a => b => b + a;
const mult = a => b => b * a;
(function() {
  const add1 = add(1);
  const mult3 = mult(3);
  return add1(mult3(5)); // 16
})();
