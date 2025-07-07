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
func initDB() {
	users := client.Database("testdb").Collection("users")
	if count, _ := users.CountDocuments(context.TODO(), bson.M{}); count == 0 {
		users.InsertMany(context.TODO(), []interface{}{
			bson.M{"username": "admin", "password": "password"},
			bson.M{"username": "user", "password": "123456"},
		})
	}
}

func login(w http.ResponseWriter, r *http.Request) {
	var creds map[string]interface{}
	if json.NewDecoder(r.Body).Decode(&creds) != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	users := client.Database("testdb").Collection("users")
	if users.FindOne(context.TODO(), creds).Err() != nil {
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
	initDB()
	http.HandleFunc("/login", login)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
