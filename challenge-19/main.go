package main

import (
	"html/template"
	"log"
	"net/http"
	"os"
)

type User struct {
	Email    string
	Password string
}

func (u *User) ReadUserFile(filename string) string {
	data, _ := os.ReadFile(filename)
	return string(data)
}

func handler(w http.ResponseWriter, r *http.Request) {
	user := &User{Email: "test@example.com", Password: "Password123!"}
	tmpl := r.URL.Query().Get("tmpl")

	funcs := template.FuncMap{
		"ReadUserFile": func(filename string) string {
			return user.ReadUserFile(filename)
		},
	}

	t, err := template.New("page").Funcs(funcs).Parse(tmpl)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err = t.Execute(w, user); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func main() {
	http.HandleFunc("/", handler)
	log.Println("Server started at :5000")
	log.Fatal(http.ListenAndServe(":5000", nil))
}
