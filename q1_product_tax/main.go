package main

import "fmt"

type Product struct {
	Name  string
	Price float64
}

func (p Product) GetPriceWithTax(taxRate float64) float64 {
	return p.Price * (1 + taxRate)
}

func main() {
	laptop := Product{
		Name:  "Laptop",
		Price: 1200.0,
	}

	taxRate := 0.07
	priceWithTax := laptop.GetPriceWithTax(taxRate)

	fmt.Printf("Product: %s\n", laptop.Name)
	fmt.Printf("Base Price: $%.2f\n", laptop.Price)
	fmt.Printf("Tax Rate: %.0f%%\n", taxRate*100)
	fmt.Printf("Price with Tax: $%.2f\n", priceWithTax)
}




