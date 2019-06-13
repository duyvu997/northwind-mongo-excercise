/*
In one query, return a list of categories and number of products per category 
with only category ID, category name and the number of products
*/
db.categories.aggregate()
    .match({})
    .lookup({
          from: "products",
          localField: "CategoryID",
          foreignField: "CategoryID",
          as: "product_list"
    })
    .project({_id:0, CategoryID:1, CategoryName:1, numberOfProducts: {$size: "$product_list"} })
    .sort({CategoryID:-1})
    .limit(100)