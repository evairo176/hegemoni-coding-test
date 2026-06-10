package main

import "fmt"

func main() {
	inventory := map[string]int{
		"Apple":  10,
		"Banana": 5,
		"Orange": 0,
	}

	for product, quantity := range inventory {
		if quantity == 0 {
			fmt.Printf("%s is out of stock.\n", product)
		} else {
			fmt.Printf("%s has %d items.\n", product, quantity)
		}
	}
}





