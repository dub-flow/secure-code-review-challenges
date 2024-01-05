package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "<html><body>Welcome to the Go Web Server! Visit /greet, /about, or /contact</body></html>")
    })

    http.HandleFunc("/about", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "<html><body><h1>About Us</h1><p>We are a team of passionate Gophers...</p></body></html>")
    })

    http.HandleFunc("/contact", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "<html><body><h1>Contact Us</h1><p>Email us at contact@example.com</p></body></html>")
    })

    http.HandleFunc("/greet", func(w http.ResponseWriter, r *http.Request) {
        name := r.URL.Query().Get("name")
        response := fmt.Sprintf("<html><body><h1>Hello, %s!</h1></body></html>", name)
        fmt.Fprint(w, response)
    })

    fmt.Println("Server is running at http://localhost:8080/")
    http.ListenAndServe(":8080", nil)
}
