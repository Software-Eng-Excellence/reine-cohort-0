export const mockBookOrdersData = JSON.stringify([
    {
        "Order ID": "2001",
        "Book Title": "Edge of Eternity",
        "Author": "Dan Brown",
        "Genre": "Science Fiction",
        "Format": "Paperback",
        "Language": "French",
        "Publisher": "Oxford Press",
        "Special Edition": "Signed Copy",
        "Packaging": "Eco-Friendly Packaging",
        "Price": "12",
        "Quantity": "5"
    },
    {
        "Order ID": "2002",
        "Book Title": "Beneath the Stars",
        "Author": "Dan Brown",
        "Genre": "Thriller",
        "Format": "Paperback",
        "Language": "Spanish",
        "Publisher": "Hachette Book Group",
        "Special Edition": "Limited Edition",
        "Packaging": "Standard Wrap",
        "Price": "48",
        "Quantity": "1"
    }
]);

export const mockPetOrdersData = JSON.stringify([
    {
        "Order ID": "4001",
        "Product Type": "Bedding",
        "Pet Type": "Dog",
        "Brand": "PetCare",
        "Size": "Extra Large",
        "Flavor": "Fish",
        "Eco-Friendly": "No",
        "Price": "322",
        "Quantity": "2"
    },
    {
        "Order ID": "4002",
        "Product Type": "Leash",
        "Pet Type": "Hamster",
        "Brand": "PetCare",
        "Size": "Small",
        "Flavor": "No Flavor",
        "Eco-Friendly": "No",
        "Price": "248",
        "Quantity": "2"
    }
]);

export const mockFurnitureOrdersData = `
<orders>
    <order>
        <OrderID>1001</OrderID>
        <ProductType>Chair</ProductType>
        <Material>Wood</Material>
        <Color>Brown</Color>
        <Price>120</Price>
        <Quantity>4</Quantity>
    </order>
    <order>
        <OrderID>1002</OrderID>
        <ProductType>Table</ProductType>
        <Material>Metal</Material>
        <Color>Black</Color>
        <Price>300</Price>
        <Quantity>2</Quantity>
    </order>
</orders>`;

export const mockToyOrdersData = `
<orders>
    <order>
        <OrderID>2001</OrderID>
        <ProductType>Action Figure</ProductType>
        <Brand>Marvel</Brand>
        <AgeGroup>5+</AgeGroup>
        <Price>25</Price>
        <Quantity>10</Quantity>
    </order>
    <order>
        <OrderID>2002</OrderID>
        <ProductType>Doll</ProductType>
        <Brand>Barbie</Brand>
        <AgeGroup>3+</AgeGroup>
        <Price>30</Price>
        <Quantity>5</Quantity>
    </order>
</orders>`;
