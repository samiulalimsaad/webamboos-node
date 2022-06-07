# webamboos-node

## GET `'/orders'`

this api will return all orders based on these filters:

`priceFrom` : any number | `default` : `0`

`priceTo` : any number | `default` : `Infinity`

`dateFrom` : `M/D/YYY` | `default` : `Previous Year`

`dateTo` : : `M/D/YYY` | `default` : `Future Year`

## GET `'/orders/:id'`

Specific Order by id

## POST `'/order'`

`format`:

```typeScript
    price: number;
    orderName: string;
    orderQuantity: Number;
    paymentMethod: string;
    address: string;
    email: string;
    status: string;
```

## PATCH `'/orders/:id'`

Will `update` the `Status` from `Inserted` to `Done`

## DELETE `'/orders/:id'`

For a particular Orders

## DELETE `'/orders?email=something@domain.com'`

Will `delete` all the orders of this `email`
