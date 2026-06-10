package main

import (
	"errors"
	"fmt"
)

func CalculateAverage(numbers []int) (float64, error) {
	if len(numbers) == 0 {
		return 0.0, errors.New("cannot calculate average of an empty slice")
	}

	sum := 0
	for _, num := range numbers {
		sum += num
	}

	average := float64(sum) / float64(len(numbers))
	return average, nil
}

func main() {
	numbers1 := []int{10, 20, 30, 40}
	avg1, err1 := CalculateAverage(numbers1)
	if err1 != nil {
		fmt.Printf("Error: %v\n", err1)
	} else {
		fmt.Printf("Average of %v = %.2f\n", numbers1, avg1)
	}

	numbers2 := []int{}
	avg2, err2 := CalculateAverage(numbers2)
	if err2 != nil {
		fmt.Printf("Error: %v\n", err2)
	} else {
		fmt.Printf("Average of %v = %.2f\n", numbers2, avg2)
	}
}



