package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// Assume this to be a fully grown database
func initializeDatabase() {
	collection := client.Database("testdb").Collection("users")
	count, _ := collection.CountDocuments(context.TODO(), bson.M{})
	if count == 0 {
		_, _ = collection.InsertMany(context.TODO(), []interface{}{
			User{"admin", "password"},
			User{"user", "123456"},
		})
		log.Println("Database initialized")
	}
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	var creds map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	collection := client.Database("testdb").Collection("users")
	filter := bson.M{}
	for key, value := range creds {
		filter[key] = value
	}

	if err := collection.FindOne(context.TODO(), filter).Decode(&creds); err != nil {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	w.Write([]byte("Login successful"))
}

func main() {
	var err error
	client, err = mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb://mongo:27017"))
	if err != nil {
		log.Fatal(err)
	}
	initializeDatabase()

	http.HandleFunc("/login", loginHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
