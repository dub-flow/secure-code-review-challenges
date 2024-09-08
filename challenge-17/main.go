package main

import (
	"fmt"
	"log"
	"net/http"
	"os/exec"
)

func pingHandler(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()
	ip := query.Get("ip")

	if ip == "" {
		http.Error(w, "Please provide an IP address", http.StatusBadRequest)
		return
	}

	cmd := exec.Command("sh", "-c", fmt.Sprintf("ping -c 3 %s", ip))
	output, err := cmd.CombinedOutput()
	if err != nil {
		http.Error(w, fmt.Sprintf("Error executing command: %v", err), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(output)
}

func main() {
	http.HandleFunc("/ping", pingHandler)

	fmt.Println("Server running on port 5000")
	log.Fatal(http.ListenAndServe(":5000", nil))
}
