db.customers.find({ContactName:/^A/})
   .projection({})
   .sort({_id:-1})
   .limit(100)