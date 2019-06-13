/*Find the 2nd page of 10 products, sorted by product name*/

db.products.find({})
   .projection({})
   .skip(10)
   .sort({_id:-1})
   .limit(100)