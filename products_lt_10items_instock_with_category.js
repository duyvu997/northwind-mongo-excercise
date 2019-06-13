db.categories.aggregate([
    {$match: {CategoryName:'Confections'}}, 
    {$lookup: {
           from: "products",
           let: {instock: "$UnitsInStock", product_category : "$CategoryID"}, //$Category in products document
           pipeline:[{
               $match: { $expr: { $and: [ 
                                            {$eq:["$product_category","$$CategoryID"]}, // compair with categoryID in Categories document
                                            {$lt:["$instock",10]}
                                ] //and
                        }//expr
                }// match   
            }],//pipeline
            as: "<output array field>"
        }}
    ]).getAggregationPipeline().length

    


