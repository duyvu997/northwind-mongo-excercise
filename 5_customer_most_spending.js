/*
Find the top 5 customers (most spending) together with the products they bought on the system

*/
db.getCollection("order-details").aggregate([
    {$group: {
        _id: "$OrderID", 
        prices: {
            $sum :{
                $multiply: ["$UnitPrice","$Quantity" ]}
            },
        listProductID:{$addToSet: "$ProductID"}
        }
    }, // we have price of each order
    {$lookup: {
        from: "orders",
        localField: "_id",
        foreignField: "OrderID",
        as: "output"
        }
    },// we have order detail + price
    {$unwind: "$output"},
    {$group :{
        _id: "$output.CustomerID", 
        totalBuy: {$sum: "$prices"}, 
        listProductBuy: {$push: "$listProductID"}
        }
    },
    {$sort: {totalBuy:-1}},
    {$limit:5},
    {$project: {
        _id:1,
        totalBuy:1,
        listProductBuys:{
            $reduce: {
              input: "$listProductBuy",
              initialValue: [],
              in: {$setUnion: ["$$value","$$this"]}  
            }
        }
        
    }}
    ])
    
    
