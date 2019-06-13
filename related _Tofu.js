db.products.find({
        ProductName: /.*Tofu*./
    })
    .sort({ _id: -1 })
    .limit(100)