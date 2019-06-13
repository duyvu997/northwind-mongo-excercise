db.products.find({
        UnitsInStock: {
            $lt: 10
        }
    })
    .sort({ _id: -1 })
    .limit(100)