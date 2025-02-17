package main

import (
	"html/template"
	"log"
	"net/http"
)

type TemplateData struct {
	Name string
}

func handler(w http.ResponseWriter, r *http.Request) {
	const tmpl = `<p>Hello {{.Name}}</p>`

	t, err := template.New("greet").Parse(tmpl)
	if err != nil {
		http.Error(w, "Template parsing error", http.StatusInternalServerError)
		return
	}

	name := r.URL.Query().Get("name")
	if name == "" {
		name = "Stranger" 
	}

	data := TemplateData{Name: name}

	// Render the template with the data
	if err = t.Execute(w, data); err != nil {
		http.Error(w, "Template execution error", http.StatusInternalServerError)
		return
	}
}

func main() {
	http.HandleFunc("/", handler)
	log.Println("Server started at :5000")
	log.Fatal(http.ListenAndServe(":5000", nil))
}
